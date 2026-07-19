// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');

    // Animate hamburger icon
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .icons').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add typing effect to hero section
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Project cards hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items random animation delay
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Project details modal
const projectModal = document.getElementById('projectModal');
let lastFocusedCard = null;

if (projectModal) {
    const modalImage = projectModal.querySelector('.project-modal-image');
    const modalTitle = projectModal.querySelector('#projectModalTitle');
    const modalRole = projectModal.querySelector('#projectModalRole');
    const modalDescription = projectModal.querySelector('#projectModalDescription');
    const modalTags = projectModal.querySelector('#projectModalTags');
    const modalLink = projectModal.querySelector('#projectModalLink');
    const modalClose = projectModal.querySelector('.project-modal-close');

    const openProjectModal = (card) => {
        const image = card.querySelector('.project-image img');
        const link = card.querySelector('.project-link');

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = card.querySelector('h3').textContent;
        modalRole.textContent = card.querySelector('.project-role').textContent;
        modalDescription.textContent = card.querySelector('.project-content p').textContent;
        modalTags.innerHTML = card.querySelector('.project-tags').innerHTML;
        modalLink.href = link.href;
        modalLink.innerHTML = link.innerHTML;

        lastFocusedCard = card;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    };

    const closeProjectModal = () => {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedCard) {
            lastFocusedCard.focus();
        }
    };

    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-haspopup', 'dialog');

        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link')) return;
            openProjectModal(card);
        });

        card.addEventListener('keydown', (e) => {
            if (e.target !== card) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(card);
            }
        });
    });

    modalClose.addEventListener('click', closeProjectModal);
    projectModal.querySelector('.project-modal-backdrop').addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

console.log('Portfolio website loaded successfully! 🚀');
