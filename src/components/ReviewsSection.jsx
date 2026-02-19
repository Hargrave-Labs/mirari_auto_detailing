import React from 'react';
import { motion } from 'framer-motion';

// Mock Data for Initial Implementation
const reviews = [
    {
        id: 1,
        name: "James Thompson",
        rating: 5,
        text: "Absolutely stunned by the results. My car looks better than the day I bought it. The ceramic coating is a game changer.",
        date: "2 weeks ago"
    },
    {
        id: 2,
        name: "Sarah Lewis",
        rating: 5,
        text: "Professional, punctual, and incredibly detailed. Mirari transformed my SUV. Highly recommend!",
        date: "1 month ago"
    },
    {
        id: 3,
        name: "Michael Ross",
        rating: 5,
        text: "Best detailing service in the area. The attention to detail is unmatched. Worth every penny.",
        date: "3 weeks ago"
    },
    {
        id: 4,
        name: "David Kim",
        rating: 5,
        text: "Brought my vintage Porsche here and they treated it with such care. The paint correction is flawless.",
        date: "2 months ago"
    }
];

const StarRating = () => (
    <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const ReviewsSection = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden z-20">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-mirari-fog-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        CLIENT EXPERIENCES
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                        Google Reviews
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                    </div>
                </motion.div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                        >
                            {/* Header: Avatar & Name */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-sm border border-white/10">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-white font-heading font-semibold text-sm">
                                        {review.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs font-body">
                                        {review.date}
                                    </p>
                                </div>
                            </div>

                            <StarRating />

                            <p className="text-gray-300 text-sm font-body leading-relaxed">
                                "{review.text}"
                            </p>

                            {/* Google Icon Watermark */}
                            <div className="absolute top-6 right-6 opacity-20">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                    <path d="M12.545,10.539h6.156c0.124,1.404-0.128,3.673-1.61,5.65c-1.397,1.865-3.815,2.775-6.545,2.775 c-5.264,0-9.545-4.281-9.545-9.545s4.281-9.545,9.545-9.545c2.32,0,4.484,0.78,6.172,2.333l-2.463,2.463 c-0.654-0.627-1.921-1.353-3.709-1.353c-3.133,0-5.78,2.532-5.78,5.78s2.648,5.78,5.78,5.78c3.085,0,4.352-1.892,4.64-3.102h-3.64 v-3.197H12.545z" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA / Google Link */}
                <div className="text-center mt-12">
                    <a
                        href="https://www.google.com/search?q=Mirari+Auto+Detailing+Reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-mirari-silver hover:text-white transition-colors text-sm font-body tracking-wide border-b border-transparent hover:border-white pb-1"
                    >
                        See all reviews on Google
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Subtle Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mirari-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default ReviewsSection;
