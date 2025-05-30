# CompletDNI - Validador de DNI español

Una aplicación web moderna que calcula automáticamente la letra del DNI español o verifica si un DNI completo es válido.

## Características

- ✅ Cálculo automático de la letra del DNI
- ✅ Validación de formato y coherencia del DNI
- ✅ Diseño responsive y moderno con CSS personalizado
- ✅ Modo oscuro/claro con detección automática de preferencias del usuario
- ✅ Interfaz accesible con soporte para lectores de pantalla
- ✅ Funcionalidad optimizada para una experiencia de usuario fluida
- ✅ Arquitectura modular JavaScript ES6 para mejor mantenibilidad

## Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos personalizados y modernos con variables CSS
- **Modern Normalize**: Normalización CSS moderna para compatibilidad con navegadores antiguos
- **JavaScript ES6+**: Sistema modular con imports/exports para mejor organización
- **Módulos ES6**: Separación de responsabilidades en módulos independientes
- **Enfoque en accesibilidad**: Atributos ARIA, navegación con teclado y contrastes adecuados

## Estructura del proyecto

```bash
├── index.html                # Documento HTML principal
├── js/
│   ├── main.js               # Punto de entrada JavaScript
│   ├── modules/              # Módulos específicos de la aplicación
│   │   ├── accessibility.js  # Funcionalidades de accesibilidad
│   │   ├── confetti.js       # Efecto visual de celebración
│   │   ├── dni-validator.js  # Lógica del validador de DNI
│   │   ├── theme-manager.js  # Gestión del tema claro/oscuro
│   │   └── ui-handler.js     # Manejo de la interfaz de usuario
│   └── utils/
│       └── dom-utils.js      # Utilidades para manipulación del DOM
├── css/
│   ├── confeti.css           # Estilos para el efecto de confeti
│   ├── reset.css             # Estilos de reseteo (complementario)
│   └── style.css             # Estilos personalizados con soporte de tema oscuro
├── package.json              # Configuración de dependencias
└── site.webmanifest          # Configuración para PWA
```

## Sistema de temas claro/oscuro

El proyecto incluye un sistema de cambio de tema con las siguientes características:

- **Detección automática de preferencias**: Detecta las preferencias del sistema del usuario
- **Toggle manual**: Permite cambiar manualmente entre tema claro y oscuro
- **Persistencia**: Guarda la selección del usuario en localStorage
- **Variables CSS**: Utiliza variables CSS para facilitar la implementación del tema

## Arquitectura JavaScript

La aplicación utiliza una arquitectura modular basada en ES6:

- **Separación de responsabilidades**: Cada módulo tiene una única responsabilidad
- **Módulos independientes**: Las funcionalidades están separadas en módulos específicos
- **Mejor mantenibilidad**: Facilita la actualización y mejora del código
- **Código reutilizable**: Funciones y componentes que pueden ser reutilizados

## Uso

1. Abre `index.html` en tu navegador
2. Introduce tu número de DNI (sin la letra)
3. Haz clic en "Validar" o presiona Enter
4. El sistema mostrará automáticamente tu DNI completo con la letra calculada
5. Puedes cambiar entre tema claro y oscuro con el botón en la esquina superior derecha

## Características de la interfaz

- **Destacado visual de la letra**: La letra del DNI tiene un tamaño mayor para destacar visualmente
- **Tema oscuro/claro**: Cambia entre temas con un clic en el botón dedicado
- **Diseño responsive**: Se adapta a todos los tamaños de pantalla
- **Transiciones suaves**: Transiciones fluidas al cambiar entre temas
- **Optimizado para iPhone**: Siguiendo directrices de Apple Human Interface Guidelines

## Optimizaciones para dispositivos iOS

La aplicación ha sido optimizada para dispositivos iOS siguiendo las directrices oficiales de Apple:

- **Áreas táctiles óptimas**: Todos los elementos interactivos tienen un tamaño mínimo de 44×44px
- **Safe areas**: Respeto por el notch y home indicator en dispositivos como iPhone X y posteriores
- **Prevención de zoom**: Tamaños de fuente adecuados para evitar el zoom automático en campos de entrada
- **Gestos nativos**: Soporte para gestos de deslizamiento y navegación fluida
- **Personalización de estado**: Optimización para la barra de estado y experiencia a pantalla completa

## Mejoras realizadas

- [x] Refactorización del código HTML para mejorar la estructura semántica
- [x] Implementación de CSS personalizado con variables para mayor mantenibilidad
- [x] Creación de sistema de tema oscuro con detección automática de preferencias
- [x] Optimización de dependencias del proyecto
- [x] Destacado visual de la letra del DNI
- [x] Mejoras de accesibilidad (atributos ARIA, etiquetas semánticas)
- [x] Adaptación para dispositivos iOS siguiendo directrices de Apple HIG
- [x] Optimización para diferentes tamaños de pantalla (iPhone SE hasta iPad Pro)
- [x] Modularización del código JavaScript en módulos ES6
- [x] Separación de responsabilidades en componentes independientes
- [x] Mejora del efecto visual de confeti con colores más vibrantes y animaciones mejoradas

## Licencia

Copyright © 2025 CompletDNI. Todos los derechos reservados.
