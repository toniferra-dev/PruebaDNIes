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
 * @returns {Object} - Objeto con resultado de validación y mensaje de error
 */
function validarFormatoDNI(inputValue) {
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
 * Muestra un mensaje de resultado
 * @param {string} numeros - Números del DNI
 * @param {string} letra - Letra del DNI (o mensaje de error completo)
 * @param {boolean} esError - Indica si es un mensaje de error
 */
function mostrarResultado(numeros, letra, esError = false) {
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
 * Procesa la validación del DNI
 */
function procesarDNI() {
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

// Registramos los event listeners cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    // Procesamos el DNI cuando se envía el formulario
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        procesarDNI();
    });
    
    // Inicializamos el contador de caracteres
    const contador = document.getElementById('dni-counter');
    if (contador) {
        contador.textContent = `0/8`;
    }
    
    // Mejoras de accesibilidad para el input
    elements.input.addEventListener('input', (e) => {
        const valor = e.target.value;
        const statusElement = document.getElementById('dni-status');
        
        // Si el usuario intenta introducir algo que no sea un número, lo eliminamos
        if (/[^\d]/.test(valor)) {
            // Guardamos la posición del cursor
            const cursorPos = e.target.selectionStart;
            
            // Filtramos los caracteres no numéricos
            const valorFiltrado = valor.replace(/\D/g, '');
            
            // Actualizamos el valor
            e.target.value = valorFiltrado;
            
            // Restauramos la posición del cursor ajustada por la cantidad de caracteres eliminados
            const diff = valor.length - valorFiltrado.length;
            e.target.setSelectionRange(cursorPos - diff, cursorPos - diff);
            
            // Mostramos una alerta visual temporalmente
            elements.input.classList.add('dni-validator__input--error');
            
            // Actualizamos el mensaje de estado
            if (statusElement) {
                statusElement.textContent = 'Solo se permiten números en el DNI';
                statusElement.className = 'dni-validator__status dni-validator__status--error';
            }
            
            setTimeout(() => {
                elements.input.classList.remove('dni-validator__input--error');
                
                // Limpiamos el mensaje después de un tiempo si el valor ahora es válido
                if (statusElement && !/[^\d]/.test(e.target.value)) {
                    // Mostramos mensaje de longitud si sigue siendo necesario
                    if (e.target.value.length < 8) {
                        statusElement.textContent = `Faltan ${8 - e.target.value.length} dígitos para completar el DNI`;
                        statusElement.className = 'dni-validator__status dni-validator__status--warning';
                    } else {
                        statusElement.textContent = '';
                    }
                }
            }, 1500);
        } else {
            // Mostramos el estado actual según la longitud
            if (statusElement) {
                if (valor.length === 0) {
                    statusElement.textContent = '';
                    statusElement.className = 'dni-validator__status';
                } else if (valor.length < 8) {
                    statusElement.textContent = `Faltan ${8 - valor.length} dígitos para completar el DNI`;
                    statusElement.className = 'dni-validator__status dni-validator__status--warning';
                } else {
                    statusElement.textContent = 'DNI completo. Puedes validarlo ahora';
                    statusElement.className = 'dni-validator__status dni-validator__status--success';
                }
            }
        }
        
        // Limitamos a 8 caracteres
        if (e.target.value.length > 8) {
            // Guardamos la posición del cursor si está dentro del rango válido
            const cursorPos = Math.min(e.target.selectionStart, 8);
            
            // Truncamos el valor a 8 caracteres
            e.target.value = e.target.value.slice(0, 8);
            
            // Restauramos la posición del cursor
            e.target.setSelectionRange(cursorPos, cursorPos);
            
            // Mostramos una alerta visual temporalmente
            elements.input.classList.add('dni-validator__input--error');
            
            // Actualizamos el mensaje de estado
            if (statusElement) {
                statusElement.textContent = 'El DNI debe tener exactamente 8 dígitos';
                statusElement.className = 'dni-validator__status dni-validator__status--error';
            }
            
            setTimeout(() => {
                elements.input.classList.remove('dni-validator__input--error');
                
                // Actualizamos el mensaje al estado correcto
                if (statusElement) {
                    statusElement.textContent = 'DNI completo. Puedes validarlo ahora';
                    statusElement.className = 'dni-validator__status dni-validator__status--success';
                }
            }, 1500);
        }
        
        // Actualizamos el contador de caracteres si existe
        const contador = document.getElementById('dni-counter');
        if (contador) {
            contador.textContent = `${e.target.value.length}/8`;
            
            // Actualizamos el estado visual del contador
            if (e.target.value.length === 8) {
                contador.classList.add('dni-validator__counter--complete');
            } else {
                contador.classList.remove('dni-validator__counter--complete');
            }
        }
    });
    
    // Enfocamos el input al cargar la página
    elements.input.focus();
    
    // Mostramos instrucciones cuando el usuario hace focus en el input
    elements.input.addEventListener('focus', () => {
        const statusElement = document.getElementById('dni-status');
        if (statusElement && !elements.input.value) {
            statusElement.textContent = 'Introduce 8 números para tu DNI';
            statusElement.className = 'dni-validator__status';
        }
    });
    
    // Limpiamos las instrucciones cuando pierde el focus si no hay valor
    elements.input.addEventListener('blur', () => {
        const statusElement = document.getElementById('dni-status');
        if (statusElement && !elements.input.value) {
            statusElement.textContent = '';
        }
    });
    
    // Funcionalidad de cambio de tema
    setupThemeToggle();
});

/**
 * Muestra confeti virtual para celebrar el resultado
 */
function mostrarConfeti() {
    // Creamos un contenedor para el confeti
    const confetiContainer = document.createElement('div');
    confetiContainer.className = 'confeti-container';
    document.body.appendChild(confetiContainer);
    
    // Número de piezas de confeti
    const cantidadConfeti = window.innerWidth < 600 ? 30 : 50;
    
    // Colores del confeti (adaptados a nuestro tema)
    const colores = [
        'var(--color-primary)',
        'var(--color-secondary)',
        'var(--color-primary-dark)',
        'var(--color-secondary-dark)',
        '#FFF'
    ];
    
    // Creamos las piezas de confeti
    for (let i = 0; i < cantidadConfeti; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.left = `${Math.random() * 100}%`;
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.width = `${Math.random() * 8 + 4}px`;
        confeti.style.height = `${Math.random() * 4 + 6}px`;
        confeti.style.opacity = Math.random() + 0.5;
        confeti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confeti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetiContainer.appendChild(confeti);
    }
    
    // Eliminamos el contenedor después de la animación
    setTimeout(() => {
        if (confetiContainer && confetiContainer.parentNode) {
            confetiContainer.parentNode.removeChild(confetiContainer);
        }
    }, 5000);
}
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