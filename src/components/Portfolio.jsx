import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, urlFor } from '../client';
import { X, ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';
import SqueegeeReveal from './SqueegeeReveal';

gsap.registerPlugin(ScrollTrigger);

const PortfolioModal = ({ item, onClose }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Combine mainImage and gallery into one array for the carousel
    const allImages = React.useMemo(() => {
        if (!item) return [];
        const images = [item.mainImage];
        if (item.gallery && item.gallery.length > 0) {
            images.push(...item.gallery);
        }
        return images;
    }, [item]);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Trap focus/prevent scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, []);

    // Preload all gallery images behind the scenes for faster viewing
    useEffect(() => {
        if (!allImages || allImages.length === 0) return;

        allImages.forEach((imgRef) => {
            const img = new Image();
            img.src = urlFor(imgRef).url();
        });
    }, [allImages]);

    if (!item) return null;

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-mirari-black/95 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    layoutId={`portfolio-card-${item._id}`}
                    className="relative w-full max-w-7xl h-auto max-h-[85dvh] lg:max-h-[90vh] bg-mirari-zinc/50 border border-white/10 rounded-2xl flex flex-col lg:flex-row overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button Inside Modal for Mobile Accessibility */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 lg:top-6 lg:right-6 z-[100] p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all duration-300 border border-white/10"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Left Side: Hero Image / Video Viewer */}
                    <div className="w-full lg:w-2/3 flex-none h-[50vh] lg:h-[85vh] relative bg-black flex items-center justify-center group shrink-0">

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImageIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                src={urlFor(allImages[activeImageIndex]).url()}
                                alt={`${item.title} - Image ${activeImageIndex + 1}`}
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                        </AnimatePresence>

                        {/* Carousel Navigation Arrows */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 z-50 lg:block hidden"
                                >
                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 z-50 lg:block hidden"
                                >
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile: Flow Content Below Image */}
                    <div className="w-full lg:hidden p-5 flex flex-col overflow-y-auto hide-scrollbar z-10 bg-black/20">

                        {/* Details Block */}
                        <div className="mb-2">
                            <h2 className="text-xl font-heading font-bold text-white mb-2 leading-tight drop-shadow-lg pr-12">
                                {item.title}
                            </h2>

                            {item.servicesRendered && item.servicesRendered.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {item.servicesRendered.map((serviceRef, idx) => (
                                        <span key={idx} className="px-2 py-0.5 text-[10px] font-heading font-medium tracking-wider bg-white/10 text-white rounded border border-white/5 uppercase">
                                            {serviceRef.title}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {item.description && (
                                <p className="text-sm text-gray-300 font-body leading-relaxed line-clamp-3">
                                    {item.description}
                                </p>
                            )}
                        </div>

                        {/* Mobile Mini Gallery Horizontal Scroll */}
                        {allImages.length > 1 && (
                            <div className="mt-4">
                                <h4 className="text-[10px] font-heading tracking-[0.2em] text-mirari-silver uppercase mb-2">Gallery ({allImages.length})</h4>
                                <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar snap-x">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative w-12 h-12 shrink-0 snap-start rounded-md overflow-hidden border transition-all duration-300 ${activeImageIndex === idx ? 'border-mirari-silver ring-1 ring-mirari-silver/50' : 'border-transparent opacity-70'}`}
                                        >
                                            <img
                                                src={urlFor(img).width(100).height(100).fit('crop').url()}
                                                alt={`Thumbnail ${idx}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Desktop Details Panel (Hidden on Mobile) */}
                    <div className="hidden lg:flex w-full lg:w-1/3 p-6 md:p-8 lg:p-10 flex-col overflow-y-auto bg-gradient-to-b from-white/5 to-transparent hide-scrollbar relative">

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 lg:mb-6 leading-tight pr-8 lg:pr-0">
                            {item.title}
                        </h2>

                        {item.description && (
                            <p className="text-sm md:text-base text-gray-300 font-body leading-relaxed mb-6 lg:mb-8">
                                {item.description}
                            </p>
                        )}

                        {item.servicesRendered && item.servicesRendered.length > 0 && (
                            <div className="mb-10">
                                <h4 className="text-xs font-heading tracking-[0.2em] text-mirari-silver uppercase mb-4">Packages & Services</h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.servicesRendered.map((serviceRef, idx) => (
                                        <span key={idx} className="px-3 py-1 text-xs font-body font-medium bg-white/10 text-white rounded-full border border-white/5">
                                            {serviceRef.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mini Gallery Grid Desktop */}
                        {allImages.length > 1 && (
                            <div className="mt-auto pt-6 md:pt-8 border-t border-white/10 pb-12 lg:pb-0">
                                <h4 className="text-[10px] md:text-xs font-heading tracking-[0.2em] text-mirari-silver uppercase mb-3 md:mb-4">Gallery ({allImages.length})</h4>
                                <div className="grid grid-cols-3 gap-2 lg:gap-3">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${activeImageIndex === idx ? 'border-mirari-silver' : 'border-transparent hover:border-white/30'}`}
                                        >
                                            <img
                                                src={urlFor(img).width(200).height(200).fit('crop').url()}
                                                alt={`Thumbnail ${idx}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {activeImageIndex !== idx && (
                                                <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors duration-300" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const PortfolioItem = ({ item, index, onClick }) => {
    // Apply asymmetric masonry heights only on md+ screens. On mobile (1 column), they are all equally tall.
    const heights = [
        'h-[350px] md:h-[300px]',
        'h-[350px] md:h-[400px]',
        'h-[350px] md:h-[350px]',
        'h-[350px] md:h-[450px]',
        'h-[350px] md:h-[320px]'
    ];
    const heightClass = heights[index % heights.length];

    return (
        <div className={`portfolio-card w-full ${heightClass} opacity-0 translate-y-10`}>
            <motion.div
                layoutId={`portfolio-card-${item._id}`}
                onClick={() => onClick(item)}
                className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-mirari-zinc/50 block"
            >
                <img
                    src={urlFor(item.mainImage).width(800).url()}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Dark Overlay defaults to 40% and lifts to 20% on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-mirari-black/90 via-mirari-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

                {/* Expand Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-white/20">
                    <Maximize2 className="w-4 h-4 text-white" />
                </div>

                {/* Content Slide-up bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {item.servicesRendered && item.servicesRendered.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {item.servicesRendered.slice(0, 2).map((serviceRef, idx) => (
                                <span key={idx} className="px-2 py-1 text-[10px] uppercase tracking-widest font-heading font-medium bg-mirari-silver/90 text-mirari-black rounded">
                                    {serviceRef.title}
                                </span>
                            ))}
                            {item.servicesRendered.length > 2 && (
                                <span className="px-2 py-1 text-[10px] uppercase tracking-widest font-heading font-medium bg-white/20 backdrop-blur-md text-white border border-white/10 rounded">
                                    +{item.servicesRendered.length - 2}
                                </span>
                            )}
                        </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight">
                        {item.title}
                    </h3>

                    {item.mediaType === 'photos' && item.gallery?.length > 0 && (
                        <div className="mt-2 text-xs text-gray-400 font-body flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                            <span className="w-1 h-1 rounded-full bg-mirari-silver" />
                            {item.gallery.length + 1} Photos
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const Portfolio = () => {
    const containerRef = useRef(null);
    const [portfolioData, setPortfolioData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                // GROQ query to fetch portfolio, ordering by newest, and expanding the services references
                const query = `
                    *[_type == "portfolio"] | order(_createdAt desc) {
                        _id,
                        title,
                        slug,
                        mediaType,
                        mainImage,
                        gallery,
                        description,
                        completedAt,
                        servicesRendered[]->{
                            _id,
                            title
                        }
                    }
                `;
                const data = await client.fetch(query);
                setPortfolioData(data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        };

        fetchPortfolio();
    }, []);

    // Staggered scroll animations for the cards
    useEffect(() => {
        if (portfolioData.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=50",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: (i % 3) * 0.1 // Stagger by column
                });
            });
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }, containerRef);

        return () => ctx.revert();
    }, [portfolioData]);

    return (
        <section id="portfolio" ref={containerRef} className={`py-24 md:py-32 px-6 bg-transparent relative w-full ${selectedItem ? 'z-[100]' : 'z-10'}`}>
            <div className="max-w-7xl mx-auto">

                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <SqueegeeReveal>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                                RECENT WORK
                            </h2>
                        </SqueegeeReveal>
                        <div className="flex items-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                            <span className="w-8 h-[1px] bg-mirari-silver/50" />
                            PORTFOLIO SHOWCASE
                        </div>
                    </div>
                </div>

                {/* CSS Columns layout for a lightweight masonry effect */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {portfolioData.map((item, index) => {
                        const isSelected = selectedItem && selectedItem._id === item._id;
                        return (
                            <div
                                key={item._id}
                                className="break-inside-avoid relative"
                                style={{
                                    zIndex: isSelected ? 50 : 1,
                                    transition: `z-index 0s linear ${isSelected ? '0s' : '0.5s'}`
                                }}
                            >
                                <PortfolioItem
                                    item={item}
                                    index={index}
                                    onClick={setSelectedItem}
                                />
                            </div>
                        );
                    })}
                </div>

                {portfolioData.length === 0 && (
                    <div className="w-full py-20 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-400 font-body">Loading portfolio showcase...</p>
                    </div>
                )}
            </div>

            {/* Detail View Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>

        </section>
    );
};

export default Portfolio;
