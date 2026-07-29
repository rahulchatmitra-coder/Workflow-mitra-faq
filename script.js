/**
 * FlowMitra - Interactive Components
 * Following Gumloop design system principles
 * WCAG 2.2 AA compliant with keyboard-first interactions
 */

'use strict';

// ========================================
// Utility Functions
// ========================================

/**
 * Throttle function for performance optimization
 */
function throttle(func, delay) {
    let timeoutId;
    let lastRan;
    return function (...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (Date.now() - lastRan >= delay) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, delay - (Date.now() - lastRan));
        }
    };
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 - offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// Navigation Functionality
// ========================================

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinksItems = this.navLinks?.querySelectorAll('a');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        if (!this.navbar) return;

        // Handle scroll effects
        this.handleScroll();
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));

        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
            
            // Keyboard support for mobile menu
            this.mobileMenuToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileMenu();
                }
            });
        }

        // Close mobile menu on link click
        if (this.navLinksItems) {
            this.navLinksItems.forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks?.classList.contains('active')) {
                this.closeMobileMenu();
                this.mobileMenuToggle?.focus();
            }
        });

        // Smooth scroll for anchor links
        this.setupSmoothScroll();
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        // Add shadow when scrolled
        if (currentScrollY > 10) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.lastScrollY = currentScrollY;
    }

    toggleMobileMenu() {
        const isExpanded = this.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        
        this.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        this.navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        // Focus management
        if (!isExpanded) {
            // Focus first link when opening
            setTimeout(() => {
                this.navLinksItems?.[0]?.focus();
            }, 300);
        }
    }

    closeMobileMenu() {
        this.mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        this.navLinks?.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#' || href === '#start' || href === '#demo' || 
                    href === '#signin' || href === '#contact') {
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = this.navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Focus target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    
                    // Update URL without jumping
                    history.pushState(null, '', href);
                }
            });
        });
    }
}

// ========================================
// Scroll Animations
// ========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.feature-card, .testimonial-card, .stat');
        this.animated = new WeakSet();
        
        this.init();
    }

    init() {
        if (!this.elements.length) return;

        // Initial check
        this.checkElements();

        // Check on scroll
        window.addEventListener('scroll', throttle(() => this.checkElements(), 200));
        
        // Check on resize
        window.addEventListener('resize', debounce(() => this.checkElements(), 300));
    }

    checkElements() {
        this.elements.forEach((element, index) => {
            if (this.animated.has(element)) return;

            if (isInViewport(element, 100)) {
                // Stagger animation delay
                setTimeout(() => {
                    element.classList.add('animate-fade-in');
                    this.animated.add(element);
                }, index * 50);
            }
        });
    }
}

// ========================================
// Button Interactions
// ========================================

class ButtonInteractions {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        if (!this.buttons.length) return;

        this.buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', (e) => this.createRipple(e, button));
            
            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.createRipple(e, button);
                    button.click();
                }
            });
        });
    }

    createRipple(event, button) {
        // Don't add ripple if button is disabled
        if (button.disabled) return;

        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripples
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// ========================================
// Card Hover Effects
// ========================================

class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card, .testimonial-card');
        this.init();
    }

    init() {
        if (!this.cards.length) return;

        this.cards.forEach(card => {
            // Add subtle 3D tilt effect on mouse move
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            
            // Keyboard focus effects
            card.addEventListener('focus', () => this.handleFocus(card), true);
            card.addEventListener('blur', () => this.handleBlur(card), true);
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }

    handleMouseLeave(card) {
        card.style.transform = '';
    }

    handleFocus(card) {
        card.style.transform = 'translateY(-2px)';
    }

    handleBlur(card) {
        card.style.transform = '';
    }
}

// ========================================
// Performance Monitoring
// ========================================

class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        if ('PerformanceObserver' in window) {
            this.observeLargestContentfulPaint();
            this.observeFirstInputDelay();
        }

        // Log performance metrics on load
        window.addEventListener('load', () => {
            setTimeout(() => this.logPerformanceMetrics(), 0);
        });
    }

    observeLargestContentfulPaint() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    observeFirstInputDelay() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
    }

    logPerformanceMetrics() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('Performance Metrics:');
        console.log('Page Load Time:', pageLoadTime, 'ms');
        console.log('Connect Time:', connectTime, 'ms');
        console.log('Render Time:', renderTime, 'ms');
    }
}

// ========================================
// Accessibility Enhancements
// ========================================

class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Announce page changes for screen readers
        this.setupAriaLiveRegion();
        
        // Handle focus trap in modals (if any)
        this.setupFocusManagement();
        
        // Skip link functionality
        this.setupSkipLinks();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupAriaLiveRegion() {
        // Create live region for dynamic content announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }

    announce(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    setupFocusManagement() {
        // Store the last focused element before opening any modal
        this.lastFocusedElement = null;
        
        document.addEventListener('focusin', (e) => {
            if (!e.target.closest('[role="dialog"]')) {
                this.lastFocusedElement = e.target;
            }
        });
    }

    setupSkipLinks() {
        const skipLinks = document.querySelectorAll('.skip-link');
        
        skipLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + H: Focus on header/home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                document.querySelector('.logo')?.focus();
                this.announce('Navigated to header');
            }
            
            // Alt + M: Focus on main content
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                document.getElementById('main-content')?.focus();
                this.announce('Navigated to main content');
            }
            
            // Alt + F: Focus on footer
            if (e.altKey && e.key === 'f') {
                e.preventDefault();
                document.querySelector('.footer')?.focus();
                this.announce('Navigated to footer');
            }
        });
    }
}

// ========================================
// Form Validation (if forms are added later)
// ========================================

class FormValidation {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        if (!this.forms.length) return;

        this.forms.forEach(form => {
            form.setAttribute('novalidate', 'true');
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', debounce(() => this.validateField(input), 500));
            });
        });
    }

    handleSubmit(e, form) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Form is valid, proceed with submission
            console.log('Form is valid, submitting...');
            // Add your form submission logic here
        } else {
            // Focus first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            firstInvalid?.focus();
        }
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearError(input);

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Update field state
        if (!isValid) {
            this.showError(input, errorMessage);
        }

        return isValid;
    }

    showError(input, message) {
        input.setAttribute('aria-invalid', 'true');
        
        const errorId = `${input.id || input.name}-error`;
        let errorElement = document.getElementById(errorId);
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.id = errorId;
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #dc2626; font-size: 12px; margin-top: 4px; display: block;';
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.setAttribute('aria-describedby', errorId);
    }

    clearError(input) {
        input.setAttribute('aria-invalid', 'false');
        const errorId = `${input.id || input.name}-error`;
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.removeAttribute('aria-describedby');
    }
}

// ========================================
// Dark Mode Support (Optional Enhancement)
// ========================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggle() {
        this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }
}

// ========================================
// Initialize All Components
// ========================================

class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        console.log('Initializing FlowMitra...');

        try {
            // Initialize all components
            new Navigation();
            new ScrollAnimations();
            new ButtonInteractions();
            new CardEffects();
            new AccessibilityEnhancements();
            new FormValidation();
            new ThemeManager();
            
            // Performance monitoring (only in development)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                new PerformanceMonitor();
            }

            console.log('FlowMitra initialized successfully');
        } catch (error) {
            console.error('Error initializing FlowMitra:', error);
        }
    }
}

// Start the application
const app = new App();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}
