// LOADEDBASES - Baseball Simulator Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Dropdown toggle (click for mobile, hover handled by CSS for desktop)
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.nav-dropdown-btn');
        btn.addEventListener('click', function() {
            const isOpen = dropdown.classList.contains('open');
            dropdowns.forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                dropdown.classList.add('open');
            }
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(d => {
                d.classList.remove('open');
                const btn = d.querySelector('.nav-dropdown-btn');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Navbar scroll effect - subtle border glow on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.97)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.07)';
        }

        lastScroll = scrollY;
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 72;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;

            alert(`Thanks ${name}! We'll be in touch at ${email} soon.`);

            contactForm.reset();
        });
    }

    // Intersection Observer for section animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.08
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Subtle parallax effect on hero
    const heroStats = document.querySelector('.hero-stats');
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                const rate = scrolled * 0.15;
                const opacity = 1 - (scrolled / (window.innerHeight * 0.8));
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = Math.max(0, opacity);
            }
        }, { passive: true });
    }
});
