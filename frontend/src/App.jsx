import React, { useState } from 'react';
import {
    ChevronRight,
    Zap,
    Lock,
    Globe,
    Cpu
} from 'lucide-react';
import {
    ConnectButton,
    useCurrentAccount,
} from '@mysten/dapp-kit';

import BusinessDashboard from './components/BusinessDashboard';
import CustomerPortal from './components/CustomerPortal';

const App = () => {
    const [view, setView] = useState('home');
    const currentAccount = useCurrentAccount();

    return (
        <div className="min-h-screen hero-gradient">
            <nav className="nav">
                <a href="#" className="logo" onClick={() => setView('home')}>KATO SPACE</a>
                <div className="flex gap-4 items-center">
                    <button
                        className={`btn ${view === 'business' ? 'btn-primary' : 'btn-secondary'} text-sm py-2`}
                        onClick={() => setView('business')}
                    >
                        Business
                    </button>
                    <button
                        className={`btn ${view === 'customer' ? 'btn-primary' : 'btn-secondary'} text-sm py-2`}
                        onClick={() => setView('customer')}
                    >
                        Portal
                    </button>
                    <ConnectButton />
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12">
                {view === 'home' && <HomeView setView={setView} />}
                {view === 'business' && <BusinessDashboard account={currentAccount} />}
                {view === 'customer' && <CustomerPortal account={currentAccount} />}
            </main>

            <footer className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <a href="#" className="logo mb-6 block text-2xl">KATO SPACE</a>
                        <p className="text-slate-500 max-w-sm">
                            The leading tokenized loyalty infrastructure on Sui. Empowering brands to build meaningful relationships through digital ownership.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-white">Platform</h4>
                        <ul className="text-slate-500 space-y-2">
                            <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition">SDKs</a></li>
                            <li><a href="#" className="hover:text-white transition">API Reference</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-white">Community</h4>
                        <ul className="text-slate-500 space-y-2">
                            <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                            <li><a href="#" className="hover:text-white transition">Discord</a></li>
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-20 text-center text-slate-600 text-sm">
                    <p>© 2026 Kato Space. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const HomeView = ({ setView }) => (
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-32 animate-fade-in pt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-8">
                <Cpu size={16} /> Beta Access Now Open on Sui Devnet
            </div>
            <h1 className="text-7xl md:text-8xl font-black mb-8 gradient-text tracking-tight" style={{ lineHeight: 1 }}>
                Revolutionize <br /> Brand Loyalty.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Don't just give points. Give assets. Kato Space allows any business to launch a tokenized loyalty program with sub-second finality.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="btn btn-primary px-12 py-5 text-lg shadow-lg shadow-indigo-500/20" onClick={() => setView('business')}>
                    Launch Your Program <ChevronRight size={20} />
                </button>
                <button className="btn btn-secondary px-12 py-5 text-lg" onClick={() => setView('customer')}>
                    Explore Rewards
                </button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
            <FeatureCard
                icon={Zap}
                title="Instant Finality"
                desc="Sui's object-centric model ensures loyalty transactions happen in the blink of an eye."
                color="indigo"
            />
            <FeatureCard
                icon={Lock}
                title="True Ownership"
                desc="Users own their points as on-chain objects. They can trade, gift, or hold them indefinitely."
                color="pink"
            />
            <FeatureCard
                icon={Globe}
                title="Composability"
                desc="Integrate with any Sui dApp. Use your loyalty points across the entire ecosystem."
                color="purple"
            />
        </div>

        <div className="glass-card py-16 px-12 text-center mb-32 border-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500"></div>
            <h2 className="text-3xl font-bold mb-12 text-white">Trusted by Next-Gen Brands</h2>
            <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale contrast-125">
                <span className="text-3xl font-black tracking-widest italic text-white">NEO TECH</span>
                <span className="text-3xl font-black tracking-widest italic text-white">LUNAR LABS</span>
                <span className="text-3xl font-black tracking-widest italic text-white">AETHER</span>
                <span className="text-3xl font-black tracking-widest italic text-white">SUI COFFEE</span>
            </div>
        </div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div className="glass-card group hover:scale-[1.02]">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors
            ${color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20' : ''}
            ${color === 'pink' ? 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20' : ''}
            ${color === 'purple' ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' : ''}
        `}>
            <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default App;
