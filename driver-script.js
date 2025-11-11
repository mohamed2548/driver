// Global variables
let currentLanguage = 'en';
let isDarkMode = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    setMinDate();
    initializeScrollAnimations();
    hideLoader();
});

// Hide loader after page loads
function hideLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        // Wait a bit to show the animation
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 3000); // Show loader for 3 seconds
    }
}

// Show loader when navigating
window.addEventListener('beforeunload', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.remove('hidden');
    }
});

// Initialize website
function initializeWebsite() {
    // Set initial language
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLanguage === 'ar') {
        toggleLanguage();
    }
    
    // Set initial dark mode
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    if (savedTheme === 'dark') {
        toggleDarkMode();
    }
    
    // Add smooth scrolling to navigation links
    addSmoothScrolling();
}

// Language toggle functionality
function toggleLanguage() {
    const html = document.documentElement;
    const langToggle = document.querySelector('.lang-text');
    
    if (currentLanguage === 'en') {
        currentLanguage = 'ar';
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        langToggle.textContent = 'English';
        updateContent('ar');
    } else {
        currentLanguage = 'en';
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langToggle.textContent = 'العربية';
        updateContent('en');
    }
    
    // Save language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Dark Mode toggle functionality
function toggleDarkMode() {
    const html = document.documentElement;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const darkModeText = document.querySelector('.dark-mode-text');
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    if (!isDarkMode) {
        isDarkMode = true;
        html.setAttribute('data-theme', 'dark');
        darkModeToggle.classList.add('active');
        darkModeIcon.className = 'fas fa-sun';
        
        // Update text based on current language
        if (currentLanguage === 'en') {
            darkModeText.textContent = 'Light';
        } else {
            darkModeText.textContent = 'نهاري';
        }
    } else {
        isDarkMode = false;
        html.removeAttribute('data-theme');
        darkModeToggle.classList.remove('active');
        darkModeIcon.className = 'fas fa-moon';
        
        // Update text based on current language
        if (currentLanguage === 'en') {
            darkModeText.textContent = 'Dark';
        } else {
            darkModeText.textContent = 'ليلي';
        }
    }
    
    // Save theme preference
    localStorage.setItem('preferredTheme', isDarkMode ? 'dark' : 'light');
}

// Update content based on language
function updateContent(language) {
    const elements = document.querySelectorAll('[data-en][data-ar]');
    
    elements.forEach(element => {
        const content = element.getAttribute(`data-${language}`);
        if (content) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = content;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = content;
            } else {
                element.textContent = content;
            }
        }
    });
    
    // Update select options
    const selectOptions = document.querySelectorAll('option[data-en][data-ar]');
    selectOptions.forEach(option => {
        const content = option.getAttribute(`data-${language}`);
        if (content) {
            option.textContent = content;
        }
    });
    
    // Update dark mode button text based on current state and language
    const darkModeText = document.querySelector('.dark-mode-text');
    if (darkModeText) {
        if (isDarkMode) {
            darkModeText.textContent = language === 'en' ? 'Light' : 'نهاري';
        } else {
            darkModeText.textContent = language === 'en' ? 'Dark' : 'ليلي';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Driver card hover effects
    const driverCards = document.querySelectorAll('.driver-card');
    driverCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });
    
    // Contact method interactions
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', handleContactClick);
    });
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const inputs = event.target.querySelectorAll('input, select, textarea');
    const bookingData = {
        fullName: inputs[0].value,
        phoneNumber: inputs[1].value,
        preferredDriver: inputs[2].value,
        tripDate: inputs[3].value,
        tripTime: inputs[4].value,
        additionalNotes: inputs[5].value
    };
    
    // Validate form data
    if (!bookingData.fullName || !bookingData.phoneNumber || !bookingData.preferredDriver || !bookingData.tripDate || !bookingData.tripTime) {
        showNotification(
            currentLanguage === 'en' ? 'Please fill in all required fields.' : 'يرجى ملء جميع الحقول المطلوبة.',
            'error'
        );
        return;
    }
    
    // Simulate booking process
    showNotification(
        currentLanguage === 'en' ? 'Processing your booking...' : 'جاري معالجة حجزك...',
        'info'
    );
    
    setTimeout(() => {
        showNotification(
            currentLanguage === 'en' 
                ? 'Booking request submitted successfully! We will contact you shortly.' 
                : 'تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.',
            'success'
        );
        event.target.reset();
    }, 2000);
}

// Handle driver card hover
function handleCardHover(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.boxShadow = '0 12px 40px rgba(52, 152, 219, 0.3)';
}

// Handle driver card leave
function handleCardLeave(event) {
    const card = event.currentTarget;
    card.style.transform = '';
    card.style.boxShadow = '';
}

