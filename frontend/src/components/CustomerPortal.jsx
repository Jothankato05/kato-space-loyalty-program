import React from 'react';
import {
    Award,
    Star
} from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';

const CustomerPortal = ({ account }) => (
    <div className="max-w-4xl mx-auto animate-fade-in relative">
        {!account && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-background/60 flex items-center justify-center rounded-3xl">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-white">Connect Wallet to Enter Portal</h3>
                    <ConnectButton />
                </div>
            </div>
        )}
        <div className="glass-card mb-12 overflow-hidden relative p-12 bg-gradient-to-br from-indigo-600/10 to-transparent">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                <Award size={240} />
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <p className="text-indigo-400 font-bold mb-1 uppercase tracking-widest text-xs">V.I.P Member Status</p>
                        <h2 className="text-5xl font-black tracking-tight text-white">Silver Tier</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500 text-sm font-bold uppercase mb-1">Balance</p>
                        <div className="flex items-center gap-3">
                            <Star className="text-yellow-400 fill-yellow-400" size={24} />
                            <span className="text-4xl font-black text-white">4,250</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between text-sm font-bold mb-2 uppercase tracking-tighter">
                        <span className="text-slate-400">Progress to Gold</span>
                        <span className="text-indigo-400">85% Complete</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
                <p className="text-sm text-slate-500 font-medium">Earn 750 more points to unlock free global shipping.</p>
            </div>
        </div>

        <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black tracking-tight text-white">Marketplace</h3>
            <button className="text-indigo-400 font-bold text-sm uppercase hover:underline">View History</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {[
                { name: 'Founder NFT', cost: '5,000', desc: 'Unlock special community badges and governance voting power.' },
                { name: 'Merchant Credit', cost: '2,000', desc: 'Direct $20 discount on your next tech purchase.' },
                { name: 'Priority Pass', cost: '1,500', desc: 'Skip the line at all participating SUI Coffee locations.' },
                { name: 'Swag Pack', cost: '8,000', desc: 'Limited edition Kato Space physical merchandise kit.' },
            ].map((reward, i) => (
                <div key={i} className="glass-card group hover:bg-white/5 p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h4 className="text-2xl font-bold tracking-tight text-white">{reward.name}</h4>
                        <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-black border border-indigo-500/20">
                            {reward.cost} PTS
                        </div>
                    </div>
                    <p className="text-slate-400 mb-8 leading-relaxed h-12 text-sm">{reward.desc}</p>
                    <button className="btn btn-secondary w-full py-4 group-hover:btn-primary transition-all font-bold">
                        Redeem Reward
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default CustomerPortal;
