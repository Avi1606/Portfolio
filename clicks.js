// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// // Form submission
// document.querySelector('form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Thank you for your message! I will get back to you soon.');
//     this.reset();
// });

// Form submission with Firebase and custom popup
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date();

    // Form validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (!name || !email || !message) {
        showErrorPopup('Please fill in all fields');
        return;
    }
    if (!isValidEmail(email)) {
        showErrorPopup('Please enter a valid email address');
        return;
    }

    // Disable submit button and show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split mr-2"></i> Sending...';
    submitBtn.classList.add('btn-loading');

    // Add a new document to collection "contacts"
    db.collection("contacts").add({
        name: name,
        email: email,
        message: message,
        timestamp: timestamp
    })
    .then(() => {
        // Success
        this.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.remove('btn-loading');
        
        // Show success popup
        showSuccessPopup();
    })
    .catch((error) => {
        // Error
        console.error("Error adding document: ", error);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.remove('btn-loading');
        
        // Show error popup
        showErrorPopup('Sorry, there was an error sending your message. Please try again later.');
    });
});

// Function to show success popup
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.remove('hidden');
    
    // Add animation classes
    const popupContent = popup.querySelector('div.bg-white');
    popupContent.classList.add('animate-fadeInUp');
    
    // Setup close button
    document.getElementById('closePopupBtn').addEventListener('click', () => {
        popup.classList.add('hidden');
    });
    
    // Close when clicking outside
    popup.querySelector('.absolute').addEventListener('click', () => {
        popup.classList.add('hidden');
    });
}

// Function to show error popup
function showErrorPopup(message) {
    const popup = document.getElementById('errorPopup');
    const messageElement = document.getElementById('errorMessage');
    messageElement.textContent = message;
    
    popup.classList.remove('hidden');
    
    // Add animation classes
    const popupContent = popup.querySelector('div.bg-white');
    popupContent.classList.add('animate-fadeInUp');
    
    // Setup close button
    document.getElementById('closeErrorBtn').addEventListener('click', () => {
        popup.classList.add('hidden');
    });
    
    // Close when clicking outside
    popup.querySelector('.absolute').addEventListener('click', () => {
        popup.classList.add('hidden');
    });
}

// Scroll reveal animation
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Update last modified date and time
function updateLastModified() {
    const lastUpdated = "2025-03-22 14:24:04";
    const lastUpdatedElements = document.querySelectorAll('.last-updated');
    lastUpdatedElements.forEach(el => {
        el.textContent = lastUpdated;
    });
}

// Theme toggling functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Set dark theme as default regardless of previous settings
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Make sure icon matches the dark theme
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-fill');
    
    // Apply the initial styling to all elements that need it
    document.body.style.backgroundColor = 'var(--bg-color)';
    document.body.style.color = 'var(--text-color)';

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update the icon
        if (newTheme === 'dark') {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        } else {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        }
    });
}

// Particles animation for hero section
function setupParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const particleCount = 30;
    const colors = ['#6366f1', '#818cf8', '#4f46e5', '#c7d2fe'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size, and animation duration
        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.backgroundColor = color;
        
        container.appendChild(particle);
        
        // Set animation
        particle.style.animation = `float-particle ${animationDuration}s ease-in-out ${delay}s infinite`;
    }
}

// Scroll progress indicator
function setupScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.classList.add('scroll-progress');
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercent = (scrollPx / (scrollHeight - clientHeight)) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Enhanced scroll reveal animation
function revealElements() {
    const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Add tilt effect to cards
function setupTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            
            element.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    });
}

// Update last modified date and time
function updateLastModified() {
    const lastUpdated = "2025-03-22 14:24:04";
    const lastUpdatedElements = document.querySelectorAll('.last-updated');
    lastUpdatedElements.forEach(el => {
        el.textContent = lastUpdated;
    });
}

// Theme toggling functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Set dark theme as default regardless of previous settings
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Make sure icon matches the dark theme
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-fill');
    
    // Apply the initial styling to all elements that need it
    document.body.style.backgroundColor = 'var(--bg-color)';
    document.body.style.color = 'var(--text-color)';

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update the icon
        if (newTheme === 'dark') {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        } else {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        }
    });
}

// Initialize all functionality
function init() {
    revealElements();
    updateLastModified();
    setupThemeToggle();
    setupParticles();
    setupScrollProgress();
    setupTiltEffect();
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', init);

// Add GitHub and LinkedIn links
document.addEventListener('DOMContentLoaded', function() {
    // Set GitHub and LinkedIn links throughout the page
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');

    githubLinks.forEach(link => {
        link.href = 'https://github.com/Avi1606';
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    linkedinLinks.forEach(link => {
        link.href = 'https://linkedin.com/in/aviiiprajapati';
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});