// Handle contact method click
function handleContactClick(event) {
    const method = event.currentTarget;
    const icon = method.querySelector('i');
    const contactInfo = method.querySelector('p').textContent;
    
    if (icon.classList.contains('fa-phone')) {
        window.open(`tel:${contactInfo}`, '_self');
    } else if (icon.classList.contains('fa-envelope')) {
        window.open(`mailto:${contactInfo}`, '_self');
    } else if (icon.classList.contains('fa-whatsapp')) {
        window.open(`https://wa.me/${contactInfo.replace(/\s+/g, '')}`, '_blank');
    }
}

// Add smooth scrolling to navigation links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${getNotificationStyles(type)}
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Get notification styles
function getNotificationStyles(type) {
    const styles = {
        success: 'background: #27ae60; color: white;',
        error: 'background: #e74c3c; color: white;',
        warning: 'background: #f39c12; color: white;',
        info: 'background: #3498db; color: white;'
    };
    return styles[type] || styles.info;
}

// Set minimum date for trip booking
function setMinDate() {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

// Rating stars interaction
function initializeRatingStars() {
    const ratingElements = document.querySelectorAll('.rating');
    
    ratingElements.forEach(rating => {
        const stars = rating.querySelector('.stars');
        if (stars) {
            stars.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.textShadow = '0 0 10px rgba(243, 156, 18, 0.8)';
            });
            
            stars.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.textShadow = '';
            });
        }
    });
}

// Initialize rating stars when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeRatingStars);

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key to close notifications
    if (event.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Enter key on language toggle
    if (event.key === 'Enter' && event.target.classList.contains('lang-toggle')) {
        toggleLanguage();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 152, 219, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Add CSS for additional styles
const style = document.createElement('style');
style.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        margin-left: auto;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Top Picks Section Smooth Scroll
function scrollToTopPicks() {
    const topPicksSection = document.getElementById('comparison');
    topPicksSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Open Driver Profile Function
function openDriverProfile(profileUrl) {
    try {
        window.location.href = profileUrl;
    } catch (error) {
        console.error('Error opening driver profile:', error);
        // Fallback method
        window.open(profileUrl, '_self');
    }
}

// Dropdown Menu Toggle Function
function toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const dropdown = event.target.closest('.dropdown');
    const isActive = dropdown.classList.contains('active');
    
    // Close all other dropdowns
    document.querySelectorAll('.dropdown.active').forEach(d => {
        d.classList.remove('active');
    });
    
    // Toggle current dropdown
    if (!isActive) {
        dropdown.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        // Also close modals on escape
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Close dropdown if open
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Toggle Password Visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.parentElement.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Switch to Sign Up Modal
function switchToSignup() {
    closeModal('signinModal');
    openModal('signupModal');
}

// Switch to Sign In Modal
function switchToSignin() {
    closeModal('signupModal');
    openModal('signinModal');
}

// Handle Sign In Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Basic validation
            if (!email || !password) {
                showNotification(
                    currentLanguage === 'en' ? 'Please fill in all fields.' : 'يرجى ملء جميع الحقول.',
                    'error'
                );
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification(
                    currentLanguage === 'en' ? 'Please enter a valid email address.' : 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
                    'error'
                );
                return;
            }
            
            // Show loading state
            const submitBtn = signinForm.querySelector('.signin-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>' + 
                (currentLanguage === 'en' ? 'Signing In...' : 'جاري تسجيل الدخول...') + '</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification(
                    currentLanguage === 'en' ? 'Sign in successful! Welcome back.' : 'تم تسجيل الدخول بنجاح! مرحباً بعودتك.',
                    'success'
                );
                
                // Close modal
                closeModal('signinModal');
                
                // Clear form
                signinForm.reset();
                
            }, 2000);
        });
    }
});

// Add click event listeners for Top Picks links
document.addEventListener('DOMContentLoaded', function() {
    const topPicksLinks = document.querySelectorAll('a[href="#comparison"]');
    topPicksLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTopPicks();
        });
    });
});

