module kato_loyalty::loyalty {
    use sui::event;
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use std::string::{Self, String};
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::balance::{Self, Balance};

    // --- Errors ---
    const ENotOwner: u64 = 0;
    const EInsufficientPoints: u64 = 1;

    // --- Objects ---

    /// Represents a business's loyalty program configuration
    struct Program has key {
        id: UID,
        name: String,
        description: String,
        business_address: address,
        total_points_issued: u64,
    }

    /// Technical capability allowed to manage a specific program
    struct BusinessCap has key, store {
        id: UID,
        program_id: ID,
    }

    /// User's membership proof and point balance for a specific program
    struct MemberCard has key, store {
        id: UID,
        program_id: ID,
        points: u64,
        tier: u8,
    }

    /// A reward that can be purchased with points
    struct Reward has key, store {
        id: UID,
        program_id: ID,
        name: String,
        cost: u64,
    }

    // --- Events ---

    struct ProgramCreated has copy, drop {
        program_id: ID,
        business: address,
    }

    struct PointsEarned has copy, drop {
        card_id: ID,
        program_id: ID,
        amount: u64,
    }

    struct RewardRedeemed has copy, drop {
        card_id: ID,
        program_id: ID,
        reward_id: ID,
    }

    // --- Functions ---

    /// Create a new loyalty program
    public entry fun create_program(
        name: vector<u8>,
        description: vector<u8>,
        ctx: &mut TxContext
    ) {
        let program_uid = object::new(ctx);
        let program_id = object::uid_to_inner(&program_uid);
        let sender = tx_context::sender(ctx);

        let program = Program {
            id: program_uid,
            name: string::utf8(name),
            description: string::utf8(description),
            business_address: sender,
            total_points_issued: 0,
        };

        let cap = BusinessCap {
            id: object::new(ctx),
            program_id,
        };

        transfer::share_object(program);
        transfer::public_transfer(cap, sender);

        event::emit(ProgramCreated {
            program_id,
            business: sender,
        });
    }

    /// Join a loyalty program as a customer
    public entry fun join_program(program: &Program, ctx: &mut TxContext) {
        let card = MemberCard {
            id: object::new(ctx),
            program_id: object::uid_to_inner(&program.id),
            points: 0,
            tier: 1,
        };
        transfer::public_transfer(card, tx_context::sender(ctx));
    }

    /// Business issues points to a member
    public entry fun issue_points(
        _cap: &BusinessCap,
        program: &mut Program,
        card: &mut MemberCard,
        amount: u64,
        _ctx: &mut TxContext
    ) {
        assert!(object::uid_to_inner(&program.id) == card.program_id, ENotOwner);
        card.points = card.points + amount;
        program.total_points_issued = program.total_points_issued + amount;

        event::emit(PointsEarned {
            card_id: object::uid_to_inner(&card.id),
            program_id: card.program_id,
            amount,
        });
    }

    /// Add a reward to the program
    public entry fun add_reward(
        _cap: &BusinessCap,
        name: vector<u8>,
        cost: u64,
        ctx: &mut TxContext
    ) {
        let reward = Reward {
            id: object::new(ctx),
            program_id: _cap.program_id,
            name: string::utf8(name),
            cost,
        };
        transfer::public_transfer(reward, tx_context::sender(ctx));
    }

    /// User redeems points for a reward
    public entry fun redeem_reward(
        card: &mut MemberCard,
        reward: &Reward,
        _ctx: &mut TxContext
    ) {
        assert!(card.program_id == reward.program_id, ENotOwner);
        assert!(card.points >= reward.cost, EInsufficientPoints);

        card.points = card.points - reward.cost;

        event::emit(RewardRedeemed {
            card_id: object::uid_to_inner(&card.id),
            program_id: card.program_id,
            reward_id: object::uid_to_inner(&reward.id),
        });

        // In a real application, this might burn a reward placeholder or trigger an off-chain action
    }

    // --- Getters ---

    public fun points(card: &MemberCard): u64 {
        card.points
    }

    // --- Tests ---

    #[test_only]
    use sui::test_scenario;

    #[test]
    fun test_create_and_join() {
        let admin = @0xAD;
        let user = @0x8B;
        
        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        
        // 1. Admin creates program
        {
            create_program(b"Kato Coffee", b"Best coffee loyalty", test_scenario::ctx(scenario));
        };

        // 2. User joins program
        test_scenario::next_tx(scenario, user);
        {
            let program = test_scenario::take_shared<Program>(scenario);
            join_program(&program, test_scenario::ctx(scenario));
            test_scenario::return_shared(program);
        };

        // 3. Verify user has a card
        test_scenario::next_tx(scenario, user);
        {
            let card = test_scenario::take_from_sender<MemberCard>(scenario);
            assert!(card.points == 0, 0);
            assert!(card.tier == 1, 0);
            test_scenario::return_to_address(user, card);
        };
        test_scenario::end(scenario_val);
    }

    #[test]
    fun test_issue_and_redeem() {
        let admin = @0xAD;
        let user1 = @0x1;

        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;

        // Admin creates program
        create_program(b"Kato Tech", b"Rewards for devs", test_scenario::ctx(scenario));
        
        test_scenario::next_tx(scenario, admin);
        let cap = test_scenario::take_from_sender<BusinessCap>(scenario);
        let program = test_scenario::take_shared<Program>(scenario);

        // User joins
        test_scenario::next_tx(scenario, user1);
        join_program(&program, test_scenario::ctx(scenario));

        // Admin issues points
        test_scenario::next_tx(scenario, admin);
        let card = test_scenario::take_from_address<MemberCard>(scenario, user1);
        issue_points(&cap, &mut program, &mut card, 100, test_scenario::ctx(scenario));
        
        assert!(card.points == 100, 1);

        // Admin adds a reward
        add_reward(&cap, b"Hat", 40, test_scenario::ctx(scenario));

        test_scenario::next_tx(scenario, user1);
        let reward = test_scenario::take_from_address<Reward>(scenario, admin);
        
        // User redeems
        redeem_reward(&mut card, &reward, test_scenario::ctx(scenario));

        assert!(card.points == 60, 2);

        test_scenario::return_shared(program);
        test_scenario::return_to_address(admin, cap);
        test_scenario::return_to_address(user1, card);
        test_scenario::return_to_address(admin, reward);
        test_scenario::end(scenario_val);
    }
}
