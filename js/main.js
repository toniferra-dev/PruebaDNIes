/**
 * CompletDNI - Validador de DNI español
 * Punto de entrada principal de la aplicación que coordina todos los módulos
 * @module main
 */

import { getElements, updateStatusMessage, updateCounter } from './utils/dom-utils.js';
import { procesarDNI } from './modules/dni-validator.js';
import { mostrarResultado, handleInputBehavior } from './modules/ui-handler.js';
import { setupThemeToggle } from './modules/theme-manager.js';
import { setupAccessibility } from './modules/accessibility.js';

/**
 * Inicializa la aplicación cuando el DOM está cargado
 */
document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos las referencias a los elementos del DOM
    const elements = getElements();
    
    // Procesamos el DNI cuando se envía el formulario
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        procesarDNI(elements, (numeros, letra, esError = false) => {
            mostrarResultado(elements, numeros, letra, esError);
        });
    });
    
    // Inicializamos el contador de caracteres
    if (elements.contador) {
        updateCounter(elements.contador, 0, 8);
    }
    
    // Mejoras de accesibilidad para el input
    elements.input.addEventListener('input', (e) => {
        handleInputBehavior(elements, e);
    });
    
    // Enfocamos el input al cargar la página
    elements.input.focus();
    
    // Mostramos instrucciones cuando el usuario hace focus en el input
    elements.input.addEventListener('focus', () => {
        if (!elements.input.value) {
            updateStatusMessage(
                elements.statusElement, 
                'Introduce 8 números para tu DNI',
                ''
            );
        }
    });
    
    // Limpiamos las instrucciones cuando pierde el focus si no hay valor
    elements.input.addEventListener('blur', () => {
        if (!elements.input.value) {
            updateStatusMessage(elements.statusElement, '', '');
        }
    });
    
    // Configuramos el cambio de tema
    setupThemeToggle(elements.themeToggle);
    
    // Configuramos funcionalidades de accesibilidad
    setupAccessibility(elements);
});