/**
 * SELECTOR DE TEMA
 * Permite cambiar entre diferentes temas de color y fondo
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener todos los botones de tema
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Verificar que existan botones
    if (themeButtons.length === 0) {
        console.warn('No se encontraron botones de tema');
        return;
    }
    
    /**
     * Aplicar el tema seleccionado
     * @param {string} theme - Nombre del tema a aplicar
     */
    function applyTheme(theme) {
        // Remover tema anterior
        document.body.removeAttribute('data-theme');
        
        // Aplicar nuevo tema (si no es el default)
        if (theme !== 'default') {
            document.body.setAttribute('data-theme', theme);
        }
        
        // Actualizar botones activos
        updateActiveButton(theme);
        
        // Anunciar cambio para lectores de pantalla
        announceThemeChange(theme);
    }
    
    /**
     * Actualizar el botón activo visualmente
     * @param {string} theme - Tema actualmente seleccionado
     */
    function updateActiveButton(theme) {
        themeButtons.forEach(button => {
            if (button.getAttribute('data-theme') === theme) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    /**
     * Anunciar el cambio de tema para lectores de pantalla
     * @param {string} theme - Tema seleccionado
     */
    function announceThemeChange(theme) {
        const themeNames = {
            'default': 'Tema predeterminado',
            'dark': 'Tema oscuro',
            'sepia': 'Tema sepia',
            'high-contrast': 'Tema de alto contraste',
            'blue': 'Tema azul'
        };
        
        // Crear elemento para anuncio (solo accesible para lectores de pantalla)
        let announcer = document.getElementById('theme-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'theme-announcer';
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }
        
        announcer.textContent = `${themeNames[theme] || theme} activado`;
    }
    
    // Obtener el tema guardado o usar el predeterminado
    const savedTheme = localStorage.getItem('siteTheme') || 'default';
    applyTheme(savedTheme);
    
    // Agregar event listeners a todos los botones de tema
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            localStorage.setItem('siteTheme', theme);
        });
        
        // Accesibilidad: permitir cambiar tema con Enter o Espacio
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});