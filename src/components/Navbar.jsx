import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-4 md:px-12 backdrop-blur-md bg-mirari-black/50 border-b border-white/5"
        >
            <div className="text-xl md:text-2xl font-heading font-bold tracking-widest text-white">
                MIRARI
            </div>

            <a href="tel:0490360762" className="px-4 py-2 md:px-6 border border-mirari-silver/30 rounded-full text-xs md:text-sm font-body tracking-wider hover:bg-white hover:text-mirari-black transition-all duration-300">
                0490 360 762
            </a>
        </motion.nav>
    );
};

export default Navbar;
