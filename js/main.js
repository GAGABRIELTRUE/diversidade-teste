// ⚙️ SCRIPT DA ANIMAÇÃO LATERAL (SPLASH SCREEN) — Página Inicial

window.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const introText = document.getElementById('intro-text');

    // 1. Após 0.7 segundos, faz o texto sumir suavemente (fade out)
    setTimeout(() => {
        introText.classList.add('text-hidden');
    }, 700);

    // 2. Ao 1 segundo, a cortina preta desliza para a direita revelando o site
    setTimeout(() => {
        introScreen.classList.add('intro-hidden');

        // 3. Remove o elemento para não atrapalhar cliques na tela
        setTimeout(() => {
            introScreen.remove();
        }, 500); // Tempo igual ao 'transition' do CSS (0.5s)

    }, 1000);
});


// 🧭 MENU MOBILE — Navbar fixa

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