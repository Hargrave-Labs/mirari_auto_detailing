import React from 'react';
import { motion } from 'framer-motion';

// This gives the effect of a soapy window being squeegeed clean to reveal the text
const SqueegeeReveal = ({ children, delay = 0 }) => {
    return (
        <div className="relative overflow-hidden inline-block py-2">
            {/* The "Squeegee" sweep animation */}
            <motion.div
                initial={{ x: "-150%" }}
                whileInView={{ x: "150%" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: [0.8, 0, 0.2, 1], delay }}
                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none -skew-x-12"
            >
                {/* The physical squeegee "blade" edge wiping */}
                <div className="w-[4px] h-[200%] bg-white/60 absolute left-full blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                {/* A subtle water/foam trail behind the blade */}
                <div className="w-[100px] h-[200%] bg-gradient-to-r from-transparent to-white/20 absolute right-0" />
            </motion.div>

            {/* Frosted soapy glass layer that disappears as squeegee passes */}
            <motion.div
                initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                whileInView={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: [0.8, 0, 0.2, 1], delay }}
                className="absolute inset-0 z-40 bg-white/10 backdrop-blur-md mix-blend-screen pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0.5, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, delay: delay + 0.3 }}
                className="relative z-10"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SqueegeeReveal;
