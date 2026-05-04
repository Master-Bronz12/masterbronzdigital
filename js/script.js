// Effet de transparency du header au scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fonction pour la sélection des offres
function selectOffer(packName) {
    alert(`Merci pour votre intérêt pour le pack ${packName} !\nUn conseiller vous contactera sous 24h.`);
}

// Fonction pour la newsletter
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    if (email && email.includes('@')) {
        alert(`Merci pour votre inscription !\nVous recevrez bientôt nos actualités sur ${email}`);
        document.getElementById('newsletterEmail').value = '';
    } else {
        alert('Veuillez entrer une adresse email valide.');
    }
}

// Animation au scroll
window.addEventListener('scroll', function () {
    const cards = document.querySelectorAll('.service-card, .real-card-carousel, .offer-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialisation des animations
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.service-card, .real-card, .offer-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// Menu burger
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Fermer le menu en cliquant sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.textContent = '☰';
            });
        });
    }
});