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
