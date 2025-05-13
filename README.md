# CompletDNI - Validador de DNI español

Una aplicación web moderna que calcula automáticamente la letra del DNI español o verifica si un DNI completo es válido.

## Características

- ✅ Cálculo automático de la letra del DNI
- ✅ Validación de formato y coherencia del DNI
- ✅ Diseño responsive y moderno con Tailwind CSS
- ✅ Interfaz accesible con soporte para lectores de pantalla
- ✅ Funcionalidad optimizada para una experiencia de usuario fluida

## Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible
- **Tailwind CSS**: Framework de utilidades CSS para un diseño rápido y consistente
- **JavaScript**: Validación y cálculo de letras del DNI
- **Enfoque en accesibilidad**: Atributos ARIA, navegación con teclado y contrastes adecuados

## Estructura del proyecto

```
├── index.html          # Documento HTML principal
├── js/
│   └── main.js         # Lógica JavaScript para el validador
├── img/
│   └── logo.svg        # Logo del proyecto
└── package.json        # Configuración de dependencias
```

## Integración de Tailwind CSS

Este proyecto utiliza Tailwind CSS a través de CDN para simplificar el desarrollo y la distribución. Las ventajas de usar Tailwind CSS incluyen:

- **Desarrollo más rápido**: Clases de utilidad que permiten construir diseños directamente en el HTML
- **Bundle size reducido**: Al usar CDN en producción, solo se carga lo necesario
- **Personalización**: Configuración de colores, tipografía y otros aspectos del diseño
- **Responsive design**: Clases adaptativas para diferentes tamaños de pantalla

## Uso

1. Abre `index.html` en tu navegador
2. Introduce tu número de DNI (sin la letra)
3. Haz clic en "Validar" o presiona Enter
4. El sistema mostrará automáticamente tu DNI completo con la letra calculada

## Mejoras futuras

- [ ] Añadir validación para NIE (Número de Identidad de Extranjero)
- [ ] Implementar almacenamiento local para guardar consultas recientes
- [ ] Crear modo oscuro utilizando las capacidades de Tailwind
- [ ] Añadir animaciones suaves para mejorar la experiencia de usuario

## Licencia

Copyright © 2025 CompletDNI. Todos los derechos reservados.
