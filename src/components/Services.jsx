import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "ESSENTIA",
        subtitle: "Full Interior Detail",
        description: "Designed to restore your vehicle’s interior. Essentia focuses on a deep vacuum and wipe-down of all carpets, mats, interior surfaces and crevices while preserving materials and plastics. Freshening your car and making it look and feel new again."
    },
    {
        title: "CLARITAS",
        subtitle: "Full Exterior Detail",
        description: "An optimised and refined exterior cleaning method suited to your vehicle. Claritas aims to protect and enhance paintwork, tyres, rims, exterior trims, plastics and glass, delivering a glossy and professional finish."
    },
    {
        title: "ULTIMA",
        subtitle: "Full Detail Package",
        description: "Combining Essentia and Claritas, this is the full and ultimate package. Ultima also includes a deep vacuum and shampoo of the headliner. Experience a package that makes your car look and feel new inside and out.",
        highlight: true
    }
];

const ServiceCard = ({ service, index }) => {
    return (
        <div className="service-card opacity-0 translate-y-20 relative p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

            {/* Sheen Effect */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 md:group-hover:animate-shine left-[125%]" />


            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">{service.title}</h3>
            <h4 className="text-sm md:text-base font-heading text-mirari-silver tracking-widest uppercase mb-6">{service.subtitle}</h4>
            <p className="text-gray-400 font-body leading-relaxed text-sm md:text-base">
                {service.description}
            </p>

            <div className="absolute bottom-4 right-4 text-mirari-silver/20 group-hover:text-mirari-silver/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </div>
        </div>
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
        <section ref={containerRef} className="py-24 md:py-32 px-6 bg-transparent relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="col-span-1 md:col-span-3 text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        OUR EXPERTISE
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                        PREMIUM PACKAGES
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                    </div>
                </div>
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>

            {/* Subtle Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mirari-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Services;
