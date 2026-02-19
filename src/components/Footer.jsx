import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="relative bg-mirari-black/50 backdrop-blur-md py-20 px-6 overflow-hidden border-t border-white/5 -mt-20 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                        READY TO BE MARVELLED?
                    </h2>
                    <p className="text-mirari-silver text-lg md:text-xl font-heading mb-12">
                        Enquire & Book Today.
                    </p>

                    <button className="px-12 py-4 bg-white text-mirari-black text-lg font-bold font-heading rounded hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        CONTACT US
                    </button>
                </motion.div>

                <div className="mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-body">
                    <p>&copy; {new Date().getFullYear()} Mirari Auto Detailing. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="https://www.instagram.com/mirariautodetailing/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Email</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
