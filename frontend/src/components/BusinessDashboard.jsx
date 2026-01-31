import React from 'react';
import {
    PlusCircle,
    Gift,
    Users,
    TrendingUp,
    Star
} from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';

const BusinessDashboard = ({ account }) => (
    <div className="max-w-5xl mx-auto animate-fade-in relative">
        {!account && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-background/60 flex items-center justify-center rounded-3xl">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Connect Wallet to Manage</h3>
                    <ConnectButton />
                </div>
            </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
                <h2 className="text-4xl font-black mb-2 tracking-tight text-white">Business Hub</h2>
                <p className="text-slate-400 text-lg">Manage rewards and track member engagement.</p>
            </div>
            <button className="btn btn-primary">
                <PlusCircle size={20} /> Create New Reward
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
                { label: 'Total Members', val: '1,284', icon: Users, color: 'text-indigo-400' },
                { label: 'Points Issued', val: '842.5K', icon: Star, color: 'text-pink-400' },
                { label: 'Redemption Rate', val: '24.8%', icon: TrendingUp, color: 'text-green-400' },
                { label: 'Active Rewards', val: '12', icon: Gift, color: 'text-purple-400' },
            ].map((stat, i) => (
                <div key={i} className="glass-card p-8">
                    <div className={`p-2 w-fit rounded-lg bg-white/5 mb-6 ${stat.color}`}>
                        <stat.icon size={20} />
                    </div>
                    <p className="text-sm text-slate-500 mb-1 font-semibold uppercase tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.val}</p>
                </div>
            ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 glass-card">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp size={24} className="text-indigo-400" /> Recent Redemptions
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center font-bold text-indigo-300">
                                    U{i}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">0x{742 + i}...f{i}2</p>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Member since Jan 2026</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-indigo-400 font-black">+250 PTS</span>
                                <p className="text-[10px] text-slate-600 uppercase">2 mins ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass-card bg-indigo-600/5 border-indigo-500/10">
                <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                    <button className="w-full btn btn-secondary justify-start px-6">
                        <Star size={18} className="text-yellow-400" /> Bulk Issue Points
                    </button>
                    <button className="w-full btn btn-secondary justify-start px-6">
                        <Users size={18} className="text-blue-400" /> Export Member List
                    </button>
                    <button className="w-full btn btn-secondary justify-start px-6">
                        <Gift size={18} className="text-pink-400" /> Promotion Manager
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default BusinessDashboard;
