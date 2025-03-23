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

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

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

// Initialize all functionality
function init() {
    revealElements();
    updateLastModified();
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