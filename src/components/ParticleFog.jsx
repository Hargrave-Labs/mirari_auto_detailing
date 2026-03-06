import React, { useEffect, useRef } from 'react';

const ParticleFog = ({ visible = true }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particles = [];
        const colors = ['#584c6e', '#4c4c6d', '#2e2e41']; // Greyish Purple, Slate Indigo, Darker Slate

        // OPTIMIZATION: Pre-render sprites
        // Instead of calculating a gradient every frame for every particle,
        // we create one master image for each color and reuse it.
        const sprites = {};
        const spriteSize = 256; // 256px is usually sufficient for soft fog
        const halfSprite = spriteSize / 2;

        colors.forEach(color => {
            const spriteCanvas = document.createElement('canvas');
            spriteCanvas.width = spriteSize;
            spriteCanvas.height = spriteSize;
            const spriteCtx = spriteCanvas.getContext('2d');

            // Parse hex to rgb
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);

            // Create gradient on the sprite
            // We use full alpha here (1 -> 0) and control actual transparency with globalAlpha
            const gradient = spriteCtx.createRadialGradient(
                halfSprite, halfSprite, 0,
                halfSprite, halfSprite, halfSprite
            );
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
            gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.5)`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            spriteCtx.fillStyle = gradient;
            spriteCtx.fillRect(0, 0, spriteSize, spriteSize);

            sprites[color] = spriteCanvas;
        });

        // Particle Class
        class Particle {
            constructor(w, h) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.radius = Math.random() * 200 + 100; // Large puffs
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.15 + 0.05; // Low opacity
                this.vx = (Math.random() - 0.5) * 1; // Configurable speed multiplier (5 is quite fast, 0.5 is slow)
                this.vy = (Math.random() - 0.5) * 1;
            }

            update(w, h) {
                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Screen Wrap
                if (this.x < -this.radius) this.x = w + this.radius;
                if (this.x > w + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = h + this.radius;
                if (this.y > h + this.radius) this.y = -this.radius;
            }

            draw(ctx) {
                // OPTIMIZATION: Use drawImage instead of createRadialGradient
                const sprite = sprites[this.color];

                ctx.globalAlpha = this.opacity;
                ctx.drawImage(
                    sprite,
                    this.x - this.radius,
                    this.y - this.radius,
                    this.radius * 2,
                    this.radius * 2
                );
                ctx.globalAlpha = 1.0; // Reset alpha for next operations if needed
            }
        }

        // Initialize
        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Reduce density slightly for even better performance on laptops
            // Old density 18000 -> New density 20000 (fewer particles)
            const density = 20000;
            const calculatedCount = Math.floor((canvas.width * canvas.height) / density);
            const particleCount = Math.max(15, Math.min(60, calculatedCount)); // Cap at 60 instead of 80

            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        // Animation Loop
        const animate = () => {
            // Using clearRect is faster than fillRect for transparancy clearing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        // Event Listeners
        const handleResize = () => {
            // Only update dimensions, do not recreate particles to prevent mobile scroll glitch
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-[2000ms] ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'transparent' }} // Let CSS handles bg-color behind if needed
        />
    );
};

export default ParticleFog;
