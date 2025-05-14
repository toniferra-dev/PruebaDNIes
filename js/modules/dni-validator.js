/**
 * Funciones de validación y cálculo para DNI español
 * @module modules/dni-validator
 */

// Array con las letras del DNI español
const LETRAS_DNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

/**
 * Calcula la letra correspondiente a un número de DNI
 * @param {number} numeroDNI - Número del DNI (sin letra)
 * @returns {string} - Letra correspondiente al DNI
 */
export function calcularLetraDNI(numeroDNI) {
    // Calculamos el resto de la división entre 23
    const resto = numeroDNI % 23;
    // Devolvemos la letra correspondiente
    return LETRAS_DNI[resto];
}

/**
 * Valida el formato del número de DNI
 * @param {string} inputValue - Valor del input
 * @returns {Object} - Objeto con resultado de validación y mensaje de error
 */
export function validarFormatoDNI(inputValue) {
    // Verificamos si contiene caracteres no numéricos
    if (/[^\d]/.test(inputValue)) {
        return {
            esValido: false,
            mensaje: 'Solo se permiten números en el DNI'
        };
    }
    
    // Verificamos si tiene menos de 8 dígitos
    if (inputValue.length < 8) {
        return {
            esValido: false,
            mensaje: `Faltan ${8 - inputValue.length} dígitos para completar el DNI`
        };
    }
    
    // Verificamos si tiene más de 8 dígitos
    if (inputValue.length > 8) {
        return {
            esValido: false,
            mensaje: 'El DNI debe tener exactamente 8 dígitos'
        };
    }
    
    // Si pasó todas las validaciones, es válido
    return {
        esValido: true,
        mensaje: ''
    };
}

/**
 * Procesa la validación del DNI
 * @param {Object} elements - Referencias a elementos del DOM
 * @param {Function} mostrarResultado - Función para mostrar el resultado
 */
export function procesarDNI(elements, mostrarResultado) {
    // Obtenemos y limpiamos el valor del input
    const inputValue = elements.input.value.trim();
    
    // Si no hay entrada, mostramos un mensaje genérico
    if (!inputValue) {
        mostrarResultado('Por favor, introduce un número de DNI', '', true);
        return;
    }
    
    // Validamos el formato
    const validacion = validarFormatoDNI(inputValue);
    if (!validacion.esValido) {
        // Detectamos si es un dispositivo móvil para adaptar el mensaje
        const esMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const mensajeError = esMobile && validacion.mensaje.length > 25 
            ? validacion.mensaje.substring(0, 25) + '...' 
            : validacion.mensaje;
        
        mostrarResultado(mensajeError, '', true);
        return;
    }
    
    // Convertimos a número
    const numeroDNI = parseInt(inputValue, 10);
    
    // Calculamos la letra
    const letra = calcularLetraDNI(numeroDNI);
    
    // Formateamos el DNI completo (con ceros a la izquierda si es necesario)
    const numeroFormateado = inputValue.padStart(8, '0');
    
    // Mostramos el resultado (pasamos números y letra por separado)
    mostrarResultado(numeroFormateado, letra);
    
    // Añadir clase de éxito al input
    elements.input.classList.add('dni-validator__input--success');
    
    // Quitar la clase después de un tiempo
    setTimeout(() => {
        elements.input.classList.remove('dni-validator__input--success');
    }, 2000);
}
