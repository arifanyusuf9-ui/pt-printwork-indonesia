/**
 * PT Printwork Scrollytelling Animation
 * Optimized for mobile performance.
 */

class Scrollytelling {
    constructor(options) {
        this.canvas = document.querySelector(options.canvasSelector);
        this.isMobileDevice = window.innerWidth <= 768;

        // Optimize pixel ratio for mobile
        const maxPR = this.isMobileDevice ? 1.0 : 1.5;
        this.pixelRatio = Math.min(window.devicePixelRatio, maxPR);

        this.context = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true // Lower latency
        });

        this.context.imageSmoothingEnabled = false;
        this.framesDir = options.framesDir;
        this.frameCount = options.frameCount;
        this.triggerSelector = options.triggerSelector;
        this.images = [];
        this.currentFrameIndex = -1; // Force first render
        this.loadedImagesCount = 0;
        this.isVisible = false;

        this.targetFrameIndex = 0;
        this.lerpFrameIndex = 0;
        this.lerpAmount = this.isMobileDevice ? 0.08 : 0.06; // Faster response on mobile

        this.init();
    }

    async init() {
        this.setupCanvas();

        // Narrative cache
        this.slides = document.querySelectorAll('.narrative-slide');
        this.slideCache = Array.from(this.slides).map(() => ({
            opacity: -1,
            translateY: -1,
            visibility: ''
        }));

        this.triggerElement = document.querySelector(this.triggerSelector);

        await this.preloadImages();
        this.setupScrollListener();
        this.setupVisibilityObserver();
        this.startAnimationLoop();

        window.addEventListener('resize', () => {
            this.isMobileDevice = window.innerWidth <= 768;
            this.setupCanvas();
            this.render(true); // Force render
        }, { passive: true });

        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth * this.pixelRatio;
        this.canvas.height = window.innerHeight * this.pixelRatio;
        this.context.imageSmoothingEnabled = false;
    }

    async preloadImages() {
        const promises = [];
        // On mobile, we could technically skip frames, but let's try full set first with optimizations
        for (let i = 0; i < this.frameCount; i++) {
            const src = `${this.framesDir}/${i + 1}-ezgif.com-webp-to-jpg-converter.jpg`;
            const img = new Image();
            img.src = src;
            promises.push(new Promise((resolve) => {
                img.onload = () => { this.loadedImagesCount++; resolve(); };
                img.onerror = () => resolve();
            }));
            this.images[i] = img;
        }
        await Promise.all(promises);
    }

    setupVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            this.isVisible = entries[0].isIntersecting;
        }, { threshold: 0.01 });
        observer.observe(this.triggerElement);
    }

    setupScrollListener() {
        if (!this.triggerElement) return;

        window.addEventListener('scroll', () => {
            if (!this.isVisible) return;
            const rect = this.triggerElement.getBoundingClientRect();
            const scrollDistance = -rect.top;
            const scrollHeight = this.triggerElement.offsetHeight - window.innerHeight;
            const relativeScroll = Math.max(0, Math.min(1, scrollDistance / scrollHeight));
            this.targetFrameIndex = relativeScroll * (this.frameCount - 1);
        }, { passive: true });
    }

    startAnimationLoop() {
        const update = () => {
            if (this.isVisible) {
                const diff = this.targetFrameIndex - this.lerpFrameIndex;
                if (Math.abs(diff) > 0.01) {
                    this.lerpFrameIndex += diff * this.lerpAmount;
                    const nextFrame = Math.round(this.lerpFrameIndex);

                    // Only render if frame changed OR we are in motion
                    if (nextFrame !== this.currentFrameIndex) {
                        this.currentFrameIndex = nextFrame;
                        this.render();
                    } else {
                        // Still update narrative on every lerp frame for smoothness if needed
                        // but actually better to throttle it to the render call
                        this.updateNarrative();
                    }
                }
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    updateNarrative() {
        const relScroll = this.lerpFrameIndex / (this.frameCount - 1);
        if (!this.slides) return;

        this.slides.forEach((slide, index) => {
            let start, end;
            if (index === 0) { start = 0; end = 0.20; }
            else if (index === 1) { start = 0.20; end = 0.45; }
            else if (index === 2) { start = 0.45; end = 0.70; }
            else { start = 0.70; end = 1.0; }

            let opacity = 0;
            let translateY = 40;

            if (relScroll >= start && relScroll <= end) {
                const slideProgress = (relScroll - start) / (end - start);
                if (slideProgress < 0.2) {
                    const p = slideProgress / 0.2;
                    opacity = p;
                    translateY = 40 * (1 - p);
                } else if (slideProgress < 0.8) {
                    opacity = 1;
                    translateY = 0;
                } else {
                    const p = (slideProgress - 0.8) / 0.2;
                    opacity = 1 - p;
                    translateY = -40 * p;
                }
            } else if (relScroll > end) {
                opacity = 0;
                translateY = -40;
            } else {
                opacity = 0;
                translateY = 40;
            }

            // GPU Accelerated and Cached Updates
            const cache = this.slideCache[index];
            if (cache.opacity !== opacity || cache.translateY !== translateY) {
                const vis = opacity > 0.01 ? 'visible' : 'hidden';
                slide.style.opacity = opacity.toFixed(3);
                slide.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
                if (cache.visibility !== vis) {
                    slide.style.visibility = vis;
                    cache.visibility = vis;
                }
                slide.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';

                cache.opacity = opacity;
                cache.translateY = translateY;
            }
        });
    }

    render(force = false) {
        const img = this.images[this.currentFrameIndex];
        if (!img || !img.complete) return;

        this.updateNarrative();

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const scaleBase = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const rel = this.lerpFrameIndex / (this.frameCount - 1);

        // Simplify for mobile
        const dynamicScale = this.isMobileDevice ? 1.02 : (1 + (rel * 0.08));
        const rotation = this.isMobileDevice ? 0 : rel * (Math.PI / 36);

        const scale = scaleBase * dynamicScale;
        const x = canvasWidth / 2;
        const y = canvasHeight / 2;

        this.context.clearRect(0, 0, canvasWidth, canvasHeight);

        if (rotation === 0) {
            this.context.drawImage(
                img,
                x - (imgWidth * scale) / 2,
                y - (imgHeight * scale) / 2,
                imgWidth * scale,
                imgHeight * scale
            );
        } else {
            this.context.save();
            this.context.translate(x, y);
            this.context.rotate(rotation);
            this.context.drawImage(
                img,
                - (imgWidth * scale) / 2,
                - (imgHeight * scale) / 2,
                imgWidth * scale,
                imgHeight * scale
            );
            this.context.restore();
        }
    }
}

window.Scrollytelling = Scrollytelling;
