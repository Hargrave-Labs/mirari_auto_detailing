import React, { useEffect, useRef } from 'react';

const ParticleFog = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        // Configuration
        const particles = [];
        const mouse = { x: -1000, y: -1000 };
        const colors = ['#584c6e', '#4c4c6d', '#2e2e41']; // Greyish Purple, Slate Indigo, Darker Slate

        // Particle Class
        class Particle {
            constructor(w, h) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.radius = Math.random() * 200 + 100; // Large puffs
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.15 + 0.05; // Low opacity
                this.vx = (Math.random() - 0.5) * 0.2; // Slow base movement
                this.vy = (Math.random() - 0.5) * 0.2;
                this.originalVx = this.vx;
                this.originalVy = this.vy;
            }

            update(w, h, mouseX, mouseY) {
                // Mouse Interaction (Repulsion/Flow)
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 300; // Interaction radius

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;
                    const repulsionStrength = 2.0; // How strong the push is

                    this.vx += forceDirectionX * force * repulsionStrength * 0.1;
                    this.vy += forceDirectionY * force * repulsionStrength * 0.1;
                }

                // Apply friction to return to normal speed
                this.vx += (this.originalVx - this.vx) * 0.02;
                this.vy += (this.originalVy - this.vy) * 0.02;

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
                ctx.beginPath();
                // Create radial gradient for soft puff effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                );

                // Parse hex to rgb for opacity handling
                const hexToRgb = (hex) => {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                }
                const rgb = hexToRgb(this.color);

                if (rgb) {
                    gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`);
                    gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity * 0.5})`);
                    gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
                }

                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize
        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Dynamic particle count based on screen area
            // 1920x1080 = ~2,000,000 pixels. 80 particles = ~25,000 pixels per particle.
            // Mobile (390x844) = ~330,000 pixels. With 18000 density -> ~18 particles.
            const density = 18000;
            const calculatedCount = Math.floor((canvas.width * canvas.height) / density);
            const particleCount = Math.max(20, Math.min(80, calculatedCount)); // Clamp between 20 and 80

            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a base dark layer to blend with
            // ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; // Optional: trails? No, fog shouldn't trail.

            particles.forEach(p => {
                p.update(canvas.width, canvas.height, mouse.x, mouse.y);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        // Event Listeners
        const handleResize = () => init();
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'transparent' }} // Let CSS handles bg-color behind if needed
        />
    );
};

export default ParticleFog;
