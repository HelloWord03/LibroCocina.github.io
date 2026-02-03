// ===== Carrusel =====
const items = Array.from(document.querySelectorAll('.carrusel-item'));
const prevBtn = document.querySelector('.carrusel-prev');
const nextBtn = document.querySelector('.carrusel-next');
let index = 0;

function actualizarCarrusel() {
    const total = items.length;
    const centro = index;
    const izq = (index - 1 + total) % total;
    const der = (index + 1) % total;

    items.forEach(it => it.classList.remove('activo','izquierda','derecha'));
    items[centro].classList.add('activo');
    items[izq].classList.add('izquierda');
    items[der].classList.add('derecha');
}

prevBtn.addEventListener('click', ()=> { index = (index-1+items.length)%items.length; actualizarCarrusel(); });
nextBtn.addEventListener('click', ()=> { index = (index+1)%items.length; actualizarCarrusel(); });
window.addEventListener('load', actualizarCarrusel);

// ===== Slideouts =====

const abrirBtns = document.querySelectorAll('.abrir-slide');
const cerrarBtns = document.querySelectorAll('.cerrar-slide');
const slideouts = document.querySelectorAll('.slideout');

abrirBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const target = btn.dataset.target;
        slideouts.forEach(sl => sl.classList.remove('active'));
        const s = document.getElementById(target);
        if(s) s.classList.add('active');
    });
});

cerrarBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        btn.closest('.slideout').classList.remove('active');
        overlay.classList.remove('active');
    });
});
const overlay = document.querySelector('.slideout-overlay');
overlay.addEventListener('click', () => {
    slideouts.forEach(sl => sl.classList.remove('active'));
    overlay.classList.remove('active');
});