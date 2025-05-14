/**
 * Gestión del tema (claro/oscuro) de la aplicación
 * @module modules/theme-manager
 */

/**
 * Configura el alternador de temas (claro/oscuro)
 * @param {HTMLElement} themeToggle - Elemento HTML para cambiar el tema
 */
export function setupThemeToggle(themeToggle) {
    if (!themeToggle) return;
    
    // Verificamos si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si hay un tema guardado, lo aplicamos
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        // Actualizamos la apariencia del botón
        updateToggleAppearance(savedTheme === 'dark');
    } else {
        // Si no hay tema guardado, detectamos la preferencia del sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkScheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            // Actualizamos la apariencia del botón
            updateToggleAppearance(true);
        }
    }
    
    // Añadimos el evento para cambiar el tema
    themeToggle.addEventListener('click', () => {
        // Obtenemos el tema actual
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        // Cambiamos al tema opuesto
        const isDark = currentTheme !== 'dark';
        
        toggleTheme(isDark);
    });
}

/**
 * Cambia entre tema claro y oscuro
 * @param {boolean} isDark - Indica si se debe usar el tema oscuro
 */
function toggleTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';
    
    // Cambiamos el atributo data-theme del documento
    document.documentElement.setAttribute('data-theme', theme);
    
    // Actualizamos la apariencia del botón
    updateToggleAppearance(isDark);
    
    // Guardamos la preferencia en localStorage
    localStorage.setItem('theme', theme);
    
    // Anunciamos el cambio para lectores de pantalla
    announceThemeChange(theme);
}

/**
 * Actualiza la apariencia del botón según el tema actual
 * @param {boolean} isDark - Indica si el tema actual es oscuro
 */
function updateToggleAppearance(isDark) {
    const sunIcon = document.querySelector('.theme-toggle__icon--sun');
    const moonIcon = document.querySelector('.theme-toggle__icon--moon');
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            // Si es tema oscuro, mostramos el icono del sol
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            // Si es tema claro, mostramos el icono de la luna
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
}

/**
 * Anuncia el cambio de tema para mejorar la accesibilidad
 * @param {string} theme - Tema actual ('light' o 'dark')
 */
function announceThemeChange(theme) {
    // Creamos un elemento para anunciar el cambio
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Tema cambiado a ${theme === 'dark' ? 'oscuro' : 'claro'}`;
    
    // Añadimos el elemento al DOM
    document.body.appendChild(announcement);
    
    // Eliminamos el elemento después de que se haya anunciado
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}
