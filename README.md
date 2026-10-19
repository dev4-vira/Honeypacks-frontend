# HoneyPacks — propuesta 1 independiente

Este frontend ejecuta la **propuesta 1 reconstruida** del laboratorio HoneyPacks: la tienda pública basada en la auditoría del 15 de octubre de 2026 y las capturas C01–C39. Rutas desde `/`, sin comparador ni propuestas 2–5. El laboratorio original permanece sin cambios.

Es una reconstrucción de referencia con datos locales, no una integración con la tienda original ni una copia pixel-perfect certificada. Se conservan el diseño, recursos, catálogo y reglas de la propuesta 1, incluidas las suscripciones **cada cuatro semanas**, no por mes calendario.

## Alcance

- Portada con promociones, beneficios, reseñas y preguntas frecuentes.
- Catálogo con filtros, ordenación y fichas de producto con distintas plantillas.
- Selección de cantidad y modalidad de compra única o suscripción, según el producto.
- Carrito lateral con persistencia local, recomendaciones, regalos y protección de envío.
- Checkout demo con contacto, direcciones, envío, facturación alternativa, validación de cupón y resumen. **No hay cupones válidos configurados.**
- Páginas de marca, contacto, mayoristas, afiliación y políticas.
- Pantallas de acceso, recuperación de contraseña y gestión de suscripciones.

Los pagos, pedidos, suscripciones, autenticación y envíos de formularios no están conectados a servicios reales. Los claims, precios, reseñas y promociones archivados se identifican como referencia, no como información comercial verificada. El texto legal incompleto y los vídeos ausentes siguen siendo pendientes explícitos.

## Tecnologías

Se mantienen React 18, React Router DOM 6 y Vite 5 del destino. TypeScript, Lucide y Nunito Sans local. Tailwind CSS 4 mediante `@tailwindcss/vite`, sin Preflight y con prefijo `hp:` para conservar los estilos importados.

La propuesta original utiliza React 19/Router 8: aquí se adaptaron los imports de navegación y `Context.Provider`, sin cambiar el flujo comercial. Se extrajo el diálogo común necesario, sin arrastrar el carrito ni los datos de las otras propuestas.

## Ejecutar el proyecto

Requisitos: Node.js 22.18 o superior y npm. Verificado localmente con Node.js 26.12.0. Desde este directorio:

```bash
npm ci
npm run dev
```

Abre la dirección que indique Vite. Puerto utilizado para la revisión de esta transferencia: `npm run dev -- --host 127.0.0.1 --port 5175 --strictPort`, en `http://localhost:5175/`.

| Comando | Uso |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm run build` | Generar la versión de producción en `dist/`. |
| `npm run preview` | Revisar localmente la compilación de producción. |
| `npm run lint` | Revisar el código con ESLint. |
| `npm run typecheck` | Revisar tipos de la aplicación activa. |
| `npm test` | Cinco pruebas de comercio y checkout, sin servicios externos. |

## Organización

```text
public/assets/   Recursos originales de la propuesta 1 y procedencia
public/licenses/ Licencia de Nunito Sans
src/
  App.tsx        BrowserRouter y entrada a la propuesta 1
  index.tsx      Montaje React y estilos base
  storefront/
    Storefront.tsx  Layout y rutas
    components/    Cabecera/pie, carrito, compra y diálogos
    pages/         Inicio, catálogo, fichas, checkout y soporte
    data/          Diez productos y contenido archivado
    logic/         Comercio, validación y pruebas
    state/         Carrito persistente y checkout en memoria
    services/      Repositorio local de productos
    style.css      Diseño de la propuesta 1
    tailwind.css   Utilidades hp: sin Preflight
tests/browser/   Recorridos Playwright reutilizados y adaptados
```

## Código anterior conservado

Las carpetas originales `src/components`, `contexts`, `data`, `hooks`, `pages`, `types`, `utils`, `src/index.css` y sus cuatro imágenes no se eliminaron. **No se usan ni se compilan como parte de la aplicación activa.** `typecheck` y `lint` verifican las entradas y `src/storefront/`, no ese código anterior.

`tailwind.config.js` y `postcss.config.js` de la plantilla anterior también se conservan como referencia; Vite usa el plugin Tailwind 4 y una configuración PostCSS vacía, no esos plugins antiguos. No se borraron dependencias del código anterior en esta transferencia.

## Reglas e integración

- Honey/Pro Max: $50 cada cuatro semanas inicialmente o $65 única. Beast: $60 única inicialmente / $48 cada cuatro semanas. Shaker White $11.99, sin suscripción.
- Carrito en `honeypacks-storefront-v1`, cantidades 1–20, tres sobres con al menos dos cajas Honey, protección opcional $2.56 inicialmente desactivada y solo inicial. Ground $5 bajo $75/gratis desde $75; express $11.67; impuesto $0 demo.
- Carrito y descarte del popup persisten; checkout, contraseñas y direcciones no se guardan. Sin backend, APIs de comercio, emails ni cargos reales.
- Editar productos en `src/storefront/data/catalog.ts` y reglas en `logic/commerce.ts`. La futura integración reemplazará `services/productRepository.ts`; no existe conexión operativa con Django u otro proveedor.

Al publicar, configura el alojamiento para servir `index.html` en las rutas de la aplicación, ya que la navegación utiliza `BrowserRouter`.

## Verificación de navegador

Con el servidor en 5175 y el CLI gestionado de Playwright disponible:

```bash
mkdir -p evidence/storefront
playwright-cli -s=hp-frontend-transfer open http://localhost:5175/
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/interaction-check.js
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/forms-check.js
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/accessibility-check.js
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/visual-check.js
playwright-cli -s=hp-frontend-transfer close
```

Para comprobar producción: `npm run build` y `npm run preview -- --host 127.0.0.1 --port 4175 --strictPort`; ejecutar `tests/browser/standalone-check.js` en una sesión de prueba. Los scripts usan un perfil de demo, restablecen sus propias claves locales y guardan capturas bajo `evidence/` (ignorado por Git); no usarlos con un perfil personal. La revisión de teclado no equivale a una auditoría WCAG completa.

### Resultado de la transferencia — 19/10/2026

- Build con TypeScript y cinco pruebas de comercio/checkout aprobados.
- ESLint: cero errores y dos advertencias de Fast Refresh por los módulos que exportan componentes y hooks; no se desactivaron las reglas.
- 76 vistas (19 rutas × 1920/768/390/360): sin desbordamiento horizontal, imágenes rotas detectadas ni errores JavaScript; un h1 por página.
- Compra, carrito, filtros, formulario de checkout, formularios públicos, teclado y movimiento reducido verificados en escritorio/móvil.
- Producción comprobada en 4175: rutas profundas, recarga, persistencia, 404 y recursos locales, sin comparador ni peticiones a servicios externos.
- Se completaron las tres imágenes de About Us referenciadas por nombres dinámicos. El laboratorio de origen permanece sin cambios; no se hizo commit ni push.
