import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterGallery = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position based on mouse/touch event
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

        setSliderPosition(percent);
    };

    const handleInteractionStart = () => setIsDragging(true);
    const handleInteractionEnd = () => setIsDragging(false);

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    // Placeholder images for now since generation failed, replace with reliable Unsplash sources
    const beforeImage = "https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=1600&q=80"; // dusty car
    const afterImage = "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1600&q=80"; // pristine car

    return (
        <section id="effect" className="relative w-full py-24 md:py-32 bg-mirari-black flex flex-col items-center justify-center overflow-hidden">
            <div className="z-20 text-center mb-16 px-4">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">THE MIRARI EFFECT</h2>
                <div className="flex items-center justify-center gap-2 text-mirari-silver font-body tracking-wider uppercase text-sm">
                    <span className="w-8 h-[1px] bg-mirari-silver/50" />
                    DRAG TO REVEAL PERFECTION
                    <span className="w-8 h-[1px] bg-mirari-silver/50" />
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative w-full max-w-5xl mx-auto h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden cursor-ew-resize select-none"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseDown={handleInteractionStart}
                onTouchStart={handleInteractionStart}
            >
                {/* After Image (Base) */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${afterImage})` }}
                />

                {/* Before Image (Overlay) */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center border-r-[3px] border-white/80"
                    style={{
                        backgroundImage: `url(${beforeImage})`,
                        width: `${sliderPosition}%`
                    }}
                >
                    {/* Shadow for depth */}
                    <div className="absolute inset-y-0 right-0 w-8 translate-x-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 pointer-events-none group flex items-center justify-center transform -translate-x-1/2"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-110">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                        </svg>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur text-white text-xs font-heading tracking-widest uppercase rounded">Before</div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur text-white text-xs font-heading tracking-widest uppercase rounded">After</div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mirari-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default BeforeAfterGallery;
