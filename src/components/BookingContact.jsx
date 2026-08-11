import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, CalendarCheck, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import SqueegeeReveal from './SqueegeeReveal';
import { client } from '../client';
import { BOOKING_URL } from '../config/booking';

const bookingSteps = [
    'Choose your package',
    'Pick a date and time that suits you',
    'Get confirmed on the spot',
];

// Secondary channel: for custom jobs, unusual vehicles, or anyone who wants a
// conversation before committing to a time slot. Owns its own submission state
// so the section above it stays purely presentational.
const EnquiryForm = () => {
    const [servicesData, setServicesData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        makeModel: '',
        service: '',
        details: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const query = `*[_type == "service"]`;
                const data = await client.fetch(query);

                // Sort to maintain ESSENTIA -> CLARITAS -> ULTIMA order
                const order = { 'ESSENTIA': 1, 'CLARITAS': 2, 'ULTIMA': 3 };
                data.sort((a, b) => (order[a.title?.toUpperCase()] || 99) - (order[b.title?.toUpperCase()] || 99));

                setServicesData(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Web3Forms Setup
        const accessKey = "b0298d72-fafd-48b2-9370-1d81ec1c471a";

        const data = new FormData();
        data.append("access_key", accessKey);
        data.append("subject", `New Inquiry from ${formData.firstName} ${formData.lastName} - ${formData.makeModel}`);
        data.append("from_name", "Mirari Auto Detailing Website");
        // Optional: sending the user to carbon copy if needed, or reply_to
        if (formData.email) {
            data.append("replyto", formData.email);
        }

        // Add all form fields to the body
        data.append("Name", `${formData.firstName} ${formData.lastName}`);
        data.append("Email", formData.email);
        data.append("Phone", formData.phone);
        data.append("Vehicle Info", formData.makeModel);
        data.append("Service of Interest", formData.service);
        data.append("Additional Details", formData.details);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    makeModel: '',
                    service: '',
                    details: ''
                });
                setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Vehicle Make & Model</label>
                <input
                    type="text"
                    name="makeModel"
                    value={formData.makeModel}
                    onChange={handleChange}
                    placeholder="e.g., Porsche 911 GT3"
                    required
                    className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors placeholder:text-gray-600"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Service of Interest</label>
                <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors appearance-none"
                >
                    <option value="" disabled>Select a package...</option>
                    {servicesData.map((service, index) => (
                        <option key={service._id || index} value={service.title?.toLowerCase() || ''}>
                            {service.title}{service.subtitle ? ` - ${service.subtitle}` : ''}
                        </option>
                    ))}
                    <option value="other">Other / Not Sure</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-heading tracking-widest text-mirari-silver uppercase">Additional Details</label>
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-mirari-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-mirari-silver transition-colors resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-white/10 border border-white/20 text-white py-4 font-heading font-bold tracking-widest uppercase hover:bg-white/20 transition-colors mt-4 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Enquiry Sent! ✓' : 'Send Enquiry'}
            </button>
            {status === 'error' && (
                <p className="text-red-400 text-sm font-body mt-2 text-center">
                    Something went wrong. Please try again or contact us directly.
                </p>
            )}
        </form>
    );
};

const BookingContact = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    return (
        <section id="contact" ref={sectionRef} className="py-24 md:py-32 px-6 bg-transparent relative z-10 border-t border-white/5">
            {/* Subtle glow behind the form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[60vh] bg-mirari-fog-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">

                    {/* Left Column: Contact Info & Value Prop */}
                    <div className="flex flex-col justify-center">
                        <SqueegeeReveal>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                                READY TO BE MARVELLED
                            </h2>
                        </SqueegeeReveal>
                        <h3 className="text-xl font-heading text-mirari-silver mb-8 uppercase tracking-widest">
                            Experience automotive perfection
                        </h3>
                        <p className="text-gray-400 font-body leading-relaxed mb-12">
                            Book online in under a minute — choose your package, pick a time, and we come to you. Prefer to talk it through first? Call, email, or send an enquiry and we will personally guide you towards the best package for your vehicle.
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
                                    <a href="mailto:mirariautodetailing@gmail.com" className="text-white font-body hover:opacity-80 transition-opacity">
                                        mirariautodetailing@gmail.com
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
                                        We come to you — servicing Melbourne&#39;s South-East.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: online booking (primary), enquiry form (secondary) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl relative">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <CalendarCheck className="text-mirari-silver w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-heading font-bold text-white">
                                        BOOK ONLINE
                                    </h4>
                                    <p className="text-xs font-heading tracking-widest text-gray-500 uppercase mt-1">
                                        Live availability
                                    </p>
                                </div>
                            </div>

                            <ol className="space-y-5 mb-10">
                                {bookingSteps.map((step, index) => (
                                    <li key={step} className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-mirari-black/50 border border-white/10 flex items-center justify-center text-xs font-heading font-bold text-mirari-silver shrink-0">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-300 font-body text-sm md:text-base">
                                            {step}
                                        </span>
                                    </li>
                                ))}
                            </ol>

                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center bg-white text-mirari-black py-4 font-heading font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-mirari-silver translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Book Your Detail
                                    <ExternalLink className="w-4 h-4" />
                                </span>
                            </a>

                            <p className="text-xs font-body text-gray-500 text-center mt-4">
                                Secure booking handled by Square. Opens in a new tab.
                            </p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setIsEnquiryOpen(!isEnquiryOpen)}
                                aria-expanded={isEnquiryOpen}
                                className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left hover:bg-white/[0.03] transition-colors"
                            >
                                <span>
                                    <span className="block text-sm font-heading font-bold tracking-widest uppercase text-white">
                                        Something custom in mind?
                                    </span>
                                    <span className="block text-sm font-body text-gray-500 mt-2">
                                        Send an enquiry and we will come back to you personally.
                                    </span>
                                </span>
                                {isEnquiryOpen
                                    ? <ChevronUp className="w-5 h-5 text-mirari-silver shrink-0" />
                                    : <ChevronDown className="w-5 h-5 text-mirari-silver shrink-0" />}
                            </button>

                            <AnimatePresence initial={false}>
                                {isEnquiryOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-8 md:pb-10 pt-8 border-t border-white/10">
                                            <EnquiryForm />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BookingContact;
