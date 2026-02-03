//  CARRUSEL 
const items = Array.from(document.querySelectorAll('.carrusel-item'));
const prevBtn = document.querySelector('.carrusel-prev');
const nextBtn = document.querySelector('.carrusel-next');
let index = 0;

function actualizarCarrusel() {
    const total = items.length;
    const centro = index;
    const izq = (index - 1 + total) % total;
    const der = (index + 1) % total;

    items.forEach(it => it.classList.remove('activo', 'izquierda', 'derecha'));
    items[centro].classList.add('activo');
    items[izq].classList.add('izquierda');
    items[der].classList.add('derecha');
}

// Eventos de navegación del carrusel
if (prevBtn) {
    prevBtn.addEventListener('click', () => { 
        index = (index - 1 + items.length) % items.length; 
        actualizarCarrusel(); 
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => { 
        index = (index + 1) % items.length; 
        actualizarCarrusel(); 
    });
}

// Navegación con teclado (accesibilidad)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        index = (index - 1 + items.length) % items.length;
        actualizarCarrusel();
    } else if (e.key === 'ArrowRight') {
        index = (index + 1) % items.length;
        actualizarCarrusel();
    }
});

// Inicializar carrusel al cargar
window.addEventListener('load', actualizarCarrusel);

//  SLIDEOUTS 
const abrirBtns = document.querySelectorAll('.abrir-slide');
const cerrarBtns = document.querySelectorAll('.cerrar-slide');
const slideouts = document.querySelectorAll('.slideout');
const overlay = document.querySelector('.slideout-overlay');

// Función para abrir slideout
function abrirSlideout(targetId) {
    // Cerrar todos los slideouts primero
    slideouts.forEach(sl => sl.classList.remove('active'));
    
    // Abrir el slideout específico
    const slideout = document.getElementById(targetId);
    if (slideout) {
        slideout.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
}

// Función para cerrar slideouts
function cerrarSlideouts() {
    slideouts.forEach(sl => sl.classList.remove('active'));
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll del body
}

// Eventos para abrir slideouts
abrirBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = btn.dataset.target;
        if (target) {
            abrirSlideout(target);
        }
    });
});

// Eventos para cerrar slideouts
cerrarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cerrarSlideouts();
    });
});

// Cerrar al hacer click en el overlay
if (overlay) {
    overlay.addEventListener('click', () => {
        cerrarSlideouts();
    });
}

// Cerrar con la tecla Escape (accesibilidad)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarSlideouts();
    }
});

//  SELECTOR DE TEMAS 
// Crear el selector de temas si no existe
function crearSelectorTemas() {
    // Verificar si ya existe
    if (document.querySelector('.theme-selector')) {
        return;
    }

    const temas = [
        { id: 'default', label: 'Claro' },
        { id: 'dark', label: 'Oscuro' },
        { id: 'sepia', label: 'Sepia' },
        { id: 'high-contrast', label: 'Alto Contraste' },
        { id: 'blue', label: 'Azul' }
    ];

    const selector = document.createElement('div');
    selector.className = 'theme-selector';
    selector.setAttribute('role', 'toolbar');
    selector.setAttribute('aria-label', 'Selector de temas');

    temas.forEach(tema => {
        const btn = document.createElement('button');
        btn.className = `theme-btn theme-${tema.id}`;
        btn.setAttribute('aria-label', tema.label);
        btn.setAttribute('data-theme', tema.id);
        btn.setAttribute('type', 'button');
        selector.appendChild(btn);
    });

    document.body.appendChild(selector);
    inicializarTemas();
}

// Inicializar funcionalidad de temas
function inicializarTemas() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'default';
    
    // Aplicar tema guardado
    document.body.setAttribute('data-theme', currentTheme);
    
    // Marcar botón activo
    themeBtns.forEach(btn => {
        if (btn.dataset.theme === currentTheme) {
            btn.classList.add('active');
        }
        
        // Evento de cambio de tema
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Actualizar botón activo
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Crear selector de temas al cargar
document.addEventListener('DOMContentLoaded', crearSelectorTemas);

//  BOTÓN SUBIR
function crearBotonSubir() {
    const btnSubir = document.querySelector('.btn-subir');
    if (btnSubir) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnSubir.style.display = 'block';
            } else {
                btnSubir.style.display = 'none';
            }
        });
        
        btnSubir.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', crearBotonSubir);

//  MEJORAS DE ACCESIBILIDAD 
// Trap focus dentro del slideout cuando está abierto
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstFocusable.focus();
}

// Aplicar trap focus cuando se abre un slideout
abrirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const slideout = document.getElementById(targetId);
        if (slideout && slideout.classList.contains('active')) {
            setTimeout(() => trapFocus(slideout), 100);
        }
    });
});

console.log('Carrusel y slideouts inicializados correctamente');