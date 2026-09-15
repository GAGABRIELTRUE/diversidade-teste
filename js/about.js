// 🧭 MENU MOBILE — Página Sobre Nós

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', String(isHidden));
});