// ========== MENU BURGER ==========
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        // Ouvrir/fermer le menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            // Changer l'icône du bouton
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('nav a, .head-btn-mobile');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.textContent = '☰';
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && 
                !nav.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }
    
    // ========== CAROUSELS INFINIS ==========
    // Dupliquer le carousel des réalisations pour l'effet infini
    const track = document.querySelector('.carousel-track');
    if (track && track.children.length > 0) {
        const slides = track.innerHTML;
        track.innerHTML = slides + slides;
    }
    
    // Dupliquer le carousel des témoignages pour l'effet infini
    const testimonialsTrack = document.querySelector('.testimonials-carousel-track');
    if (testimonialsTrack && testimonialsTrack.children.length > 0) {
        const testimonialSlides = testimonialsTrack.innerHTML;
        testimonialsTrack.innerHTML = testimonialSlides + testimonialSlides;
    }
});

// ========== EFFET HEADER AU SCROLL ==========
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== SÉLECTION DES OFFRES ==========
function selectOffer(packName) {
    alert(`Merci pour votre intérêt pour le pack ${packName} !\nUn conseiller vous contactera sous 24h.`);
}

// ========== NEWSLETTER ==========
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (email && email.includes('@') && email.includes('.')) {
        alert(`Merci pour votre inscription !\nVous recevrez bientôt nos actualités sur ${email}`);
        emailInput.value = '';
        emailInput.style.borderColor = '#00d9a6';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
    } else {
        alert('Veuillez entrer une adresse email valide.');
        emailInput.style.borderColor = '#ff4444';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
    }
}

// ========== ANIMATION AU SCROLL (VERSION OPTIMISÉE) ==========
let ticking = false;

function animateCards() {
    const cards = document.querySelectorAll('.service-card, .real-card-carousel, .offer-card, .testimonial-card-carousel');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(animateCards);
        ticking = true;
    }
});

// ========== INITIALISATION DES ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les cartes en mode invisible
    const cards = document.querySelectorAll('.service-card, .real-card-carousel, .offer-card, .testimonial-card-carousel');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
    
    // Déclencher l'animation après un court délai
    setTimeout(() => {
        animateCards();
    }, 100);
    
    // ========== ACTIVE LINK DANS LA NAVIGATION ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveLink);
    });
    updateActiveLink();
});

// ========== LAZY LOADING DES IMAGES ==========
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
} else {
    // Fallback pour les navigateurs plus anciens
    const lazyScript = document.createElement('script');
    lazyScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(lazyScript);
}

// ========== GESTION DES PERFORMANCES ==========
// Désactiver les animations si l'utilisateur préfère réduire les mouvements
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
}