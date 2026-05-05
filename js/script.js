// ========== MENU BURGER ==========
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            } else {
                this.textContent = nav.classList.contains('active') ? '✕' : '☰';
            }
        });
        
        const navLinks = document.querySelectorAll('nav a, .head-btn-mobile');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const menuToggleBtn = document.querySelector('.menu-toggle');
                if (menuToggleBtn) {
                    const icon = menuToggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    } else {
                        menuToggleBtn.textContent = '☰';
                    }
                }
            });
        });
        
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && 
                !nav.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    menuToggle.textContent = '☰';
                }
            }
        });
    }
    
    const track = document.querySelector('.carousel-track');
    if (track && track.children.length > 0) {
        const slides = track.innerHTML;
        track.innerHTML = slides + slides;
    }
    
    const testimonialsTrack = document.querySelector('.testimonials-carousel-track');
    if (testimonialsTrack && testimonialsTrack.children.length > 0) {
        const testimonialSlides = testimonialsTrack.innerHTML;
        testimonialsTrack.innerHTML = testimonialSlides + testimonialSlides;
    }
});

// ========== BOUTON DEVIS GRATUIT ==========
function openDevis() {
    window.location.href = 'contact.html?subject=devis';
}

// ========== SÉLECTION DES OFFRES ==========
function selectOffer(packName) {
    window.location.href = `contact.html?pack=${encodeURIComponent(packName)}`;
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

// ========== FORMULAIRE DE CONTACT ==========
function sendContact(event) {
    event.preventDefault();
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
    
    if (name && email && message) {
        alert(`Merci ${name} ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.`);
        document.getElementById('contactForm')?.reset();
    } else {
        alert('Veuillez remplir tous les champs obligatoires.');
    }
}

// ========== PRÉ-REMPLISSAGE DU FORMULAIRE CONTACT ==========
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pack = urlParams.get('pack');
    const subject = urlParams.get('subject');
    
    if (pack && document.getElementById('subject')) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) subjectSelect.value = 'devis';
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.value = `Je suis intéressé par le pack ${pack}. Veuillez me contacter pour plus d'informations.`;
        }
    }
    if (subject && subject === 'devis' && document.getElementById('subject')) {
        document.getElementById('subject').value = 'devis';
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

// ========== ANIMATION AU SCROLL ==========
let ticking = false;

function animateCards() {
    const cards = document.querySelectorAll('.service-card, .real-card-carousel, .offer-card, .testimonial-card-carousel, .portfolio-item, .formation-card, .blog-card');
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

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .real-card-carousel, .offer-card, .testimonial-card-carousel, .portfolio-item, .formation-card, .blog-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
    setTimeout(() => {
        animateCards();
    }, 100);
});
