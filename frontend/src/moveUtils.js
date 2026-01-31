import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, MODULE_NAME } from './constants';

/**
 * Creates a new loyalty program
 */
export const createProgramTx = (name, description) => {
    const txb = new Transaction();
    txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_program`,
        arguments: [
            txb.pure.vectorU8(new TextEncoder().encode(name)),
            txb.pure.vectorU8(new TextEncoder().encode(description)),
        ],
    });
    return txb;
};

/**
 * Joins a loyalty program
 */
export const joinProgramTx = (programId) => {
    const txb = new Transaction();
    txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::join_program`,
        arguments: [txb.object(programId)],
    });
    return txb;
};

/**
 * Issues points to a member (Business only)
 */
export const issuePointsTx = (businessCapId, programId, cardId, amount) => {
    const txb = new Transaction();
    txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::issue_points`,
        arguments: [
            txb.object(businessCapId),
            txb.object(programId),
            txb.object(cardId),
            txb.pure.u64(amount),
        ],
    });
    return txb;
};

/**
 * Redeems a reward
 */
export const redeemRewardTx = (cardId, rewardId) => {
    const txb = new Transaction();
    txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::redeem_reward`,
        arguments: [
            txb.object(cardId),
            txb.object(rewardId),
        ],
    });
    return txb;
};