// Handle Sign Up Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const firstName = document.getElementById('signupFirstName').value.trim();
            const lastName = document.getElementById('signupLastName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const phone = document.getElementById('signupPhone').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const city = document.getElementById('signupCity').value;
            const gender = document.getElementById('signupGender').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const subscribeNewsletter = document.getElementById('subscribeNewsletter').checked;
            
            // Basic validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !city || !gender) {
                showNotification(
                    currentLanguage === 'en' ? 'Please fill in all required fields.' : 'يرجى ملء جميع الحقول المطلوبة.',
                    'error'
                );
                return;
            }
            
            // Name validation (only letters and spaces)
            const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
            if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
                showNotification(
                    currentLanguage === 'en' ? 'Names should contain only letters and spaces.' : 'الأسماء يجب أن تحتوي على حروف ومسافات فقط.',
                    'error'
                );
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification(
                    currentLanguage === 'en' ? 'Please enter a valid email address.' : 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
                    'error'
                );
                return;
            }
            
            // Phone validation (Egyptian phone numbers)
            const phoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showNotification(
                    currentLanguage === 'en' ? 'Please enter a valid Egyptian phone number.' : 'يرجى إدخال رقم هاتف مصري صحيح.',
                    'error'
                );
                return;
            }
            
            // Password validation
            if (password.length < 8) {
                showNotification(
                    currentLanguage === 'en' ? 'Password must be at least 8 characters long.' : 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.',
                    'error'
                );
                return;
            }
            
            // Password confirmation
            if (password !== confirmPassword) {
                showNotification(
                    currentLanguage === 'en' ? 'Passwords do not match.' : 'كلمات المرور غير متطابقة.',
                    'error'
                );
                return;
            }
            
            // Terms agreement
            if (!agreeTerms) {
                showNotification(
                    currentLanguage === 'en' ? 'You must agree to the Terms of Service and Privacy Policy.' : 'يجب الموافقة على شروط الخدمة وسياسة الخصوصية.',
                    'error'
                );
                return;
            }
            
            // Show loading state
            const submitBtn = signupForm.querySelector('.signup-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>' + 
                (currentLanguage === 'en' ? 'Creating Account...' : 'جاري إنشاء الحساب...') + '</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification(
                    currentLanguage === 'en' ? 
                        `Welcome ${firstName}! Your account has been created successfully.` : 
                        `مرحباً ${firstName}! تم إنشاء حسابك بنجاح.`,
                    'success'
                );
                
                // Close modal
                closeModal('signupModal');
                
                // Clear form
                signupForm.reset();
                
                // Optional: Show additional welcome message
                setTimeout(() => {
                    showNotification(
                        currentLanguage === 'en' ? 
                            'You can now sign in with your new account!' : 
                            'يمكنك الآن تسجيل الدخول بحسابك الجديد!',
                        'info'
                    );
                }, 2000);
                
            }, 2500);
        });
    }
});

// Scroll Animation Functions
function initializeScrollAnimations() {
    // Add animation classes to elements
    addAnimationClasses();
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in, .ranking-card-slide');
    animatedElements.forEach(el => observer.observe(el));
}

function addAnimationClasses() {
    // Header elements
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButton = document.querySelector('.hero .cta-button');
    
    if (heroTitle) heroTitle.classList.add('fade-in-up');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in-up', 'animate-delay-1');
    if (heroButton) heroButton.classList.add('fade-in-up', 'animate-delay-2');

    // Navigation items
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Driver cards (regular section)
    const driverCards = document.querySelectorAll('.driver-card');
    driverCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('fade-in-left', `animate-delay-${Math.min(index + 1, 6)}`);
        } else {
            card.classList.add('fade-in-right', `animate-delay-${Math.min(index + 1, 6)}`);
        }
    });

    // Ranking cards (special animation - content visible, card slides in)
    const rankingItems = document.querySelectorAll('.ranking-item');
    rankingItems.forEach((item, index) => {
        item.classList.add('ranking-card-slide', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Section titles
    const sectionTitles = document.querySelectorAll('h2, .section-title');
    sectionTitles.forEach(title => {
        title.classList.add('fade-in-up');
    });

    // Comparison table
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        comparisonTable.classList.add('scale-in');
    }

    // Table rows
    const tableRows = document.querySelectorAll('.comparison-table tr');
    tableRows.forEach((row, index) => {
        row.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.classList.add('scale-in', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('fade-in-up');
    }

    // Form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Stats or features
    const statItems = document.querySelectorAll('.stat-item, .feature-item');
    statItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // About section content
    const aboutContent = document.querySelectorAll('.about-content p, .about-content ul');
    aboutContent.forEach((content, index) => {
        content.classList.add('fade-in-left', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Footer elements
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Additional elements
    const additionalElements = document.querySelectorAll('.service-card, .feature-card, .info-card');
    additionalElements.forEach((element, index) => {
        if (index % 3 === 0) {
            element.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
        } else if (index % 3 === 1) {
            element.classList.add('fade-in-left', `animate-delay-${Math.min(index + 1, 6)}`);
        } else {
            element.classList.add('fade-in-right', `animate-delay-${Math.min(index + 1, 6)}`);
        }
    });

    // Images
    const images = document.querySelectorAll('img:not(.logo):not(.avatar)');
    images.forEach((img, index) => {
        img.classList.add('scale-in', `animate-delay-${Math.min(index + 1, 6)}`);
    });

    // Buttons
    const buttons = document.querySelectorAll('.btn:not(.hero .cta-button), button:not(.hero button)');
    buttons.forEach((button, index) => {
        button.classList.add('fade-in-up', `animate-delay-${Math.min(index + 1, 6)}`);
    });
}
