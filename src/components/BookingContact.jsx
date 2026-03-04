import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import SqueegeeReveal from './SqueegeeReveal';
import { client } from '../client';

const BookingContact = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [servicesData, setServicesData] = useState([]);

    // Form State
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
        <section id="contact" ref={sectionRef} className="py-24 md:py-32 px-6 bg-transparent relative z-10 border-t border-white/5">
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
                                className="w-full bg-white text-mirari-black py-4 font-heading font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors mt-4 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-mirari-silver translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10">
                                    {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Inquiry Sent! ✓' : 'Submit Inquiry'}
                                </span>
                            </button>
                            {status === 'error' && (
                                <p className="text-red-400 text-sm font-body mt-2 text-center">
                                    Something went wrong. Please try again or contact us directly.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BookingContact;
