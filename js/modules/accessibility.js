/**
 * Mejoras de accesibilidad para la aplicación
 * @module modules/accessibility
 */

/**
 * Configura los eventos para mejorar la accesibilidad
 * @param {Object} elements - Referencias a elementos del DOM
 */
export function setupAccessibility(elements) {
    setupKeyboardSupport(elements);
    setupA11yAnnouncements(elements);
}

/**
 * Configura el soporte para teclado
 * @param {Object} elements - Referencias a elementos del DOM
 */
function setupKeyboardSupport(elements) {
    // Permitir que el usuario presione Enter en el input para enviar el formulario
    elements.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            elements.button.click();
        }
    });
    
    // Mejorar el feedback de foco
    elements.form.querySelectorAll('button, input').forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('focus-visible');
        });
    });
}

/**
 * Configura los anuncios para lectores de pantalla
 * @param {Object} elements - Referencias a elementos del DOM
 */
function setupA11yAnnouncements(elements) {
    // Asegurarse de que el contenedor de resultados tiene 
    // el atributo aria-live para anunciar cambios
    if (elements.resultContainer && 
        !elements.resultContainer.hasAttribute('aria-live')) {
        elements.resultContainer.setAttribute('aria-live', 'polite');
    }
    
    // Añadir descripciones accesibles
    if (elements.input) {
        elements.input.setAttribute('aria-description', 
            'Introduce 8 dígitos para validar un DNI español');
    }
    
    if (elements.button) {
        elements.button.setAttribute('aria-label', 'Validar DNI');
    }
}
