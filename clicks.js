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

// Form submission with Firebase
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date();

    // Form validation
// Add this function before your form event listener
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

// Then in your form submission:
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Disable submit button and show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split mr-2"></i> Sending...';

    // Add a new document to collection "contacts"
    db.collection("contacts").add({
        name: name,
        email: email,
        message: message,
        timestamp: timestamp
    })
        .then(() => {
            // Success
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        })
        .catch((error) => {
            // Error
            console.error("Error adding document: ", error);
            alert('Sorry, there was an error sending your message. Please try again later.');

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
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