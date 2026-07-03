document.addEventListener('DOMContentLoaded', () => {
    // --- Premium Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if the device is a touch device to disable the custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        document.body.style.cursor = 'default';
        
        // Ensure standard cursor for interactive elements
        const allLinksAndButtons = document.querySelectorAll('a, button, input, textarea');
        allLinksAndButtons.forEach(el => {
            el.style.cursor = 'pointer';
        });
    } else {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (cursorDot) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }
        });

        // Smooth follow effect for outline
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            if (cursorOutline) {
                cursorOutline.style.left = `${cursorX}px`;
                cursorOutline.style.top = `${cursorY}px`;
            }
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Premium Cursor Hover Effects
        const hoverElements = document.querySelectorAll('a, button, .hover-underline, .project-box, .glass-box, .social-btn, .btn-icon, .skill-chip');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorOutline) cursorOutline.classList.add('cursor-hover');
                if (cursorDot) {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorDot.style.background = 'var(--gradient-accent)';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
                if (cursorDot) {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDot.style.background = 'var(--gradient-accent)';
                }
            });
        });
    }

    // --- Enhanced Floating Particles in Hero ---
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 35;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 10 + 5; // Size from 5px to 15px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const duration = Math.random() * 15000 + 10000;
            const delay = Math.random() * 5000;
            
            // Enhanced floating animations
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 0.15 
                },
                { 
                    transform: `translate(${(Math.random() - 0.5) * 150}px, ${(Math.random() - 0.5) * 150}px) scale(1.3)`, 
                    opacity: 0.35 
                },
                { 
                    transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 200}px) scale(0.7)`, 
                    opacity: 0.1 
                },
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 0.15 
                }
            ], {
                duration: duration,
                iterations: Infinity,
                easing: 'ease-in-out',
                delay: delay
            });
            
            particlesContainer.appendChild(particle);
        }
    }

    // --- Enhanced 3D Parallax Shapes Background ---
    const bgShapes = document.querySelectorAll('.bg-3d-scene .shape');
    let parallaxX = 0, parallaxY = 0;

    window.addEventListener('mousemove', (e) => {
        parallaxX = (window.innerWidth / 2 - e.pageX) / 50;
        parallaxY = (window.innerHeight / 2 - e.pageY) / 50;
    });

    function animateParallax() {
        bgShapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed'));
            const currentTransform = shape.style.transform || '';
            shape.style.transform = `translateX(${parallaxX * speed}px) translateY(${parallaxY * speed}px)`;
        });
        requestAnimationFrame(animateParallax);
    }
    animateParallax();

    // --- Premium Vanilla Tilt 3D Effect ---
    const tiltElements = document.querySelectorAll('.js-tilt');
    tiltElements.forEach(el => {
        let tiltX = 0, tiltY = 0;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            tiltX = ((y - centerY) / centerY) * -8;
            tiltY = ((x - centerX) / centerX) * 8;
            
            el.style.transform = `perspective(1500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
            el.style.transition = 'transform 0.1s ease-out';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // --- Premium Typing Effect ---
    const textArray = ["Full Stack Developer.", "PHP Laravel Developer.", "Web Developer.", "Problem Solver."];
    let textIndex = 0; 
    let charIndex = 0;
    const typingSpan = document.querySelector(".typing-text");
    let isTyping = true;

    function type() {
        if (!typingSpan) return;
        if (charIndex < textArray[textIndex].length) {
            typingSpan.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            isTyping = false;
            setTimeout(erase, 2500);
        }
    }

    function erase() {
        if (!typingSpan) return;
        if (charIndex > 0) {
            typingSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % textArray.length;
            isTyping = true;
            setTimeout(type, 600);
        }
    }

    if (typingSpan) setTimeout(type, 1200);

    // --- Mobile Menu Toggle with Animation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate menu items
            if (navLinks.classList.contains('active')) {
                navItems.forEach((item, index) => {
                    item.style.animation = `slideInRight 0.5s ease forwards ${index * 0.1}s`;
                });
            }
        });
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                0% { opacity: 0; transform: translateX(50px); }
                100% { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // --- Premium Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // --- Enhanced Scroll Reveal with Intersection Observer ---
    const revealOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Don't unobserve to allow re-animation if needed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-fade-in, .reveal-slide-up, .reveal-zoom-in');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Submit Handler ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add success animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Add Stagger Animation to Skill Cards ---
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // --- Add Counter Animation to Stats ---
    const statNumbers = document.querySelectorAll('.stat-item h4');
    const animateCounter = (element) => {
        const target = element.textContent;
        const number = parseInt(target);
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
            }
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});
