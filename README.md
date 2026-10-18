# HoneyPacks — Plantilla frontend v1

Primera versión de una plantilla de tienda online basada en la estructura visual, navegación y recorrido de compra de [honeypacks.com](https://honeypacks.com/). Sirve como base para personalizar la interfaz y conectar posteriormente los servicios de una tienda.

La referencia funcional es el informe **«Honeypacks.com · revisión funcional y visual»**, del 15 de octubre de 2026, que documenta las pantallas y los recorridos de visitante y comprador. La v1 es un prototipo frontend con datos locales; no implica una reproducción exacta ni una integración con la tienda original.

## Alcance de la v1

- Portada con promociones, beneficios, reseñas y preguntas frecuentes.
- Catálogo con filtros, ordenación y fichas de producto con distintas plantillas.
- Selección de cantidad y modalidad de compra única o suscripción, según el producto.
- Carrito lateral con persistencia local, recomendaciones, regalos y protección de envío.
- Checkout de demostración con contacto, direcciones, métodos de envío, cupones locales y resumen de importes.
- Páginas de marca, contacto, mayoristas, afiliación y políticas.
- Pantallas de acceso, recuperación de contraseña y gestión de suscripciones.

Los pagos, pedidos, suscripciones, autenticación y envíos de formularios no están conectados a servicios reales. Los precios, reseñas y promociones son contenido de demostración editable.

## Tecnologías

React 18, TypeScript, Vite 5, Tailwind CSS 3, React Router 6, Framer Motion y Lucide React.

## Ejecutar el proyecto

Requisitos: Node.js 20 o superior y npm. Ejecuta los comandos desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

Abre la dirección local que indique Vite en la terminal.

| Comando | Uso |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm run build` | Generar la versión de producción en `dist/`. |
| `npm run preview` | Revisar localmente la compilación de producción. |
| `npm run lint` | Revisar el código con ESLint. |

## Organización

```text
public/          Imágenes y recursos estáticos
src/
  components/    Componentes de tienda, productos, carrito y checkout
  contexts/      Estado compartido del carrito
  data/          Catálogo, textos, promociones y configuración local
  hooks/         Lógica reutilizable de compra, checkout y persistencia
  pages/         Pantallas y páginas informativas
  types/         Tipos de productos, catálogo, carrito y checkout
  utils/         Servicios locales, precios, filtros y validaciones
  App.tsx        Rutas de la aplicación
  index.css      Estilos globales
```

## Personalización e integración

Edita `src/data/` para cambiar productos, navegación, textos, preguntas frecuentes y condiciones de demostración. Los recursos estáticos se encuentran en `public/` y las vistas en `src/pages/` y `src/components/`.

`src/utils/catalogService.ts` centraliza el acceso al catálogo local. `src/utils/checkoutService.ts` contiene las validaciones y los cálculos del checkout. Ambos son puntos de partida para integrar una API; el código contempla una futura conexión con Django REST, que no forma parte de este repositorio.

Al publicar, configura el alojamiento para servir `index.html` en las rutas de la aplicación, ya que la navegación utiliza `BrowserRouter`.

## Referencia y próximos pasos

El informe documenta la navegación, las variantes de fichas de producto, el carrito lateral y el checkout del sitio de referencia. Sus observaciones corresponden a una sesión de escritorio del 15/10/2026; precios, inventario y mensajes comerciales pueden cambiar.

Para evolucionar esta plantilla quedan pendientes la integración del backend, autenticación, pedidos, pagos, suscripciones y formularios, además de la validación visual en distintos dispositivos y la revisión de accesibilidad. Antes de usarla como tienda, revisa los precios, umbrales de envío, garantías, reseñas y políticas: el informe identifica inconsistencias entre esas secciones del sitio de referencia.
