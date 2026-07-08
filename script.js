// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ===== FORM SUBMIT =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Merci ! Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.');
    this.reset();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== LIGHTBOX GALERIE =====
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

const galerieItems = Array.from(document.querySelectorAll('.galerie-item'));
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galerieItems[currentIndex].dataset.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galerieItems.length) % galerieItems.length;
    lightboxImg.src = galerieItems[currentIndex].dataset.src;
}

function showNext() {
    currentIndex = (currentIndex + 1) % galerieItems.length;
    lightboxImg.src = galerieItems[currentIndex].dataset.src;
}

galerieItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Fermer en cliquant en dehors de l'image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Navigation clavier
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    showPrev();
    if (e.key === 'ArrowRight')   showNext();
});
