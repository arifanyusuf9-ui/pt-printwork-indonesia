/**
 * PT Printwork Scrollytelling Animation
 * v2.5 Performance Overhaul - Zero Lag Optimization
 */

class Scrollytelling {
    constructor(options) {
        this.canvas = document.querySelector(options.canvasSelector);
        this.isMobileDevice = window.innerWidth <= 768;

        // Optimized for performance: 0.9 on desktop gives a big boost with minimal quality loss
        this.pixelRatio = this.isMobileDevice ? 0.75 : 0.9;

        this.context = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true, // Low latency mode
        });

        this.context.imageSmoothingEnabled = true; // Enabled for better quality scaling
        this.framesDir = options.framesDir;
        this.frameCount = options.frameCount;
        this.triggerSelector = options.triggerSelector;
        this.images = [];
        this.currentFrameIndex = -1;
        this.loadedImagesCount = 0;
        this.isVisible = false;

        this.targetFrameIndex = 0;
        this.lerpFrameIndex = 0;
        // Slower lerp for a more "cinematic" and controlled feel
        this.lerpAmount = this.isMobileDevice ? 0.15 : 0.08;

        // Performance cache
        this.lastRenderedFrame = -1;
        this.cachedLayout = { w: 0, h: 0, scale: 1, x: 0, y: 0 };

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
            this.isMobileDevice = window.innerWidth <= 768;
            this.pixelRatio = this.isMobileDevice ? 0.75 : 0.9;
            this.setupCanvas();
        }, { passive: true });

        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }

    setupCanvas() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.canvas.width = Math.floor(w * this.pixelRatio);
        this.canvas.height = Math.floor(h * this.pixelRatio);
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.context.imageSmoothingEnabled = true;

        // Reset layout cache
        this.cachedLayout.w = 0;
    }

    async preloadImages() {
        const promises = [];
        // CRITICAL: Load only every 3rd frame on mobile to save 66% memory
        const step = this.isMobileDevice ? 3 : 1;

        for (let i = 0; i < this.frameCount; i += step) {
            let src;
            if (this.framesDir === 'animation' || this.framesDir === 'animation-compressed') {
                src = `${this.framesDir}/ezgif.com-webp-to-jpg-converter (3)-${i + 1}.jpg`;
            } else {
                const frameNum = String(i).padStart(3, '0');
                src = `${this.framesDir}/frame_${frameNum}_delay-0.02s.jpg`;
            }
            const img = new Image();
            img.src = src;
            promises.push(new Promise((resolve) => {
                img.onload = () => {
                    // Pre-decode for butter smooth GPU texture upload
                    if (img.decode) {
                        img.decode().then(() => {
                            this.loadedImagesCount++;
                            resolve();
                        }).catch(() => resolve());
                    } else {
                        this.loadedImagesCount++;
                        resolve();
                    }
                };
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

        // Cache positions to avoid getBoundingClientRect reflows
        let triggerTop = 0;
        let triggerHeight = 0;

        const updatePositions = () => {
            const rect = this.triggerElement.getBoundingClientRect();
            triggerTop = rect.top + window.pageYOffset;
            triggerHeight = rect.height;
        };

        updatePositions();

        window.addEventListener('scroll', () => {
            if (!this.isVisible) return;
            const scrollDistance = window.pageYOffset - triggerTop;
            const scrollHeight = triggerHeight - window.innerHeight;
            const relativeScroll = Math.max(0, Math.min(1, scrollDistance / scrollHeight));
            this.targetFrameIndex = relativeScroll * (this.frameCount - 1);
        }, { passive: true });
    }

    startAnimationLoop() {
        let isLooping = false;

        const update = () => {
            if (!this.isVisible) {
                isLooping = false;
                return;
            }

            const diff = this.targetFrameIndex - this.lerpFrameIndex;
            // Stop loop if diff is tiny to save CPU
            if (Math.abs(diff) > 0.001) {
                this.lerpFrameIndex += diff * this.lerpAmount;
                const frameToRender = Math.round(this.lerpFrameIndex);

                // Mobile frame skipping
                const finalFrame = (this.isMobileDevice)
                    ? Math.floor(frameToRender / 3) * 3
                    : frameToRender;

                if (finalFrame !== this.currentFrameIndex) {
                    this.currentFrameIndex = finalFrame;
                    this.render();
                } else {
                    this.updateNarrative();
                }
                requestAnimationFrame(update);
            } else {
                isLooping = false;
                this.lerpFrameIndex = this.targetFrameIndex;
                this.render();
            }
        };

        // Trigger loop on scroll
        window.addEventListener('scroll', () => {
            if (this.isVisible && !isLooping) {
                isLooping = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        // Initial render
        requestAnimationFrame(update);
    }

    updateNarrative() {
        const relScroll = this.lerpFrameIndex / (this.frameCount - 1);
        if (!this.slides) return;

        // Skip calculations for all slides if nothing changed significantly
        this.slides.forEach((slide, index) => {
            let start, end;
            if (index === 0) { start = 0; end = 0.20; }
            else if (index === 1) { start = 0.20; end = 0.45; }
            else if (index === 2) { start = 0.45; end = 0.70; }
            else { start = 0.70; end = 1.0; }

            let opacity = 0;
            let translateY = 20;

            // Early exit for slides far from active range
            if (relScroll >= start - 0.1 && relScroll <= end + 0.1) {
                if (relScroll >= start && relScroll <= end) {
                    const slideProgress = (relScroll - start) / (end - start);
                    if (slideProgress < 0.2) {
                        opacity = slideProgress / 0.2;
                        translateY = 20 * (1 - opacity);
                    } else if (slideProgress < 0.8) {
                        opacity = 1;
                        translateY = 0;
                    } else {
                        const p = (slideProgress - 0.8) / 0.2;
                        opacity = 1 - p;
                        translateY = -20 * p;
                    }
                } else if (relScroll > end) {
                    opacity = 0; translateY = -20;
                } else {
                    opacity = 0; translateY = 20;
                }
            } else {
                opacity = 0;
                translateY = relScroll > end ? -20 : 20;
            }

            const cache = this.slideCache[index];
            // Higher tolerances for smoother performance
            if (Math.abs(cache.opacity - opacity) > 0.05 || Math.abs(cache.translateY - translateY) > 1.0) {
                slide.style.opacity = opacity.toFixed(2);
                slide.style.transform = `translate3d(0, ${translateY.toFixed(0)}px, 0)`;
                const vis = opacity > 0.01 ? 'visible' : 'hidden';
                if (cache.visibility !== vis) {
                    slide.style.visibility = vis;
                    cache.visibility = vis;
                    slide.classList.toggle('active', opacity > 0.01);
                }
                cache.opacity = opacity;
                cache.translateY = translateY;
            }
        });
    }

    render() {
        const img = this.images[this.currentFrameIndex];
        if (!img || !img.complete) return;

        const cw = this.canvas.width;
        const ch = this.canvas.height;

        // Cache scaling calculations
        if (this.cachedLayout.w !== cw || this.cachedLayout.h !== ch) {
            const scale = Math.max(cw / img.width, ch / img.height);
            this.cachedLayout.w = cw;
            this.cachedLayout.h = ch;
            this.cachedLayout.scale = scale;
            this.cachedLayout.drawW = img.width * scale;
            this.cachedLayout.drawH = img.height * scale;
            this.cachedLayout.x = (cw - this.cachedLayout.drawW) / 2;
            this.cachedLayout.y = (ch - this.cachedLayout.drawH) / 2;
        }

        this.context.drawImage(img, this.cachedLayout.x, this.cachedLayout.y, this.cachedLayout.drawW, this.cachedLayout.drawH);
    }
}

window.Scrollytelling = Scrollytelling;
