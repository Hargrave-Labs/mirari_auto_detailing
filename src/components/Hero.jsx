import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.3, y: y * 0.3 }); // Intensity of magnetic effect
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative overflow-hidden group ${className}`}
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg rounded-full" />
            {children}
        </motion.button>
    );
};

const Hero = ({ onTransitionStart }) => {
    const [stage, setStage] = useState('drawing'); // 'drawing', 'filled', 'transitioning', 'complete'

    // Precise paths from the provided SVG (copied from Loader to ensure exact match)
    const svgPaths = [
        "M6002 5030 c-65 -5 -98 -12 -109 -23 -21 -21 -12 -33 87 -105 99 -73 162 -127 366 -314 195 -177 223 -198 313 -228 99 -33 219 -38 532 -23 415 19 1431 28 1729 14 135 -6 297 -14 360 -16 l115 -5 -65 31 c-293 140 -1212 486 -1459 549 -137 35 -705 99 -1066 120 -187 11 -656 11 -803 0z",
        "M4210 4949 c-400 -137 -732 -330 -1020 -593 -362 -330 -576 -491 -925 -695 -159 -93 -526 -279 -722 -366 -73 -33 -131 -60 -129 -62 1 -2 56 19 122 46 400 165 767 354 1063 548 220 144 306 211 592 464 203 179 298 254 449 355 193 128 377 219 625 310 126 46 85 41 -55 -7z",
        "M5040 4924 c-223 -27 -414 -71 -635 -145 -162 -54 -237 -87 -243 -106 -2 -7 35 -53 82 -102 92 -97 175 -214 251 -355 l48 -88 146 6 c278 13 1127 45 1321 51 107 4 205 8 218 11 l22 4 -19 38 c-11 20 -43 72 -73 114 -205 295 -454 477 -751 548 -80 20 -292 33 -367 24z",
        "M3815 4522 c-82 -43 -186 -102 -230 -131 -86 -58 -288 -254 -319 -310 l-19 -34 29 6 c185 40 378 56 762 64 233 5 315 9 323 19 7 9 3 26 -15 62 -48 95 -171 267 -238 335 -90 90 -97 90 -293 -11z",
        "M8310 4234 c-162 -6 -338 -13 -390 -14 l-95 -3 90 -8 c50 -4 207 -18 350 -29 322 -26 739 -78 1047 -130 757 -127 737 -123 867 -191 234 -123 510 -350 666 -548 27 -34 50 -59 52 -57 5 5 -96 208 -188 378 -77 140 -85 177 -44 204 40 26 194 42 531 55 347 13 417 8 654 -52 63 -16 117 -29 120 -29 13 2 -78 43 -151 70 -342 126 -1042 242 -1984 330 -464 42 -922 50 -1525 24z",
        "M11310 3813 c-229 -8 -466 -25 -484 -35 -29 -15 -36 -28 -36 -65 0 -38 67 -171 160 -321 92 -146 146 -210 209 -246 l55 -30 220 -8 c282 -9 689 -28 787 -35 70 -5 77 -4 97 18 31 33 28 86 -12 227 -103 358 -129 380 -538 468 -162 35 -194 37 -458 27z",
        "M9105 3791 c-64 -40 -100 -100 -89 -149 35 -142 196 -283 359 -313 123 -23 247 14 275 81 31 75 -14 181 -108 255 -155 122 -353 179 -437 126z",
        "M9843 3786 c-80 -67 -63 -192 43 -332 127 -168 368 -259 489 -184 59 37 72 115 33 217 -32 87 -165 216 -284 274 -78 39 -97 44 -169 47 -76 4 -83 2 -112 -22z",
        "M9535 3736 c86 -58 142 -114 169 -168 32 -64 33 -101 3 -161 -20 -38 -21 -44 -7 -37 10 5 25 26 35 46 22 47 15 108 -21 174 -33 60 -72 99 -148 144 -76 46 -97 47 -31 2z",
        "M10384 3616 c64 -81 96 -146 105 -220 l8 -61 16 37 c10 21 17 45 17 55 0 38 -50 120 -101 169 -84 78 -98 84 -45 20z",
        "M12283 3549 c7 -53 144 -334 187 -382 38 -43 47 -46 56 -13 15 62 -85 291 -167 380 -63 69 -84 73 -76 15z",
        "M7632 3396 c94 -39 143 -72 211 -146 148 -160 220 -405 220 -750 0 -328 -73 -632 -197 -819 -77 -116 -158 -179 -316 -249 -23 -10 -22 -11 16 -11 60 -1 187 34 257 71 82 44 179 136 238 226 188 286 234 805 106 1177 -96 277 -281 470 -495 514 -86 18 -102 13 -40 -13z",
        "M1370 3220 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z",
        "M3332 2958 c3 -7 22 -64 42 -126 21 -62 52 -134 69 -160 44 -65 120 -109 200 -116 54 -5 385 -10 1917 -31 179 -2 316 -2 305 1 -17 3 -509 33 -1905 115 -200 12 -286 27 -358 63 -65 33 -161 122 -219 203 -43 60 -61 78 -51 51z",
        "M3750 2361 c-102 -16 -194 -30 -205 -33 -36 -8 283 -18 800 -24 534 -7 1425 3 1425 16 0 4 -109 10 -242 14 -267 7 -665 20 -1083 36 -148 5 -324 12 -390 14 -97 4 -156 -1 -305 -23z",
        "M8536 2321 c-7 -11 12 -463 20 -470 7 -7 119 -19 369 -41 740 -63 1527 -84 2225 -60 919 32 1306 73 1508 160 56 24 128 94 138 134 5 23 -19 106 -47 157 -10 19 -11 18 -52 -5 -171 -100 -803 -176 -1467 -176 -347 0 -1229 36 -1454 60 -141 15 -237 68 -316 175 l-38 52 -419 6 c-230 4 -428 9 -439 13 -12 3 -25 1 -28 -5z",
        "M8289 2010 c-71 -285 -224 -482 -466 -604 -40 -20 -73 -39 -73 -43 0 -9 354 4 465 17 50 6 109 20 132 31 38 18 263 222 263 238 0 4 -56 12 -125 17 -70 6 -131 17 -140 24 -12 10 -15 40 -16 149 -1 75 -4 168 -8 206 l-6 70 -26 -105z",
        "M2685 2009 c61 -10 369 -59 685 -109 316 -49 661 -103 765 -120 l190 -30 685 1 c661 2 679 2 515 15 -998 81 -1856 158 -2714 244 -235 24 -272 24 -126 -1z",
        "M11745 1629 c-60 -4 -364 -10 -674 -14 -311 -3 -567 -7 -568 -9 -6 -6 99 -96 157 -136 290 -197 620 -220 948 -65 105 50 204 113 275 175 74 65 77 64 -138 49z"
    ];

    useEffect(() => {
        // Sequence: 
        // 0s-2.0s: Drawing paths
        // 2.0s-2.5s: Fill fades in (handled by css delay)
        // 2.8s: Start transition
        const timer = setTimeout(() => {
            setStage('transitioning');
            if (onTransitionStart) onTransitionStart();
        }, 2800);

        return () => clearTimeout(timer);
    }, [onTransitionStart]);

    const isTransitioning = stage === 'transitioning' || stage === 'complete';

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
            <div className="z-10 text-center px-4 flex flex-col items-center w-full">

                {/* 
                   Seamless Logo Transition:
                   - Starts centered and large (screen center)
                   - Animates to top position and smaller size
                */}
                <motion.div
                    layout // Enable layout animation
                    className="flex items-center justify-center relative"
                    initial={{ marginBottom: 0, scale: 1.5 }}
                    animate={{
                        marginTop: isTransitioning ? "0px" : "0px",
                        y: isTransitioning ? 0 : 0,
                        scale: isTransitioning ? 1 : 1.5, // Start larger
                        marginBottom: isTransitioning ? "1.5rem" : "0px" // Add margin bottom when it settles
                    }}
                    style={{
                        width: isTransitioning ? '150px' : '600px', // Large to small
                        maxWidth: isTransitioning ? '90vw' : '60vw' // Limit width on mobile so 1.5x scale fits
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Snappy transition (0.8s)
                >
                    <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 1280 640"
                        preserveAspectRatio="xMidYMid meet"
                        className="overflow-visible"
                        style={{ transform: 'scaleX(-1)' }}
                    >
                        <g transform="translate(-150.000000,640.000000) scale(0.100000,-0.100000)" stroke="#FFFFFF" strokeWidth="15">
                            {svgPaths.map((d, index) => (
                                <motion.path
                                    key={index}
                                    d={d}
                                    fill="#FFFFFF"
                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        fillOpacity: 1
                                    }}
                                    transition={{
                                        pathLength: { duration: 2.0, ease: "easeInOut" },
                                        fillOpacity: { duration: 0.5, delay: 2.0 } // Starts at 2.0s, ends at 2.5s
                                    }}
                                />
                            ))}
                        </g>
                    </svg>
                </motion.div>


                {/* Text Content - Reveals when transitioning */}
                <AnimatePresence>
                    {isTransitioning && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }} // Start lower
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold tracking-tighter text-white mb-2">
                                MIRARI
                            </h1>
                            <p className="text-mirari-silver tracking-[0.5em] text-xs md:text-sm lg:text-base uppercase mb-8">
                                Auto Detailing
                            </p>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-lg md:text-xl font-heading text-gray-300 mb-12"
                            >
                                Convenient. Professional. Reliable.
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            >
                                <MagneticButton className="px-8 py-3 md:px-10 md:py-4 bg-white text-mirari-black font-body font-semibold tracking-wide rounded-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow duration-300">
                                    BOOK YOUR DETAIL
                                </MagneticButton>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mirari-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Hero;
