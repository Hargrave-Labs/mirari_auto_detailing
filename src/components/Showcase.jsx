import React from 'react';
import { motion } from 'framer-motion';

const Showcase = () => {
    const images = [
        {
            url: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80",
            tag: "Level 3 Paint Correction",
            size: "large"
        },
        {
            url: "https://images.unsplash.com/photo-1632742468351-460aa577f864?auto=format&fit=crop&w=800&q=80",
            tag: "Gtechniq Ceramic Coating",
            size: "medium"
        },
        {
            url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
            tag: "Interior Rejuvenation",
            size: "medium"
        },
        {
            url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
            tag: "Wheel & Caliper Coating",
            size: "large"
        }
    ];

    return (
        <section id="vault" className="py-24 md:py-32 px-6 bg-mirari-black relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        THE MIRARI VAULT
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                        RECENT COMMISSIONS
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[300px]">
                    {images.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl ${item.size === 'large' ? 'md:row-span-2 auto-rows-[600px] h-[600px]' : 'h-[300px]'}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.url})` }}
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-mirari-black/90 via-mirari-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <h3 className="text-white font-heading text-lg md:text-xl font-bold">{item.tag}</h3>
                                <p className="text-mirari-silver text-sm mt-1">View Details →</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showcase;
