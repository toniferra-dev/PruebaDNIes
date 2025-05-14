/**
 * Efecto de confeti para celebrar un DNI válido
 * @module modules/confetti
 */

/**
 * Muestra confeti virtual para celebrar el resultado
 */
export function mostrarConfeti() {
    // Creamos un contenedor para el confeti
    const confetiContainer = document.createElement('div');
    confetiContainer.className = 'confeti-container';
    document.body.appendChild(confetiContainer);
    
    // Número de piezas de confeti (aumentado para mayor densidad)
    const cantidadConfeti = window.innerWidth < 600 ? 80 : 120;
    
    // Colores del confeti (más brillantes e intensos)
    const colores = [
        '#FF1493', // Rosa intenso
        '#00BFFF', // Azul brillante
        '#FFD700', // Dorado
        '#FF4500', // Naranja rojizo
        '#32CD32', // Verde lima
        '#9400D3', // Violeta
        '#FF00FF', // Magenta
        '#FFFF00', // Amarillo
        '#00FFFF', // Cian
        '#FF6347'  // Tomate
    ];
    
    // Formas del confeti
    const formas = ['confeti-rectangulo', 'confeti-circulo', 'confeti-triangulo'];
    
    // Creamos las piezas de confeti
    for (let i = 0; i < cantidadConfeti; i++) {
        const confeti = document.createElement('div');
        
        // Asignamos forma aleatoria
        const formaAleatoria = formas[Math.floor(Math.random() * formas.length)];
        confeti.className = `confeti ${formaAleatoria}`;
        
        confeti.style.left = `${Math.random() * 100}%`;
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        
        // Tamaños más grandes para mayor visibilidad
        const escala = Math.random() * 0.8 + 1.2; // Factor de escala entre 1.2 y 2.0
        confeti.style.width = `${(Math.random() * 10 + 10) * escala}px`;
        confeti.style.height = `${(Math.random() * 6 + 12) * escala}px`;
        
        confeti.style.opacity = Math.random() * 0.3 + 0.7; // Entre 0.7 y 1.0
        confeti.style.animationDuration = `${Math.random() * 3 + 3}s`;
        confeti.style.animationDelay = `${Math.random() * 0.8}s`;
        
        // Brillo para más intensidad
        confeti.style.boxShadow = `0 0 6px ${colores[Math.floor(Math.random() * colores.length)]}`;
        
        confetiContainer.appendChild(confeti);
    }
    
    // Eliminamos el contenedor después de la animación
    setTimeout(() => {
        if (confetiContainer && confetiContainer.parentNode) {
            // Hacer un desvanecimiento suave
            confetiContainer.style.transition = 'opacity 1s ease-out';
            confetiContainer.style.opacity = '0';
            
            // Eliminar después de la transición
            setTimeout(() => {
                if (confetiContainer && confetiContainer.parentNode) {
                    confetiContainer.parentNode.removeChild(confetiContainer);
                }
            }, 1000);
        }
    }, 6000); // Aumentamos el tiempo para que dure más el efecto
}
