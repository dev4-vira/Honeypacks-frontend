# Propuesta 1 — HoneyPacks Storefront independiente

Reconstrucción de las 18 pantallas/estados públicos solicitados a partir de `informe.pdf` y C01–C39. No es el concepto inicial simplificado. Incluye catálogo de diez productos, carrito lateral, checkout sin pago y páginas de soporte; no incluye administración ni áreas autenticadas no observadas.

## Acceso y organización

- Aplicación principal: `npm run dev`, rutas desde `/`, sin comparador ni contexto comercial de 2–5.
- Producción: `npm run build`, salida `dist/`. El servidor estático debe resolver las rutas desconocidas a `index.html`.
- `Storefront.tsx`: layout y rutas React Router DOM 6, con un único BrowserRouter en `src/App.tsx`.
- Adaptado al React 18 del destino mediante `Context.Provider`; diálogo extraído a `components/Modal.tsx`. Sin dependencias del laboratorio.
- `pages/`: inicio, catálogo, productos, checkout, cuenta, información y programas.
- `components/`: cabecera/pie/popup, galería y bloques comerciales, carrito, formularios y navegación.
- `data/catalog.ts`: diez productos, imágenes, descripciones, modalidades y referencias de valoración.
- `services/productRepository.ts`: contrato de lectura y repositorio local. Una futura API deberá sustituir este límite y añadir carga/error asíncronos; no hay llamadas a Django ni a otro proveedor.
- `logic/commerce.ts`, `logic/checkout.ts`: dinero en centavos, filtros, restauración validada y validación del checkout.
- `state/`: carrito central persistente; datos de checkout solamente en memoria.

## Reglas y límites explícitos

Honey/Pro Max: $50 cada cuatro semanas, seleccionado inicialmente, o $65 única. Beast: $60 única inicialmente / $48 cada cuatro semanas. Shaker: $11.99 sin suscripción. Reglas de demo, no tarifas actuales garantizadas.

Carrito independiente en `honeypacks-storefront-v1`: cantidad 1–20 por línea, protección opcional $2.56 inicialmente desactivada, envío ground $5 bajo $75 / gratis desde $75 y express $11.67. Tres sobres de regalo con al menos dos cajas Honey; sin acumulación por caja. Los otros regalos mostrados son previews identificados. La protección no se renueva. No hay cupones válidos configurados ni el popup genera uno.

No se importan las muestras 2–5 ni sus contratos de mes calendario. El carrito se conserva al navegar/recargar; el borrador de modalidad/cantidad de una ficha sin añadir es local a esa ficha.

Fuente local Nunito Sans como aproximación visual, sin afirmar que sea la fuente exacta del sitio. CSS aislado bajo `.p1`; Tailwind sin Preflight y con prefijo `hp:`. Recursos adicionales y procedencia en `public/assets/storefront/sources.json`; licencia tipográfica en `public/licenses/nunito-sans.txt`.

Checkout, login, recuperación, portal, contacto, mayoristas, newsletter y afiliación validan localmente. Sin autenticación, email, registro, tarjeta editable, pedido ni cargo. Los textos legales incompletos y las afirmaciones comerciales archivadas se identifican como tales. Devoluciones siempre a 30 días para productos nuevos/sin abrir.

Comandos, preservación de la plantilla anterior y verificación reproducible: [README principal](../../README.md). Scripts en `tests/browser/`; pruebas de comercio en `logic/commerce.test.ts`.
