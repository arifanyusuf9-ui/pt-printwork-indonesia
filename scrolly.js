/**
 * PT Printwork Scrollytelling Animation
 * v2 Ultra-Optimization for Mobile Performance
 */

class Scrollytelling {
    constructor(options) {
        this.canvas = document.querySelector(options.canvasSelector);
        this.isMobileDevice = window.innerWidth <= 768;

        // Ultra-low PR for mobile (0.8x for performance)
        this.pixelRatio = this.isMobileDevice ? 0.8 : 1.25;

        this.context = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true
        });

        this.context.imageSmoothingEnabled = false;
        this.framesDir = options.framesDir;
        this.frameCount = options.frameCount;
        this.triggerSelector = options.triggerSelector;
        this.images = [];
        this.currentFrameIndex = -1;
        this.loadedImagesCount = 0;
        this.isVisible = false;

        this.targetFrameIndex = 0;
        this.lerpFrameIndex = 0;
        // More aggressive lerp for mobile snappiness
        this.lerpAmount = this.isMobileDevice ? 0.15 : 0.06;

        this.init();
    }

    async init() {
        this.setupCanvas();

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
            const wasMobile = this.isMobileDevice;
            this.isMobileDevice = window.innerWidth <= 768;
            if (wasMobile !== this.isMobileDevice) {
                this.pixelRatio = this.isMobileDevice ? 0.8 : 1.25;
                this.setupCanvas();
            }
        }, { passive: true });

        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }

    setupCanvas() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.canvas.width = w * this.pixelRatio;
        this.canvas.height = h * this.pixelRatio;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.context.imageSmoothingEnabled = false;
    }

    async preloadImages() {
        const promises = [];
        // CRITICAL MOBILE OPTIMIZATION: Only load EVERY OTHER frame on mobile to save 50% memory/bandwidth
        const step = this.isMobileDevice ? 2 : 1;

        for (let i = 0; i < this.frameCount; i += step) {
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

                    let nextFrame = Math.round(this.lerpFrameIndex);

                    // Mobile: Find nearest loaded frame
                    if (this.isMobileDevice && !this.images[nextFrame]) {
                        nextFrame = Math.floor(nextFrame / 2) * 2;
                    }

                    if (nextFrame !== this.currentFrameIndex && this.images[nextFrame]) {
                        this.currentFrameIndex = nextFrame;
                        this.render();
                    } else {
                        // Keep text smooth even if frame doesn't change
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
            let translateY = 30; // Reduced for performance

            if (relScroll >= start && relScroll <= end) {
                const slideProgress = (relScroll - start) / (end - start);
                if (slideProgress < 0.2) {
                    opacity = slideProgress / 0.2;
                    translateY = 30 * (1 - opacity);
                } else if (slideProgress < 0.8) {
                    opacity = 1;
                    translateY = 0;
                } else {
                    const p = (slideProgress - 0.8) / 0.2;
                    opacity = 1 - p;
                    translateY = -30 * p;
                }
            } else if (relScroll > end) {
                opacity = 0; translateY = -30;
            } else {
                opacity = 0; translateY = 30;
            }

            const cache = this.slideCache[index];
            if (Math.abs(cache.opacity - opacity) > 0.01 || Math.abs(cache.translateY - translateY) > 0.5) {
                slide.style.opacity = opacity.toFixed(2);
                slide.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
                const vis = opacity > 0.01 ? 'visible' : 'hidden';
                if (cache.visibility !== vis) {
                    slide.style.visibility = vis;
                    cache.visibility = vis;
                }
                cache.opacity = opacity;
                cache.translateY = translateY;
            }
        });
    }

    render() {
        const img = this.images[this.currentFrameIndex];
        if (!img || !img.complete) return;

        this.updateNarrative();

        const cw = this.canvas.width;
        const ch = this.canvas.height;
        const iw = img.width;
        const ih = img.height;

        const scaleBase = Math.max(cw / iw, ch / ih);
        const rel = this.lerpFrameIndex / (this.frameCount - 1);

        // Remove expensive rotations for mobile completely
        const dynamicScale = this.isMobileDevice ? 1.01 : (1 + (rel * 0.05));
        const rotation = this.isMobileDevice ? 0 : rel * (Math.PI / 40);

        const scale = scaleBase * dynamicScale;
        const drawW = iw * scale;
        const drawH = ih * scale;
        const x = (cw - drawW) / 2;
        const y = (ch - drawH) / 2;

        this.context.clearRect(0, 0, cw, ch);

        if (rotation === 0) {
            this.context.drawImage(img, x, y, drawW, drawH);
        } else {
            this.context.save();
            this.context.translate(cw / 2, ch / 2);
            this.context.rotate(rotation);
            this.context.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            this.context.restore();
        }
    }
}

window.Scrollytelling = Scrollytelling;
