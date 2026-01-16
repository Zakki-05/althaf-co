// ===================================
// Myrobalan Website - Enhanced Animations
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for all anchor links (navigation links, buttons, etc.)
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Close mobile menu if open
                    const hamburger = document.getElementById('hamburger');
                    const nav = document.getElementById('nav');
                    if (hamburger && nav) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add staggered animation to children if they exist
                const children = entry.target.querySelectorAll('.benefit-card, .product-card, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Don't interfere with link navigation
            // Just add visual ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlusSign = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (isPercentage ? '%' : '') + (isPlusSign ? '+' : '');
            }, 30);
        }
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Form submission handler with Web3Forms
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Success
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                    this.reset();

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                submitBtn.textContent = '✗ Failed. Try again';
                submitBtn.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Add hover sound effect class (visual feedback)
    const cards = document.querySelectorAll('.product-card, .benefit-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // Smooth header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // Add tilt effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-16px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    console.log('✨ Enhanced animations loaded successfully!');
});
