# Último Plato

**Prototipo interactivo de una aplicación web para reducir el desperdicio de alimentos.**

Último Plato propone conectar a personas que buscan comida a menor precio con restaurantes que tienen platos preparados excedentes. Los usuarios pueden explorar ofertas, ver detalles y recorrer un flujo de reserva y recojo. La interfaz también incluye un modo de restaurante para visualizar y publicar platos de demostración.

> **Estado del proyecto:** prototipo de interfaz (frontend) con datos simulados. No procesa pagos reales ni registra reservas persistentes. La finalidad de este repositorio es permitir la revisión técnica y la evaluación de la experiencia de usuario.

## Tecnologías

- React 19 y React DOM 19.
- TypeScript.
- Vite 8.
- Tailwind CSS 4.
- Código de interfaz elaborado inicialmente en Figma Make y exportado para su revisión y desarrollo.

## Requisitos

- Node.js compatible con Vite 8 (20.19+ o 22.12+).
- npm.
- Navegador web actualizado.

## Ejecutar el proyecto localmente

Desde la carpeta raíz del repositorio:

```bash
npm install
npm run dev
```

Abrir `http://localhost:8443/` (o la dirección que indique la terminal). El puerto 8443 está configurado en `vite.config.ts`.

### Compilar y comprobar la versión de producción

```bash
npm run build
npm run preview
```

`npm run build` genera la carpeta `dist/`, que no debe subirse al repositorio. `npm run preview` permite revisar localmente lo compilado.

## Guía breve de demostración

1. Completar las pantallas de bienvenida y acceder al inicio.
2. Explorar los platos disponibles y entrar al detalle de un plato.
3. Cambiar la cantidad y pulsar **Reservar**.
4. En la pantalla de pago, elegir un método de demostración, abrir los términos y marcar la aceptación.
5. Pulsar el botón de pago **simulado** para mostrar la confirmación.
6. Ver el QR de muestra y navegar a **Mis pedidos**.
7. Desde el perfil, seleccionar **Soy restaurante** para abrir el panel de restaurante.
8. Probar el flujo de publicación de un plato y la función **Simular QR**.

## Alcance y limitaciones conocidas

- **Datos de ejemplo:** restaurantes, direcciones, precios, estadísticas, perfiles y pedidos están definidos en el frontend; no provienen de una base de datos.
- **Pagos simulados:** Yape, Plin y Tarjeta son opciones visuales; no se realizan cargos ni se conecta una pasarela.
- **Código QR de demostración:** el QR mostrado es un patrón visual, no un identificador validable de una compra real. El escáner permite una simulación manual.
- **Mapa ilustrativo:** la interfaz del mapa y sus ubicaciones son de demostración; no se ha implementado geolocalización en tiempo real.
- **Sin persistencia:** el estado de reservas, platos publicados y otras acciones no se guarda en una base de datos.
- **Filtros:** la selección de categorías cambia el estado visual del filtro, pero el catálogo mostrado todavía no se filtra por categoría.
- **Cantidades:** la cantidad seleccionada en el detalle no se transmite actualmente al resumen del pago; el checkout muestra valores fijos.
- **Acciones no conectadas:** algunos botones informativos y apartados de perfil aún no tienen una acción funcional.

## Estructura principal

```text
.
├── src/
│   ├── App.tsx          # Pantallas, navegación y lógica interactiva
│   ├── main.tsx         # Entrada de React
│   └── index.css        # Estilos globales
├── public/              # Recursos públicos
├── .figma/              # Configuración y utilidades de Figma Make
├── index.html           # Documento de entrada
├── package.json         # Dependencias y comandos
├── vite.config.ts       # Configuración del entorno Vite
└── tsconfig.json        # Configuración TypeScript
```

## Privacidad y seguridad

Este proyecto se entrega para evaluación pública; no deben incorporarse datos personales reales, contraseñas, tokens, claves privadas, archivos `.env`, credenciales de servicios ni información interna de terceros.

El archivo `.gitignore` excluye `node_modules/`, `dist/`, archivos `.env*` y otros archivos generados. Esto evita nuevas incorporaciones por defecto, pero **no elimina archivos sensibles que se hayan confirmado antes**; debe revisarse también el historial de Git.

Las imágenes de ejemplo se cargan desde URLs externas; pueden requerir conexión a Internet.

## Estado de las pruebas

El repositorio no incluye pruebas automatizadas. La revisión del prototipo debe realizarse manualmente siguiendo la Guía breve de demostración incluida en este README. La compilación de producción puede verificarse ejecutando `npm run build`.

## Acceso a la demostración

- **Repositorio y código fuente:** https://github.com/josema393/ultimo-plato
- **Aplicación publicada:** https://ultimo-plato-ldmk.vercel.app

## Objetivo de la evaluación

Recibir comentarios sobre claridad de la propuesta, navegación, diseño adaptable, comprensión del flujo de reserva y calidad/organización del código. Las integraciones reales con servicios externos quedan fuera del alcance actual del prototipo.
