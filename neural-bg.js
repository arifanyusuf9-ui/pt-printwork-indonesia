class NeuralBackground {
    constructor(canvasId, containerSelector, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.container = document.querySelector(containerSelector);
        if (!this.canvas || !this.container) return;

        // Use { alpha: false } for better performance if possible, 
        // but we need to match the background color exactly.
        this.ctx = this.canvas.getContext('2d');
        this.color = options.color || '#7AB818'; // Lime
        this.trailOpacity = options.trailOpacity || 0.15;
        this.particleCount = options.particleCount || 400; // Balanced for performance
        this.speed = options.speed || 1;
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        this.animationFrameId = null;
        this.isVisible = false;

        this.init();
        this.setupObserver();

        window.addEventListener('resize', () => this.handleResize());
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    setupObserver() {
        // Stop animation when not in viewport to save CPU/GPU during scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (this.isVisible) {
                    this.animate();
                } else {
                    cancelAnimationFrame(this.animationFrameId);
                }
            });
        }, { threshold: 0.01 });

        observer.observe(this.container);
    }

    init() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Cap DPR to 1.5 - 2 to prevent massive canvas buffers on ultra-high-res screens
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.width, this.height));
        }
    }

    animate() {
        if (!this.isVisible) return;

        this.ctx.globalAlpha = 1;
        // Match the exact navy background
        this.ctx.fillStyle = `rgba(13, 27, 62, ${this.trailOpacity})`;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.particles.forEach((p) => {
            p.update(this.width, this.height, this.mouse, this.speed);
            p.draw(this.ctx, this.color);
        });

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        this.init();
    }

    handleMouseMove(e) {
        if (!this.isVisible) return;
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    handleMouseLeave() {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
    }
}

class Particle {
    constructor(width, height) {
        this.reset(width, height);
    }

    update(width, height, mouse, speed) {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distanceSq = (dx * dx + dy * dy);
        const interactionRadiusSq = 150 * 150;

        if (distanceSq < interactionRadiusSq) {
            const dist = Math.sqrt(distanceSq);
            const force = (150 - dist) / 150;
            this.vx -= dx * force * 0.05;
            this.vy -= dy * force * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.age++;
        if (this.age > this.life) {
            this.reset(width, height);
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    reset(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
        ctx.globalAlpha = alpha;
        ctx.fillRect(this.x, this.y, 1.5, 1.5);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NeuralBackground('neural-canvas', '.hero', {
        color: '#7AB818',
        trailOpacity: 0.1,
        particleCount: 250, // Reduced from 400 for better performance
        speed: 0.8
    });
});
