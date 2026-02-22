import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'SERVICES', href: '#services' },
        { name: 'CLIENTS', href: '#reviews' },
        { name: 'CONTACT', href: '#contact' }
    ];

    const handleScroll = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({
                behavior: 'smooth',
            });
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 md:px-12 backdrop-blur-md bg-mirari-black/50 border-b border-white/5"
        >
            <div className="flex items-center gap-4">
                <img src="/logo.svg" alt="Mirari Logo" className="h-6 md:h-8 w-auto object-contain" />
                <div className="text-xl md:text-2xl font-heading font-bold tracking-widest text-white">
                    MIRARI
                </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className="text-xs font-body tracking-wider text-mirari-silver hover:text-white transition-colors duration-300 uppercase"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="hidden md:block">
                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="px-6 py-2.5 bg-white text-mirari-black rounded-full text-xs font-body font-bold tracking-wider hover:bg-mirari-silver transition-all duration-300">
                    BOOK NOW
                </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Nav Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-mirari-black/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-6 md:hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-sm font-body tracking-wider text-mirari-silver hover:text-white transition-colors duration-300 uppercase"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-center w-full px-6 py-3 bg-white text-mirari-black rounded-full text-xs font-body font-bold tracking-wider uppercase mt-4 hover:bg-mirari-silver transition-all">
                        Book Now
                    </a>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
