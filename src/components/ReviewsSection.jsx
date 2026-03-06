import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import SqueegeeReveal from './SqueegeeReveal';
import { client, urlFor } from '../client';

const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-500' : 'text-gray-600'} fill-current`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const ReviewCard = ({ review }) => {
    return (
        <div className="group w-[85vw] max-w-[340px] md:w-[45vw] md:max-w-[420px] lg:w-[30vw] lg:max-w-[450px] flex-shrink-0 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/5 hover:border-mirari-silver/30 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] hover:-translate-y-2 relative flex flex-col justify-between min-h-[250px] text-left overflow-hidden">
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-mirari-silver/0 via-mirari-silver/0 to-mirari-silver/0 group-hover:to-mirari-silver/[0.03] pointer-events-none transition-all duration-500" />

            {/* Header: Avatar & Name */}
            <div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-mirari-black flex items-center justify-center text-white font-bold text-lg border border-white/10 shadow-inner flex-shrink-0 group-hover:border-mirari-silver/50 transition-colors duration-500">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-white font-heading font-semibold text-base md:text-lg tracking-wide line-clamp-1 group-hover:text-mirari-silver transition-colors duration-500">
                            {review.name}
                        </h3>
                    </div>
                </div>

                <div className="relative z-10 transform origin-left group-hover:scale-105 transition-transform duration-500">
                    <StarRating rating={review.rating || 5} />
                </div>

                <p className="text-gray-300 text-sm md:text-base font-body leading-relaxed mb-6 relative z-10 group-hover:text-white transition-colors duration-500">
                    "{review.description}"
                </p>
            </div>

            {/* Photos */}
            {review.photos && review.photos.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mt-auto relative z-10" onPointerDown={(e) => e.stopPropagation()}>
                    {review.photos.map((photo, i) => (
                        photo?.asset && (
                            <img
                                key={i}
                                src={urlFor(photo).width(300).height(200).url()}
                                alt={`Review photo ${i + 1}`}
                                draggable="false"
                                className="w-24 h-16 md:w-28 md:h-20 object-cover rounded-lg border border-white/10 group-hover:border-mirari-silver/30 transition-all hover:scale-110 duration-500 transform origin-center shadow-lg"
                                loading="lazy"
                            />
                        )
                    ))}
                </div>
            )}

            {/* Google Icon Watermark */}
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none z-0">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12.545,10.539h6.156c0.124,1.404-0.128,3.673-1.61,5.65c-1.397,1.865-3.815,2.775-6.545,2.775 c-5.264,0-9.545-4.281-9.545-9.545s4.281-9.545,9.545-9.545c2.32,0,4.484,0.78,6.172,2.333l-2.463,2.463 c-0.654-0.627-1.921-1.353-3.709-1.353c-3.133,0-5.78,2.532-5.78,5.78s2.648,5.78,5.78,5.78c3.085,0,4.352-1.892,4.64-3.102h-3.64 v-3.197H12.545z" />
                </svg>
            </div>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="flex gap-6 overflow-hidden w-full px-6 opacity-50 pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[320px] md:w-[420px] flex-shrink-0 p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 animate-pulse h-64 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0" />
                    <div className="space-y-2 flex-1 text-left">
                        <div className="h-4 bg-white/10 rounded w-32" />
                        <div className="h-3 bg-white/10 rounded w-20" />
                    </div>
                </div>
                <div className="space-y-3 mt-4 flex-1">
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
            </div>
        ))}
    </div>
);

const ReviewsCarousel = ({ reviews }) => {
    const listRef = useRef(null);

    // Duplicate reviews to create enough track for an infinite loop feeling
    const displayReviews = useMemo(() => {
        if (!reviews || reviews.length === 0) return [];
        // Create 7 identical sets for smooth wrapping behavior (gives extreme runway to both sides)
        return [...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews];
    }, [reviews]);

    const scroll = (direction) => {
        if (listRef.current) {
            const container = listRef.current;
            const cardElement = container.firstElementChild;
            // Dynamically calculate gap based on breakpoint to ensure scroll precisely snaps 1 item.
            const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 768 ? 24 : 16;
            const scrollAmount = cardElement ? cardElement.offsetWidth + gap : container.clientWidth * 0.85;

            const currentScroll = container.scrollLeft;
            const scrollTo = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

            container.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (!listRef.current) return;
        const container = listRef.current;

        const singleSetWidth = container.scrollWidth / 7;

        // Endless Carousel Reset Logic
        // If we reach near the first set, jump to the middle seamlessly without animating
        if (container.scrollLeft < singleSetWidth) {
            container.scrollLeft += singleSetWidth * 3;
        }
        // If we reach near the last set, jump to the middle seamlessly
        else if (container.scrollLeft > singleSetWidth * 5) {
            container.scrollLeft -= singleSetWidth * 3;
        }
    };

    // Center the scroll track on mount so you start seamlessly with previous/next cards available
    useEffect(() => {
        if (listRef.current) {
            const container = listRef.current;
            const singleSetWidth = container.scrollWidth / 7;
            container.scrollLeft = singleSetWidth * 3;
        }
    }, [displayReviews]);

    if (reviews.length === 0) return null;

    return (
        <div className="relative w-full flex items-center py-10 overflow-visible">
            {/* Left Nav Arrow */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-2 md:left-4 lg:left-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
                aria-label="Scroll left"
            >
                <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Scroll Track */}
            <div
                ref={listRef}
                onScroll={handleScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 gap-4 md:gap-6 lg:gap-8 justify-start py-8 -my-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {displayReviews.map((r, i) => (
                    <div key={`carousel-${i}-${r._id || r.name}`} className="snap-center shrink-0 flex items-start justify-center">
                        <ReviewCard review={r} />
                    </div>
                ))}
            </div>

            {/* Right Nav Arrow */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-2 md:right-4 lg:right-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
                aria-label="Scroll right"
            >
                <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    );
};

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const query = `*[_type == "review"] | order(_createdAt desc)`;
                const data = await client.fetch(query);
                setReviews(data || []);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <section id="reviews" className="relative py-24 overflow-hidden z-20 bg-transparent">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-mirari-fog-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-16 px-6 max-w-7xl mx-auto"
                >
                    <SqueegeeReveal>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                            CLIENT EXPERIENCES
                        </h2>
                    </SqueegeeReveal>
                    <div className="flex items-center justify-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                        Google Reviews
                        <span className="w-8 h-[1px] bg-mirari-silver/50" />
                    </div>
                </motion.div>

                {/* Reviews Marquee */}
                <div className="w-full relative bg-transparent py-4 text-center">
                    {loading ? (
                        <LoadingSkeleton />
                    ) : reviews && reviews.length > 0 ? (
                        <ReviewsCarousel reviews={reviews} />
                    ) : (
                        <div className="text-mirari-silver font-body opacity-60">
                            Check back later for client experiences.
                        </div>
                    )}
                </div>

                {/* CTA / Google Link */}
                <div className="text-center mt-16 px-6 relative z-20 max-w-7xl mx-auto">
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
