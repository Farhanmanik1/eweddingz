/* ===================================================
   AKASH & SELINA — Wedding Website
   GSAP Animations & Interactive Logic
   =================================================== */

(function () {
    'use strict';

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Global music state & trigger handles
    let weddingAudio = null;
    let isMusicPlaying = false;
    let playWeddingMusic = null;
    let pauseWeddingMusic = null;

    // =============================================
    // PRELOADER & INVITATION REVEAL
    // =============================================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        const actionBox = document.getElementById('preloader-action');
        const enterBtn  = document.getElementById('preloader-enter-btn');
        let preloaderDismissed = false;

        function dismissPreloader() {
            if (preloaderDismissed) return;
            preloaderDismissed = true;

            // Start music immediately on opening invitation
            if (playWeddingMusic) {
                playWeddingMusic().catch(() => {});
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';
                    initHeroAnimations();
                    initPetals();
                }
            });

            // Hide action box (wax seal & hint)
            tl.to(actionBox, { opacity: 0, scale: 0.8, duration: 0.3 });

            // Open the flap
            tl.to('#envelope-flap-top', { rotationX: 180, duration: 0.6, ease: 'power2.inOut' }, "-=0.1");

            // Put the top flap behind the card so the card can slide out over it
            tl.set('#envelope-flap-top', { zIndex: 1 });

            // Slide the card completely out of the envelope
            tl.to('.envelope-content', { y: -220, duration: 0.7, ease: 'power2.out' }, "-=0.1");

            // Zoom the card massively to transition into the website
            tl.to('.envelope-content', { scale: 10, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, "+=0.2");
            
            // Fade out the entire preloader background simultaneously
            tl.to(preloader, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, "<");
        }

        document.body.style.overflow = 'hidden';

        // Envelope is ready immediately. Wait for user tap to open.

        if (enterBtn) {
            enterBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissPreloader();
            });
        }

        // Tapping or clicking anywhere on the preloader screen opens the invitation
        preloader.addEventListener('click', () => {
            dismissPreloader();
        });
        preloader.addEventListener('touchstart', () => {
            dismissPreloader();
        }, { passive: true });
    }

    // =============================================
    // FLOATING PARTICLES (Gold dust)
    // =============================================
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 45;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.2 - 0.1,
                opacity: Math.random() * 0.4 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005
            };
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function getParticleColor() {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            return isLight ? '196, 133, 122' : '212, 168, 83';
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const rgb = getParticleColor();

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;

                const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${currentOpacity})`;
                ctx.fill();

                // Soft glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${currentOpacity * 0.15})`;
                ctx.fill();

                // Wrap around
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;
            });

            requestAnimationFrame(animate);
        }

        init();
        animate();
        window.addEventListener('resize', resize);
    }

    // =============================================
    // HERO ANIMATIONS
    // =============================================
    function initHeroAnimations() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.hero-top-ornament', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
          .fromTo('#hero-subtitle', { opacity: 0, y: 15, letterSpacing: '10px' }, { opacity: 1, y: 0, letterSpacing: '6px', duration: 0.9 }, '-=0.4')
          .fromTo('.groom-name', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.2 }, '-=0.5')
          .fromTo('.hero-and', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.7')
          .fromTo('.bride-name', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.2 }, '-=0.5')
          .fromTo('#hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
          .fromTo('#hero-date-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.3')
          .fromTo('.badge-line', { width: 0 }, { width: 40, duration: 0.6 }, '-=0.5')
          .fromTo('.hero-bottom-ornament', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
          .fromTo('.hero-scroll-btn', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2');

        // Subtle parallax on hero content
        gsap.to('.hero-stained-glass', {
            y: 100,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to('.hero-content', {
            y: 60,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Cathedral light rays gentle swaying and pulsing
        gsap.utils.toArray('.light-ray').forEach((ray, i) => {
            gsap.to(ray, {
                opacity: 0.16,
                rotation: (i % 2 === 0 ? 1.8 : -1.8),
                transformOrigin: '200px 200px',
                duration: 5.5 + i * 1.8,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        });

        // Cathedral stained glass glow breathing
        gsap.to('.arch-fill', {
            opacity: 0.75,
            duration: 3.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    }

    // =============================================
    // FLOATING ROSE PETALS
    // =============================================
    function initPetals() {
        const container = document.getElementById('petals-container');
        if (!container) return;

        function getPetalColors() {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            return isLight ? [
                'rgba(196, 133, 122, 0.35)',
                'rgba(232, 169, 158, 0.3)',
                'rgba(220, 150, 140, 0.25)',
                'rgba(240, 180, 175, 0.3)',
                'rgba(200, 120, 110, 0.2)'
            ] : [
                'rgba(220, 180, 180, 0.6)',
                'rgba(240, 200, 200, 0.5)',
                'rgba(200, 160, 160, 0.4)',
                'rgba(212, 168, 83, 0.3)',
                'rgba(255, 220, 220, 0.35)'
            ];
        }

        function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const petalColors = getPetalColors();
            const color = petalColors[Math.floor(Math.random() * petalColors.length)];
            petal.style.background = color;
            petal.style.left = Math.random() * 100 + '%';
            petal.style.top = -20 + 'px';
            const size = 6 + Math.random() * 10;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';

            container.appendChild(petal);

            const duration = 6 + Math.random() * 8;
            gsap.to(petal, {
                y: window.innerHeight + 40,
                x: `+=${(Math.random() - 0.5) * 200}`,
                rotation: Math.random() * 720 - 360,
                opacity: 0.7,
                duration: duration,
                ease: 'none',
                onComplete: () => {
                    petal.remove();
                }
            });

            gsap.fromTo(petal,
                { opacity: 0 },
                { opacity: Math.random() * 0.5 + 0.2, duration: 1, ease: 'power1.in' }
            );
        }

        // Create petals periodically
        function petalLoop() {
            createPetal();
            setTimeout(petalLoop, 800 + Math.random() * 1500);
        }
        petalLoop();
    }

    // =============================================
    // TOAST NOTIFICATION SYSTEM
    // =============================================
    function showToast(message, icon) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        icon = icon || '✨';

        const bubble = document.createElement('div');
        bubble.className = 'toast-bubble';
        bubble.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
        container.appendChild(bubble);

        gsap.to(bubble, {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'back.out(1.4)'
        });

        setTimeout(() => {
            gsap.to(bubble, {
                x: 100,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.in',
                onComplete: () => bubble.remove()
            });
        }, 3200);
    }

    // =============================================
    // SCROLL ANIMATIONS (GSAP ScrollTrigger)
    // =============================================
    function initScrollAnimations() {
        // Section headers
        gsap.utils.toArray('[data-animate="section"]').forEach(el => {
            const label = el.querySelector('.section-label');
            const title = el.querySelector('.section-title');
            const ornament = el.querySelector('.section-ornament');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            if (label) tl.fromTo(label, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 });
            if (title) tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
            if (ornament) tl.fromTo(ornament, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6, transformOrigin: 'center' }, '-=0.4');
        });

        // Story verse
        gsap.utils.toArray('[data-animate="verse"]').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1,
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // Monogram divider SVG drawing outward from center
        document.querySelectorAll('.divider-svg').forEach(svg => {
            const lines = svg.querySelectorAll('line');
            const circle = svg.querySelector('circle');
            const text = svg.querySelector('text');

            const monoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: svg,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });

            if (lines.length >= 2) {
                monoTl.fromTo(lines[0], { scaleX: 0, transformOrigin: 'right center' }, { scaleX: 1, duration: 0.8, ease: 'power2.out' })
                      .fromTo(lines[1], { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, '<');
            }
            if (circle) {
                monoTl.fromTo(circle, { scale: 0, opacity: 0, transformOrigin: 'center' }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }, '-=0.4');
            }
            if (text) {
                monoTl.fromTo(text, { opacity: 0, scale: 0.8, transformOrigin: 'center' }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
            }
        });

        // Timeline items
        gsap.utils.toArray('[data-animate="timeline"]').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 40, x: -20 },
                {
                    opacity: 1, y: 0, x: 0, duration: 0.8,
                    delay: i * 0.15,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );

            // Dot pulse
            const dot = el.querySelector('.timeline-dot');
            if (dot) {
                gsap.fromTo(dot,
                    { scale: 0.5, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.6,
                        delay: i * 0.15 + 0.2,
                        ease: 'back.out(1.7)',
                        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
                    }
                );

                // Add ping ripple ring
                const ping = document.createElement('span');
                ping.className = 'timeline-dot-ping';
                dot.appendChild(ping);

                gsap.to(ping, {
                    scale: 2.2,
                    opacity: 0,
                    duration: 1.4,
                    repeat: -1,
                    repeatDelay: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: dot, start: 'top 85%' }
                });
            }
        });

        // Timeline dynamic scroll scrub
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            gsap.fromTo(timelineLine,
                { scaleY: 0, transformOrigin: 'top' },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.story-timeline',
                        start: 'top 75%',
                        end: 'bottom 85%',
                        scrub: 0.5
                    }
                }
            );
        }

        // Ceremony cards
        gsap.utils.toArray('[data-animate="card"]').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.9,
                    delay: i * 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // Wedding Rings Drawing & Interlocking Animation
        const ringsWrap = document.querySelector('[data-animate="rings"]');
        if (ringsWrap) {
            const leftRing = ringsWrap.querySelector('.ring-left');
            const rightRing = ringsWrap.querySelector('.ring-right');
            const sparkles = ringsWrap.querySelectorAll('.ring-sparkle');

            gsap.set([leftRing, rightRing], {
                strokeDasharray: 176,
                strokeDashoffset: 176
            });
            gsap.set(leftRing, { x: -14 });
            gsap.set(rightRing, { x: 14 });

            const ringsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ringsWrap,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            ringsTl.to([leftRing, rightRing], {
                strokeDashoffset: 0,
                duration: 1.6,
                ease: 'power2.inOut'
            })
            .to(leftRing, { x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
            .to(rightRing, { x: 0, duration: 0.9, ease: 'power3.out' }, '<')
            .call(() => ringsWrap.classList.add('animated'))
            .to(sparkles, {
                opacity: 1,
                scale: 1.6,
                stagger: 0.12,
                duration: 0.4,
                ease: 'back.out(2)'
            }, '-=0.4')
            .to(sparkles, {
                scale: 1,
                duration: 0.3,
                stagger: 0.08
            });
        }

        // Countdown boxes
        gsap.utils.toArray('[data-animate="count"]').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, scale: 0.7 },
                {
                    opacity: 1, scale: 1, duration: 0.7,
                    delay: i * 0.12,
                    ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: '#countdown-timer', start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // Verse card
        gsap.utils.toArray('[data-animate="verse-card"]').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // Blessings items reveal
        gsap.utils.toArray('.blessing-item').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 25 },
                {
                    opacity: 1, y: 0, duration: 0.6,
                    delay: i * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el.parentElement, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // Gallery items reveal
        gsap.utils.toArray('.gallery-item').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 15 },
                {
                    opacity: 1, y: 0, duration: 0.6,
                    delay: i * 0.08,
                    ease: 'power2.out',
                    clearProps: 'transform',
                    scrollTrigger: { trigger: el.parentElement, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });

        // RSVP card reveal
        gsap.utils.toArray('[data-animate="rsvp"]').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        });
    }

    // =============================================
    // 3D PERSPECTIVE TILT & MAGNETIC PHYSICS
    // =============================================
    function init3DTiltAndMagnetics() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        // 3D Perspective Tilt on Ceremony & Verse Cards
        const tiltCards = document.querySelectorAll('.ceremony-card, .verse-card');
        tiltCards.forEach(card => {
            const glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotX = -((y - centerY) / centerY) * 6;
                const rotY = ((x - centerX) / centerX) * 6;

                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

                gsap.to(card, {
                    rotateX: rotX,
                    rotateY: rotY,
                    transformPerspective: 900,
                    scale: 1.015,
                    duration: 0.35,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });

        // Magnetic Pull on Buttons
        const magneticBtns = document.querySelectorAll('.calendar-btn, .rsvp-submit, .theme-toggle, .hero-scroll-btn, .back-to-top, .music-toggle, .floating-blessing-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.28,
                    y: y * 0.28,
                    duration: 0.25,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.4)'
                });
            });
        });
    }

    // =============================================
    // BLESSINGS INTERACTIVE (Levitation & Reaction)
    // =============================================
    function initBlessingsInteractive() {
        const items = document.querySelectorAll('.blessing-item');
        items.forEach((item, i) => {
            // Floating levitation wave
            gsap.to(item, {
                y: -6,
                duration: 2.2 + i * 0.3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2
            });

            const icon = item.querySelector('.blessing-icon');
            if (icon) {
                item.addEventListener('mouseenter', () => {
                    gsap.fromTo(icon, 
                        { scale: 1, y: 0 }, 
                        { scale: 1.35, y: -8, duration: 0.35, ease: 'back.out(2.2)' }
                    );
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
                });
            }
        });
    }

    // =============================================
    // GALLERY LIGHTBOX MODAL
    // =============================================
    function initGalleryLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        const closeBtn = document.getElementById('lightbox-close');
        const backdrop = document.getElementById('lightbox-backdrop');
        const titleEl = document.getElementById('lightbox-title');
        const descEl = document.getElementById('lightbox-desc');
        const illustrationEl = document.getElementById('lightbox-illustration');
        if (!lightbox) return;

        function openLightbox(item) {
            const imageSrc = item.dataset.image;
            const title = item.dataset.title || 'Moments of Love';
            const desc = item.dataset.desc || 'Akash & Selina — Bethel Chapel Assembly, 2026';

            titleEl.textContent = title;
            descEl.textContent = desc;
            
            if (imageSrc) {
                illustrationEl.innerHTML = `<img src="${imageSrc}" alt="${title}" style="max-width: 100%; max-height: 50vh; object-fit: contain; border-radius: 8px;">`;
            } else {
                illustrationEl.innerHTML = '';
            }

            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            gsap.fromTo('.lightbox-dialog',
                { scale: 0.8, y: 30, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }
            );
            gsap.fromTo('.lightbox-backdrop',
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
        }

        function closeLightbox() {
            gsap.to('.lightbox-dialog', {
                scale: 0.85,
                y: 20,
                opacity: 0,
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => {
                    lightbox.classList.remove('active');
                    lightbox.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
            gsap.to('.lightbox-backdrop', { opacity: 0, duration: 0.25 });
        }

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => openLightbox(item));
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (backdrop) backdrop.addEventListener('click', closeLightbox);
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // =============================================
    // ADD TO CALENDAR ACTIONS
    // =============================================
    function initCalendarActions() {
        const calBtn = document.getElementById('add-to-calendar');
        const calMenu = document.getElementById('calendar-menu');
        const calGoogle = document.getElementById('cal-google');
        const calIcs = document.getElementById('cal-ics');
        const calCopy = document.getElementById('cal-copy');
        if (!calBtn || !calMenu) return;

        // Toggle calendar dropdown menu
        calBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = calMenu.classList.contains('show');
            if (isOpen) {
                calMenu.classList.remove('show');
                calBtn.classList.remove('menu-open');
                calBtn.setAttribute('aria-expanded', 'false');
            } else {
                calMenu.classList.add('show');
                calBtn.classList.add('menu-open');
                calBtn.setAttribute('aria-expanded', 'true');
                gsap.fromTo('.calendar-menu-item',
                    { opacity: 0, x: -10 },
                    { opacity: 1, x: 0, stagger: 0.08, duration: 0.25, ease: 'power2.out' }
                );
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!calBtn.contains(e.target) && !calMenu.contains(e.target)) {
                calMenu.classList.remove('show');
                calBtn.classList.remove('menu-open');
                calBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Google Calendar URL generator
        if (calGoogle) {
            const googleUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
                '&text=' + encodeURIComponent('Akash & Selina — Holy Matrimony & Wedding Celebration') +
                '&dates=20261202T043000Z/20261202T093000Z' +
                '&details=' + encodeURIComponent('Holy Matrimony Service: Wednesday, 2nd December 2026, 10:00 AM - 3:00 PM at Bethel Chapel, Jatni, Khordha, Odisha (Map: https://maps.app.goo.gl/kcfwS2JydzcUm4aQ7).\\n\\nWedding Reception: Friday, 4th December 2026, 7:00 PM onwards at Reception Venue.\\n\\n"And now these three remain: faith, hope and love. But the greatest of these is love." — 1 Corinthians 13:13') +
                '&location=' + encodeURIComponent('Bethel Chapel, Jatni, Khordha, Odisha');
            calGoogle.href = googleUrl;
            calGoogle.addEventListener('click', () => {
                calMenu.classList.remove('show');
                calBtn.classList.remove('menu-open');
                showToast('Opening Google Calendar...', '📅');
            });
        }

        // Apple / Outlook RFC 5545 .ics generator
        if (calIcs) {
            calIcs.addEventListener('click', () => {
                calMenu.classList.remove('show');
                calBtn.classList.remove('menu-open');

                const icsData = [
                    'BEGIN:VCALENDAR',
                    'VERSION:2.0',
                    'PRODID:-//Akash and Selina Wedding Celebration//EN',
                    'CALSCALE:GREGORIAN',
                    'METHOD:PUBLISH',
                    'BEGIN:VEVENT',
                    'UID:akash-selina-wedding-2026@bethelchapel.in',
                    'DTSTAMP:20261202T000000Z',
                    'DTSTART:20261202T043000Z',
                    'DTEND:20261202T093000Z',
                    'SUMMARY:Akash & Selina — Holy Matrimony & Wedding Celebration',
                    'DESCRIPTION:Holy Matrimony Service: Wednesday, 2nd December 2026, 10:00 AM - 3:00 PM at Bethel Chapel, Jatni, Khordha, Odisha (Map: https://maps.app.goo.gl/kcfwS2JydzcUm4aQ7).\\nWedding Reception: Friday, 4th December 2026, 7:00 PM onwards at Reception Venue.\\n\\n"And now these three remain: faith, hope and love. But the greatest of these is love." — 1 Corinthians 13:13',
                    'LOCATION:Bethel Chapel\\, Jatni\\, Khordha\\, Odisha',
                    'STATUS:CONFIRMED',
                    'END:VEVENT',
                    'END:VCALENDAR'
                ].join('\r\n');

                const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', 'Akash_Selina_Wedding.ics');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                showToast('Wedding calendar invite (.ics) saved!', '📅');
            });
        }

        // Copy Event Details to Clipboard
        if (calCopy) {
            calCopy.addEventListener('click', () => {
                calMenu.classList.remove('show');
                calBtn.classList.remove('menu-open');

                const text = 'Akash & Selina — Holy Matrimony & Wedding Celebration\n\n💍 Holy Matrimony Service:\nWednesday, 2nd December 2026 | 10:00 AM – 3:00 PM\nVenue: Bethel Chapel, Jatni, Khordha, Odisha\nMap: https://maps.app.goo.gl/kcfwS2JydzcUm4aQ7\n\n🥂 Wedding Reception:\nFriday, 4th December 2026 | 7:00 PM Onwards\nVenue: Reception Venue, Khordha / Bhubaneswar, Odisha\n\n"And now these three remain: faith, hope and love. But the greatest of these is love." — 1 Corinthians 13:13';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('Wedding details copied to clipboard!', '📋');
                    });
                } else {
                    showToast('Event details: Dec 2 & Dec 4', '📋');
                }
            });
        }
    }

    // =============================================
    // MUSIC PLAYER — bgsong.mp3
    // =============================================
    function initMusicPlayer() {
        const toggle = document.getElementById('music-toggle');
        const audio  = document.getElementById('wedding-audio') || new Audio('bgsong.mp3');
        weddingAudio = audio;
        if (!toggle) return;

        const offIcon = toggle.querySelector('.music-off');
        const onIcon  = toggle.querySelector('.music-on');

        audio.loop    = true;
        audio.volume  = 0.65;
        audio.preload = 'auto';

        let waveAnim = null;

        function updateUI(playing) {
            isMusicPlaying = playing;
            if (playing) {
                toggle.classList.add('playing');
                if (offIcon) offIcon.style.display = 'none';
                if (onIcon)  onIcon.style.display  = 'block';

                const waves = onIcon ? onIcon.querySelectorAll('path:nth-child(n+4)') : [];
                if (waves.length > 0 && !waveAnim) {
                    waveAnim = gsap.to(waves, {
                        scaleY: 1.35, opacity: 0.95,
                        transformOrigin: '50% 50%',
                        stagger: 0.15, duration: 0.45,
                        yoyo: true, repeat: -1, ease: 'sine.inOut'
                    });
                }
            } else {
                toggle.classList.remove('playing');
                if (offIcon) offIcon.style.display = 'block';
                if (onIcon)  onIcon.style.display  = 'none';
                if (waveAnim) {
                    waveAnim.kill();
                    waveAnim = null;
                }
            }
        }

        playWeddingMusic = function() {
            if (isMusicPlaying) return Promise.resolve(true);
            try {
                if (audio.readyState >= 1) {
                    audio.currentTime = 26;
                }
            } catch (e) {
                console.log("Audio not ready for seeking.");
            }
            const promise = audio.play();
            if (promise !== undefined) {
                return promise.then(() => {
                    updateUI(true);
                    return true;
                }).catch(() => {
                    updateUI(false);
                    return false;
                });
            }
            updateUI(true);
            return Promise.resolve(true);
        };

        pauseWeddingMusic = function() {
            audio.pause();
            updateUI(false);
        };

        function toggleMusic(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            gsap.fromTo(toggle, { rotate: 0 }, { rotate: 360, duration: 0.5, ease: 'back.out(1.4)' });
            if (isMusicPlaying) {
                pauseWeddingMusic();
            } else {
                playWeddingMusic();
            }
        }

        toggle.addEventListener('click', toggleMusic);

        // Attempt playback immediately on load
        playWeddingMusic().catch(() => {});

        // Fallback: any first interaction (touch, click, scroll, wheel, key) starts music if blocked
        const gestureEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown', 'wheel', 'scroll'];
        function onFirstGesture(e) {
            if (isMusicPlaying) {
                gestureEvents.forEach(evt => window.removeEventListener(evt, onFirstGesture, true));
                return;
            }
            if (e.target && (e.target === toggle || toggle.contains(e.target))) {
                return;
            }
            playWeddingMusic().then(success => {
                if (success) {
                    gestureEvents.forEach(evt => window.removeEventListener(evt, onFirstGesture, true));
                }
            });
        }

        gestureEvents.forEach(evt => {
            window.addEventListener(evt, onFirstGesture, { passive: true, capture: true });
        });
    }


    // =============================================
    // FLOATING BLESSINGS SHOWER
    // =============================================
    function initFloatingBlessings() {
        const btn = document.getElementById('floating-blessing-btn');
        if (!btn) return;

        const symbols = ['💖', '💕', '✨', '🕊️', '💍', '🌸', '✝️', '🙏'];

        btn.addEventListener('click', () => {
            gsap.fromTo(btn, 
                { scale: 0.9 }, 
                { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' }
            );

            // Spawn fountain of floating blessings
            for (let i = 0; i < 18; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-heart-particle';
                particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                
                const startX = window.innerWidth - 110 + (Math.random() - 0.5) * 120;
                const startY = window.innerHeight - 60;
                const size = 18 + Math.random() * 18;

                particle.style.cssText = `
                    left: ${startX}px;
                    top: ${startY}px;
                    font-size: ${size}px;
                    opacity: 1;
                `;
                document.body.appendChild(particle);

                const driftX = (Math.random() - 0.5) * 350;
                const travelY = -window.innerHeight * 0.75 - Math.random() * 250;
                const duration = 2.4 + Math.random() * 1.8;

                gsap.to(particle, {
                    x: driftX,
                    y: travelY,
                    rotation: (Math.random() - 0.5) * 180,
                    opacity: 0,
                    scale: 0.6,
                    duration: duration,
                    ease: 'power1.out',
                    onComplete: () => particle.remove()
                });
            }

            showToast('God bless Akash & Selina! 🙏', '💖');
        });
    }

    // =============================================
    // FAIRY DUST MOUSE TRAIL (Desktop)
    // =============================================
    function initMouseTrail() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let lastTime = 0;
        window.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTime < 35) return; // Throttle 35ms
            lastTime = now;

            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const color = isLight ? '#C4857A' : '#D4A853';

            const dust = document.createElement('div');
            dust.className = 'fairy-dust';
            const size = 3 + Math.random() * 4;
            dust.style.cssText = `
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                color: ${color};
                opacity: 0.8;
            `;
            document.body.appendChild(dust);

            gsap.to(dust, {
                x: (Math.random() - 0.5) * 40,
                y: (Math.random() - 0.5) * 40 + 20,
                opacity: 0,
                scale: 0.2,
                duration: 0.8 + Math.random() * 0.4,
                ease: 'power2.out',
                onComplete: () => dust.remove()
            });
        });
    }

    // =============================================
    // COUNTDOWN TIMER
    // =============================================
    function initCountdown() {
        const weddingDate = new Date('December 2, 2026 10:00:00').getTime();
        const circumference = 2 * Math.PI * 54; // ~339.29

        function update() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance <= 0) {
                document.getElementById('days').textContent = '0';
                document.getElementById('hours').textContent = '0';
                document.getElementById('minutes').textContent = '0';
                document.getElementById('seconds').textContent = '0';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(3, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            // Update ring progress
            const rings = document.querySelectorAll('.ring-progress');
            rings.forEach(ring => {
                const unit = ring.dataset.unit;
                let progress = 0;
                switch (unit) {
                    case 'days': progress = Math.min(days / 365, 1); break;
                    case 'hours': progress = hours / 24; break;
                    case 'minutes': progress = minutes / 60; break;
                    case 'seconds': progress = seconds / 60; break;
                }
                const offset = circumference - (progress * circumference);
                ring.style.strokeDashoffset = offset;
            });
        }

        update();
        setInterval(update, 1000);
    }

    // =============================================
    // NAVIGATION
    // =============================================
    function initNavigation() {
        const nav = document.getElementById('main-nav');
        const toggle = document.getElementById('nav-toggle');
        const links = document.getElementById('nav-links');
        const allLinks = links.querySelectorAll('a');

        // Scroll state
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            nav.classList.toggle('scrolled', scrollY > 60);

            // Back to top button
            const btn = document.getElementById('back-to-top');
            if (btn) btn.classList.toggle('visible', scrollY > 500);
        });

        // Mobile menu toggle
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('open');
        });

        // Close on link click
        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                links.classList.remove('open');
            });
        });

        // Back to top
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // =============================================

    // =============================================
    // CONFETTI CELEBRATION
    // =============================================
    function createConfetti() {
        const colors = ['#D4A853', '#F0D48A', '#E8C97A', '#FFE4B5', '#FFF8DC', '#DDA853', '#C4857A', '#E8A99E'];
        const container = document.querySelector('.rsvp-card-inner');
        if (!container) return;

        for (let i = 0; i < 55; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 6}px;
                height: ${3 + Math.random() * 6}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                top: 50%;
                left: 50%;
                pointer-events: none;
                z-index: 10;
            `;
            container.appendChild(confetti);

            gsap.to(confetti, {
                x: (Math.random() - 0.5) * 320,
                y: (Math.random() - 0.5) * 320 - 100,
                rotation: Math.random() * 720,
                opacity: 0,
                duration: 1.5 + Math.random(),
                ease: 'power2.out',
                onComplete: () => confetti.remove()
            });
        }
    }

    // =============================================
    // SMOOTH SCROLL for anchor links
    // =============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 60;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    // =============================================
    // THEME TOGGLE (Dark ↔ Light)
    // =============================================
    function initTheme() {
        const toggle = document.getElementById('theme-toggle');
        const root = document.documentElement;
        if (!toggle) return;

        // Force dark mode on load as default
        const activeTheme = 'dark';
        root.setAttribute('data-theme', activeTheme);
        localStorage.setItem('wedding-theme-v2', activeTheme);

        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';

            // Smooth crossfade via GSAP
            gsap.to('body', {
                opacity: 0.85,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    root.setAttribute('data-theme', next);
                    localStorage.setItem('wedding-theme-v2', next);
                    gsap.to('body', { opacity: 1, duration: 0.35, ease: 'power1.out' });
                }
            });

            // Animate the toggle button
            gsap.fromTo(toggle, { rotate: 0 }, { rotate: 360, duration: 0.6, ease: 'back.out(1.4)' });
        });
    }

    // =============================================
    // INITIALIZATION
    // =============================================
    function init() {
        initTheme();
        initMusicPlayer();
        initParticles();
        initPreloader();
        initCountdown();
        initNavigation();
        initScrollAnimations();
        init3DTiltAndMagnetics();
        initBlessingsInteractive();
        initGalleryLightbox();
        initCalendarActions();
        initFloatingBlessings();
        initMouseTrail();
        initSmoothScroll();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

