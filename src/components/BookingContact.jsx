import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import SqueegeeReveal from './SqueegeeReveal';

const BookingContact = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="contact" ref={sectionRef} className="py-24 md:py-32 px-6 bg-mirari-black relative z-10 border-t border-white/5">
            {/* Subtle glow behind the form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[60vh] bg-mirari-fog-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">

                    {/* Left Column: Contact Info & Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <SqueegeeReveal>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                                READY TO BE MARVELLED
                            </h2>
                        </SqueegeeReveal>
                        <h3 className="text-xl font-heading text-mirari-silver mb-8 uppercase tracking-widest">
                            Experience automotive perfection
                        </h3>
                        <p className="text-gray-400 font-body leading-relaxed mb-12">
                            Contact us directly or fill out the booking inquiry form to secure your appointment. We welcome every vehicle and will personally guide you towards the best package for your specific needs.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <Phone className="text-mirari-silver w-5 h-5 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-heading tracking-widest text-gray-500 uppercase mb-1">Direct Line</p>
                                    <a href="tel:0490360762" className="text-white font-body hover:opacity-80 transition-opacity">
                                        0490 360 762
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <Mail className="text-mirari-silver w-5 h-5 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-heading tracking-widest text-gray-500 uppercase mb-1">Email</p>
                                    <a href="mailto:info@mirari.com" className="text-white font-body hover:opacity-80 transition-opacity">
                                        info@mirari.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <MapPin className="text-mirari-silver w-5 h-5 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-heading tracking-widest text-gray-500 uppercase mb-1">Service Area</p>
                                    <p className="text-white font-body">
                                        We come to you — anywhere, anytime.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: the Booking Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl relative"
                    >
                        <h4 className="text-2xl font-heading font-bold text-white mb-8 border-b border-white/10 pb-4">
                            INQUIRY FORM
                        </h4>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Vehicle Make & Model</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Porsche 911 GT3"
                                    className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors placeholder:text-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Service of Interest</label>
                                <select
                                    defaultValue=""
                                    className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors appearance-none"
                                >
                                    <option value="" disabled>Select a package...</option>
                                    <option value="essentia">ESSENTIA - Full Interior</option>
                                    <option value="claritas">CLARITAS - Full Exterior</option>
                                    <option value="ultima">ULTIMA - Premium Full Detail</option>
                                    <option value="other">Other / Not Sure</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Additional Details</label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-white text-mirari-black py-4 font-heading font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors mt-4 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-mirari-silver translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10">Submit Inquiry</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BookingContact;
