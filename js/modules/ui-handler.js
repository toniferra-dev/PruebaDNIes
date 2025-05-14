/**
 * Manejo de la interfaz de usuario para la validación de DNI
 * @module modules/ui-handler
 */

import { mostrarConfeti } from './confetti.js';
import { updateStatusMessage, updateCounter } from '../utils/dom-utils.js';

/**
 * Muestra un mensaje de resultado
 * @param {Object} elements - Referencias a elementos del DOM
 * @param {string} numeros - Números del DNI
 * @param {string} letra - Letra del DNI (o mensaje de error completo)
 * @param {boolean} esError - Indica si es un mensaje de error
 */
export function mostrarResultado(elements, numeros, letra, esError = false) {
    // Limpiamos el contenido anterior
    elements.resultText.innerHTML = '';
    
    if (esError) {
        // Si es un error, mostramos el mensaje completo
        elements.resultText.textContent = numeros;
        elements.resultText.className = 'dni-validator__result-text dni-validator__result-error';
        elements.resultContainer.setAttribute('aria-label', 'Error en la validación');
        
        // Quitamos la clase de éxito del contenedor
        elements.resultContainer.classList.remove('dni-validator__result--success');
    } else {
        // Si es un DNI válido, primero mostramos solo los números
        const numerosSpan = document.createElement('span');
        numerosSpan.textContent = numeros;
        numerosSpan.className = 'dni-validator__result-numero';
        elements.resultText.appendChild(numerosSpan);
        
        // Añadimos la clase de éxito al contenedor para la animación
        elements.resultContainer.classList.add('dni-validator__result--success');
        
        // Mostramos el confeti para un resultado exitoso
        setTimeout(() => {
            mostrarConfeti();
        }, 400);
        
        // Añadimos la letra con un pequeño retraso para enfatizar la animación
        setTimeout(() => {
            const letraSpan = document.createElement('span');
            letraSpan.textContent = letra;
            letraSpan.className = 'dni-validator__result-letra';
            
            // Añadimos la letra al contenedor
            elements.resultText.appendChild(letraSpan);
            
            // Reproduce un sonido sutil (bip) en dispositivos compatibles
            reproducirSonido();
            
            // Añadimos vibración para dispositivos compatibles (principalmente móviles)
            if ('vibrate' in navigator) {
                try {
                    navigator.vibrate(50); // 50ms de vibración sutil
                } catch (e) {
                    console.log('Vibración no soportada');
                }
            }
        }, 300); // 300ms de retraso para que primero se vean los números
        
        // Actualizamos el atributo aria-label
        elements.resultContainer.setAttribute('aria-label', 'DNI completo válido');
    }
}

/**
 * Reproduce un sonido de feedback
 */
function reproducirSonido() {
    try {
        // Sonido de notificación 
        const context = new (window.AudioContext || window.webkitAudioContext)();
        if (context) {
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 880; // Nota La (A5)
            gainNode.gain.value = 0.05; // Volumen bajo
            
            oscillator.start();
            oscillator.stop(context.currentTime + 0.15); // Duración corta
        }
    } catch (e) {
        console.log('Audio no soportado');
    }
}

/**
 * Gestiona el comportamiento del input en tiempo real
 * @param {Object} elements - Referencias a elementos del DOM
 * @param {Event} e - Evento de input
 */
export function handleInputBehavior(elements, e) {
    const valor = e.target.value;
    const statusElement = elements.statusElement;
    
    // Si el usuario intenta introducir algo que no sea un número, lo eliminamos
    if (/[^\d]/.test(valor)) {
        handleNonNumericInput(e, statusElement);
    } else {
        // Mostramos el estado actual según la longitud
        if (statusElement) {
            if (valor.length === 0) {
                updateStatusMessage(statusElement, '', '');
            } else if (valor.length < 8) {
                updateStatusMessage(
                    statusElement, 
                    `Faltan ${8 - valor.length} dígitos para completar el DNI`, 
                    'warning'
                );
            } else {
                updateStatusMessage(
                    statusElement, 
                    'DNI completo. Puedes validarlo ahora', 
                    'success'
                );
            }
        }
    }
    
    // Limitamos a 8 caracteres
    if (e.target.value.length > 8) {
        handleExcessiveLength(e, statusElement);
    }
    
    // Actualizamos el contador de caracteres si existe
    if (elements.contador) {
        updateCounter(elements.contador, e.target.value.length, 8);
    }
}

/**
 * Maneja la entrada de caracteres no numéricos
 * @param {Event} e - Evento de input
 * @param {HTMLElement} statusElement - Elemento para mostrar mensajes de estado
 */
function handleNonNumericInput(e, statusElement) {
    // Guardamos la posición del cursor
    const cursorPos = e.target.selectionStart;
    
    // Filtramos los caracteres no numéricos
    const valorFiltrado = e.target.value.replace(/\D/g, '');
    
    // Actualizamos el valor
    e.target.value = valorFiltrado;
    
    // Restauramos la posición del cursor ajustada por la cantidad de caracteres eliminados
    const diff = e.target.value.length - valorFiltrado.length;
    e.target.setSelectionRange(cursorPos - diff, cursorPos - diff);
    
    // Mostramos una alerta visual temporalmente
    e.target.classList.add('dni-validator__input--error');
    
    // Actualizamos el mensaje de estado
    if (statusElement) {
        updateStatusMessage(statusElement, 'Solo se permiten números en el DNI', 'error');
    }
    
    setTimeout(() => {
        e.target.classList.remove('dni-validator__input--error');
        
        // Limpiamos el mensaje después de un tiempo si el valor ahora es válido
        if (statusElement && !/[^\d]/.test(e.target.value)) {
            // Mostramos mensaje de longitud si sigue siendo necesario
            if (e.target.value.length < 8) {
                updateStatusMessage(
                    statusElement, 
                    `Faltan ${8 - e.target.value.length} dígitos para completar el DNI`, 
                    'warning'
                );
            } else {
                updateStatusMessage(statusElement, '', '');
            }
        }
    }, 1500);
}

/**
 * Maneja el caso de longitud excesiva
 * @param {Event} e - Evento de input
 * @param {HTMLElement} statusElement - Elemento para mostrar mensajes de estado
 */
function handleExcessiveLength(e, statusElement) {
    // Guardamos la posición del cursor si está dentro del rango válido
    const cursorPos = Math.min(e.target.selectionStart, 8);
    
    // Truncamos el valor a 8 caracteres
    e.target.value = e.target.value.slice(0, 8);
    
    // Restauramos la posición del cursor
    e.target.setSelectionRange(cursorPos, cursorPos);
    
    // Mostramos una alerta visual temporalmente
    e.target.classList.add('dni-validator__input--error');
    
    // Actualizamos el mensaje de estado
    if (statusElement) {
        updateStatusMessage(statusElement, 'El DNI debe tener exactamente 8 dígitos', 'error');
    }
    
    setTimeout(() => {
        e.target.classList.remove('dni-validator__input--error');
        
        // Actualizamos el mensaje al estado correcto
        if (statusElement) {
            updateStatusMessage(statusElement, 'DNI completo. Puedes validarlo ahora', 'success');
        }
    }, 1500);
}
