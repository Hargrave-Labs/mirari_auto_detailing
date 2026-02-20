import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Star, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SqueegeeReveal from './SqueegeeReveal';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "ESSENTIA",
        subtitle: "Full Interior Detail",
        description: "Designed to restore your vehicle’s interior. Essentia focuses on a deep vacuum and wipe-down of all carpets, mats, interior surfaces and crevices while preserving materials and plastics. Freshening your car and making it look and feel new again.",
        description: "Designed to restore your vehicle’s interior. Essentia focuses on a deep vacuum and wipe-down of all carpets, mats, interior surfaces and crevices while preserving materials and plastics. Freshening your car and making it look and feel new again.",
        icon: Sparkles,
        details: [
            "Deep vacuum of seats, carpets, and boot",
            "Wipe down of all hard interior surfaces",
            "UV protection applied to plastics and dash",
            "Interior glass and mirrors cleaned",
            "Door jambs wiped down",
            "Deodorizing treatment"
        ]
    },
    {
        title: "CLARITAS",
        subtitle: "Full Exterior Detail",
        description: "An optimised and refined exterior cleaning method suited to your vehicle. Claritas aims to protect and enhance paintwork, tyres, rims, exterior trims, plastics and glass, delivering a glossy and professional finish.",
        description: "An optimised and refined exterior cleaning method suited to your vehicle. Claritas aims to protect and enhance paintwork, tyres, rims, exterior trims, plastics and glass, delivering a glossy and professional finish.",
        icon: Shield,
        details: [
            "Snow foam pre-wash to remove loose dirt",
            "Two-bucket safe hand wash",
            "Wheels, tires, and wheel arches deep cleaned",
            "Chemical decontamination (iron removal)",
            "Plush towel dry & air blow crevices",
            "Tyre dressing applied",
            "Spray sealant applied for 1-month protection",
            "Exterior glass cleaned"
        ]
    },
    {
        title: "ULTIMA",
        subtitle: "Full Detail Package",
        description: "Combining Essentia and Claritas, this is the full and ultimate package. Ultima also includes a deep vacuum and shampoo of the headliner. Experience a package that makes your car look and feel new inside and out.",
        highlight: true,
        highlight: true,
        icon: Star,
        details: [
            "Includes all ESSENTIA interior services",
            "Includes all CLARITAS exterior services",
            "Headliner spot cleaning / shampoo",
            "Leather seats deep cleaned and conditioned (if applicable)",
            "Fabric seats steam cleaned (if applicable)",
            "Engine bay surface wipe down",
            "Upgraded 3-month ceramic spray protection"
        ]
    }
];

const ServiceCard = ({ service, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout="position"
            transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            className={`service-card opacity-0 translate-y-20 relative p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-lg border ${service.highlight ? 'border-mirari-silver/50' : 'border-white/10'} overflow-hidden group hover:border-white/20 transition-colors duration-500`}
        >
            {/* Highlight Banner */}
            {service.highlight && (
                <div className="absolute top-0 right-0 bg-mirari-silver text-mirari-black text-[10px] font-heading font-bold px-4 py-1 rounded-bl-lg tracking-widest uppercase">
                    Most Popular
                </div>
            )}

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

            {/* Sheen Effect */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 md:group-hover:animate-shine left-[125%]" />

            <div className="mb-6 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 relative z-10">
                {service.icon && <service.icon className="w-6 h-6 text-mirari-silver group-hover:text-white transition-colors duration-500" />}
            </div>

            <div className="flex justify-between items-start mb-2 relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">{service.title}</h3>
            </div>

            <h4 className="text-sm md:text-base font-heading text-mirari-silver tracking-widest uppercase mb-6 relative z-10">{service.subtitle}</h4>

            <p className="text-gray-400 font-body leading-relaxed text-sm md:text-base mb-8 relative z-10 h-auto">
                {service.description}
            </p>

            {/* Expandable Details Section */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden relative z-10"
                    >
                        <div className="pt-4 border-t border-white/10 mb-8">
                            <h5 className="text-sm font-heading tracking-widest uppercase text-white mb-4">What's Included</h5>
                            <ul className="space-y-3">
                                {service.details.map((detail, idx) => (
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={idx}
                                        className="flex items-start gap-3 text-sm font-body text-gray-300"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-mirari-silver shrink-0" />
                                        <span>{detail}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-heading font-bold tracking-widest uppercase text-white hover:text-mirari-silver transition-colors duration-300 relative z-10"
            >
                {isExpanded ? 'Hide Details' : 'Explore Package'}
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Background decorative number */}
            <div className="absolute -bottom-4 -right-4 text-9xl font-heading font-bold text-white/[0.02] pointer-events-none select-none z-0">
                0{index + 1}
            </div>
        </motion.div>
    );
};

const Services = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.service-card').forEach((card, i) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: i * 0.2
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={containerRef} className="py-24 md:py-32 px-6 bg-transparent relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <SqueegeeReveal>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                            OUR EXPERTISE
                        </h2>
                    </SqueegeeReveal>
                    <div className="flex items-center justify-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                        PREMIUM PACKAGES
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                    </div>
                </div>

                {/* Changed to a grid that adapts to expanded content better or stack on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>

            {/* Subtle Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mirari-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Services;
