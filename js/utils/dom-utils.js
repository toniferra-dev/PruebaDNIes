/**
 * Utilidades para la manipulación del DOM
 * @module utils/dom-utils
 */

/**
 * Obtiene referencias a los elementos del DOM utilizados en la aplicación
 * @returns {Object} - Objeto con referencias a los elementos del DOM
 */
export function getElements() {
    return {
        form: document.querySelector('form'),
        input: document.getElementById('dni-input'),
        resultContainer: document.querySelector('[aria-live="polite"]'),
        resultText: document.getElementById('dni-result'),
        button: document.querySelector('button[type="submit"]'),
        themeToggle: document.getElementById('toggle-theme'),
        statusElement: document.getElementById('dni-status'),
        contador: document.getElementById('dni-counter')
    };
}

/**
 * Manipula clases CSS para mostrar un estado visual de error
 * @param {HTMLElement} element - Elemento al que aplicar la clase de error
 * @param {Function} [callback] - Función opcional a ejecutar después de eliminar la clase
 * @param {number} [timeout=1500] - Tiempo en ms para eliminar la clase
 */
export function showTemporaryErrorState(element, callback, timeout = 1500) {
    element.classList.add('dni-validator__input--error');
    
    setTimeout(() => {
        element.classList.remove('dni-validator__input--error');
        if (callback) {
            callback();
        }
    }, timeout);
}

/**
 * Actualiza el mensaje de estado
 * @param {HTMLElement} statusElement - Elemento donde mostrar el mensaje
 * @param {string} message - Mensaje a mostrar
 * @param {string} [type=''] - Tipo de mensaje (error, warning, success)
 */
export function updateStatusMessage(statusElement, message, type = '') {
    if (!statusElement) return;
    
    statusElement.textContent = message;
    
    // Resetear clases
    statusElement.className = 'dni-validator__status';
    
    // Añadir clase específica si se proporciona un tipo
    if (type) {
        statusElement.classList.add(`dni-validator__status--${type}`);
    }
}

/**
 * Actualiza el contador de caracteres
 * @param {HTMLElement} contador - Elemento del contador
 * @param {number} length - Longitud actual
 * @param {number} maxLength - Longitud máxima
 */
export function updateCounter(contador, length, maxLength) {
    if (!contador) return;
    
    contador.textContent = `${length}/${maxLength}`;
    
    if (length === maxLength) {
        contador.classList.add('dni-validator__counter--complete');
    } else {
        contador.classList.remove('dni-validator__counter--complete');
    }
}
