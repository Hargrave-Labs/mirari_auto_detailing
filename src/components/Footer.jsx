import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bg-mirari-black py-12 px-6 overflow-hidden border-t border-white/5 z-20">
            {/* Massive background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-heading font-black text-white/[0.02] pointer-events-none select-none whitespace-nowrap">
                MIRARI
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-2xl font-heading font-bold tracking-widest text-white">
                    MIRARI
                </div>

                <div className="flex gap-8 text-sm font-heading tracking-widest uppercase text-gray-400">
                    <a href="https://www.instagram.com/mirariautodetailing/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    <a href="mailto:info@mirari.com" className="hover:text-white transition-colors">Email</a>
                </div>

                <p className="text-gray-600 text-xs font-body tracking-wider text-center md:text-left">
                    &copy; {new Date().getFullYear()} Mirari Auto Detailing. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
