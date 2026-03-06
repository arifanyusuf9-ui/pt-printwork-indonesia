/**
 * PT Printwork Scrollytelling Animation
 * Handles frame-by-frame canvas animation based on scroll position.
 */

class Scrollytelling {
    constructor(options) {
        this.canvas = document.querySelector(options.canvasSelector);
        this.pixelRatio = Math.min(window.devicePixelRatio, 1.5);
        this.context = this.canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
        this.context.imageSmoothingEnabled = false; // Significant speed boost
        this.framesDir = options.framesDir;
        this.frameCount = options.frameCount;
        this.triggerSelector = options.triggerSelector;
        this.images = [];
        this.currentFrameIndex = 0;
        this.loadedImagesCount = 0;
        this.isActive = false;
        this.isVisible = false;

        this.init();
    }

    async init() {
        this.setupCanvas();
        await this.preloadImages();

        // Query narrative elements once
        this.slides = document.querySelectorAll('.narrative-slide');
        this.triggerElement = document.querySelector(this.triggerSelector);

        this.targetFrameIndex = 0;
        this.lerpFrameIndex = 0;
        this.lerpAmount = 0.06; // Improved smoothing factor for professional feel

        this.setupScrollListener();
        this.setupVisibilityObserver();
        this.startAnimationLoop();

        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.render(); // Immediate render on resize
        });

        // Hide loading screen once scrollytelling images are preloaded
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth * this.pixelRatio;
        this.canvas.height = window.innerHeight * this.pixelRatio;
        this.context.imageSmoothingEnabled = false;
    }

    async preloadImages() {
        console.log('Preloading images from:', this.framesDir);
        const promises = [];

        for (let i = 0; i < this.frameCount; i++) {
            const frameNumber = i + 1;
            const src = `${this.framesDir}/${frameNumber}-ezgif.com-webp-to-jpg-converter.jpg`;

            const img = new Image();
            img.src = src;
            const promise = new Promise((resolve) => {
                img.onload = () => {
                    this.loadedImagesCount++;
                    resolve();
                };
                img.onerror = () => {
                    console.error(`FAILED to load frame: ${src}`);
                    resolve();
                };
            });
            this.images[i] = img;
            promises.push(promise);
        }

        await Promise.all(promises);
        console.log(`Preloading complete: ${this.loadedImagesCount}/${this.frameCount} images successfully loaded.`);
    }

    setupVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.01 });

        observer.observe(document.querySelector(this.triggerSelector));
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

            // If very close to target, trigger one extra render to ensure parity
            if (this.lerpAmount >= 1 || Math.abs(this.targetFrameIndex - this.lerpFrameIndex) < 0.1) {
                this.render();
            }
        }, { passive: true });
    }

    startAnimationLoop() {
        const update = () => {
            if (this.isVisible) {
                // Lerp frame index
                const diff = this.targetFrameIndex - this.lerpFrameIndex;

                if (Math.abs(diff) > 0.001) {
                    this.lerpFrameIndex += diff * this.lerpAmount;
                    this.currentFrameIndex = Math.round(this.lerpFrameIndex);
                    this.render();
                }
            }

            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    render() {
        const img = this.images[this.currentFrameIndex];
        if (!img || !img.complete) return;

        // --- Sync Narrative Text Animations with Lerp ---
        const relScroll = this.lerpFrameIndex / (this.frameCount - 1);

        if (this.slides) {
            this.slides.forEach((slide, index) => {
                let start, end;
                // Define windows to match iertqa.com sequential feel
                if (index === 0) { start = 0; end = 0.20; }
                else if (index === 1) { start = 0.20; end = 0.45; }
                else if (index === 2) { start = 0.45; end = 0.70; }
                else { start = 0.70; end = 1.0; }

                let opacity = 0;
                let translateY = 40; // Enter from bottom

                if (relScroll >= start && relScroll <= end) {
                    const slideProgress = (relScroll - start) / (end - start);

                    if (slideProgress < 0.2) { // Enter phase
                        const p = slideProgress / 0.2;
                        opacity = p;
                        translateY = 40 * (1 - p);
                    } else if (slideProgress < 0.8) { // Stay phase
                        opacity = 1;
                        translateY = 0;
                    } else { // Exit phase: Move Upwards + Fade Out
                        const p = (slideProgress - 0.8) / 0.2;
                        opacity = 1 - p;
                        translateY = -40 * p;
                    }
                } else if (relScroll > end) {
                    opacity = 0;
                    translateY = -40; // Stayed up
                } else {
                    opacity = 0;
                    translateY = 40; // Waiting below
                }

                slide.style.opacity = opacity;
                slide.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
                slide.style.transform = `translate3d(0, ${translateY}px, 0)`;
                slide.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
            });
        }

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const scaleBase = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

        // Add dynamic scale and rotation based on scroll position
        const relativeScroll = this.lerpFrameIndex / (this.frameCount - 1);
        const dynamicScale = 1 + (relativeScroll * 0.08); // Subtle breathe effect
        const rotation = relativeScroll * (Math.PI / 36); // Subtler rotation (5 degrees)

        const scale = scaleBase * dynamicScale;
        const x = (canvasWidth / 2);
        const y = (canvasHeight / 2);

        this.context.clearRect(0, 0, canvasWidth, canvasHeight);

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

// Export for use in other scripts
window.Scrollytelling = Scrollytelling;
