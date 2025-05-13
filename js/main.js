/**
 * CompletDNI - Validador de DNI español
 * Calcula y valida la letra correspondiente a un número de DNI
 */

// Array con las letras del DNI español
const LETRAS_DNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

// Elementos del DOM
const elements = {
    form: document.querySelector('form'),
    input: document.getElementById('dni-input'),
    resultContainer: document.querySelector('[aria-live="polite"]'),
    resultText: document.getElementById('dni-result'),
    button: document.querySelector('button[type="submit"]'),
    themeToggle: document.getElementById('toggle-theme')
};

/**
 * Calcula la letra correspondiente a un número de DNI
 * @param {number} numeroDNI - Número del DNI (sin letra)
 * @returns {string} - Letra correspondiente al DNI
 */
function calcularLetraDNI(numeroDNI) {
    // Calculamos el resto de la división entre 23
    const resto = numeroDNI % 23;
    // Devolvemos la letra correspondiente
    return LETRAS_DNI[resto];
}

/**
 * Valida el formato del número de DNI
 * @param {string} inputValue - Valor del input
 * @returns {boolean} - Indica si el formato es válido
 */
function validarFormatoDNI(inputValue) {
    // Comprueba que sea un número y tenga entre 1 y 8 dígitos
    return /^\d{1,8}$/.test(inputValue);
}

/**
 * Muestra un mensaje de resultado
 * @param {string} mensaje - Mensaje a mostrar
 * @param {boolean} esError - Indica si es un mensaje de error
 */
function mostrarResultado(mensaje, esError = false) {
    elements.resultText.textContent = mensaje;
    
    if (esError) {
        elements.resultText.classList.remove('text-primary');
        elements.resultText.classList.remove('text-secondary');
        elements.resultText.classList.add('text-red-600');
        elements.resultContainer.setAttribute('aria-label', 'Error en la validación');
    } else {
        elements.resultText.classList.remove('text-red-600');
        elements.resultText.classList.remove('text-secondary');
        elements.resultText.classList.add('text-primary');
        elements.resultText.classList.add('dark:text-secondary');
        elements.resultContainer.setAttribute('aria-label', 'DNI completo válido');
    }
}

/**
 * Procesa la validación del DNI
 */
function procesarDNI() {
    // Obtenemos y limpiamos el valor del input
    const inputValue = elements.input.value.trim();
    
    // Validamos el formato
    if (!validarFormatoDNI(inputValue)) {
        mostrarResultado('Por favor, introduce un número de DNI válido (hasta 8 dígitos)', true);
        return;
    }
    
    // Convertimos a número
    const numeroDNI = parseInt(inputValue, 10);
    
    // Calculamos la letra
    const letra = calcularLetraDNI(numeroDNI);
    
    // Formateamos el DNI completo (con ceros a la izquierda si es necesario)
    const numeroFormateado = inputValue.padStart(8, '0');
    
    // Mostramos el resultado
    mostrarResultado(`${numeroFormateado}${letra}`);
}

// Registramos los event listeners cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    // Procesamos el DNI cuando se envía el formulario
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        procesarDNI();
    });
    
    // Mejoras de accesibilidad para el input
    elements.input.addEventListener('input', () => {
        // Limitamos a 8 caracteres
        if (elements.input.value.length > 8) {
            elements.input.value = elements.input.value.slice(0, 8);
        }
        
        // Solo permitimos números
        elements.input.value = elements.input.value.replace(/\D/g, '');
    });
    
    // Enfocamos el input al cargar la página
    elements.input.focus();
    
    // Funcionalidad de cambio de tema
    setupThemeToggle();
});

/**
 * Inicializa y maneja la funcionalidad del botón de cambio de tema
 */
function setupThemeToggle() {
    // Comprobamos si hay una preferencia guardada
    const currentTheme = localStorage.getItem('theme');
    
    // Si hay una preferencia guardada o el usuario prefiere el modo oscuro, aplicamos el tema oscuro
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Añadimos el manejador de eventos para el botón de cambio de tema
    elements.themeToggle.addEventListener('click', () => {
        // Alternamos la clase 'dark' en el elemento HTML
        document.documentElement.classList.toggle('dark');
        
        // Guardamos la preferencia en localStorage
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}