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
    } else {
        // Si no hay tema guardado, detectamos la preferencia del sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkScheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    
    // Añadimos el evento para cambiar el tema
    themeToggle.addEventListener('click', () => {
        // Obtenemos el tema actual
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        // Cambiamos al tema opuesto
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        toggleTheme(newTheme === 'dark');
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
    
    // Guardamos la preferencia en localStorage
    localStorage.setItem('theme', theme);
    
    // Anunciamos el cambio para lectores de pantalla
    announceThemeChange(theme);
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
