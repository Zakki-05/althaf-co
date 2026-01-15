// ===================================
// Google Analytics 4 Integration
// Privacy-Focused Analytics Setup
// ===================================

// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Initialize Google Analytics 4
(function () {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configure Analytics
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true, // Privacy: Anonymize IP addresses
        'cookie_flags': 'SameSite=None;Secure', // Cookie security
        'send_page_view': true
    });

    console.log('📊 Google Analytics 4 initialized');
})();

// ===================================
// Custom Event Tracking
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // Track WhatsApp button clicks
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.closest('.product-card')?.querySelector('.product-title')?.textContent || 'Unknown Product';

            if (window.gtag) {
                gtag('event', 'whatsapp_inquiry', {
                    'event_category': 'engagement',
                    'event_label': productName,
                    'value': 1
                });
            }
            console.log('📱 WhatsApp inquiry tracked:', productName);
        });
    });

    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            if (window.gtag) {
                gtag('event', 'form_submission', {
                    'event_category': 'engagement',
                    'event_label': 'Contact Form',
                    'value': 1
                });
            }
            console.log('📧 Form submission tracked');
        });
    }

    // Track scroll depth
    let scrollDepthTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', function () {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

        Object.keys(scrollDepthTracked).forEach(depth => {
            if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
                scrollDepthTracked[depth] = true;

                if (window.gtag) {
                    gtag('event', 'scroll_depth', {
                        'event_category': 'engagement',
                        'event_label': `${depth}%`,
                        'value': parseInt(depth)
                    });
                }
                console.log(`📜 Scroll depth tracked: ${depth}%`);
            }
        });
    });

    // Track navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const sectionName = this.textContent.trim();

            if (window.gtag) {
                gtag('event', 'navigation_click', {
                    'event_category': 'navigation',
                    'event_label': sectionName,
                    'value': 1
                });
            }
        });
    });

    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function () {
            const url = this.href;

            if (window.gtag) {
                gtag('event', 'external_link_click', {
                    'event_category': 'outbound',
                    'event_label': url,
                    'value': 1
                });
            }
        });
    });

    console.log('✅ Analytics event tracking initialized');
});
