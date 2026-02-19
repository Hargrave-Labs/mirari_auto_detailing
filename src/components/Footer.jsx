import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="relative bg-mirari-black py-20 px-6 overflow-hidden border-t border-white/5">
            {/* Background Car Silhouette Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <svg width="800" height="300" viewBox="0 0 400 150" className="w-[150vw] md:w-[80vw]">
                    <path d="M20,60 C40,60 50,55 60,45 L90,20 C100,10 130,5 170,5 L230,5 C260,5 280,20 290,30 L320,55 C330,60 340,60 360,60 L370,60 L370,85 L20,85 Z" fill="currentColor" className="text-white" />
                </svg>
            </div>

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
