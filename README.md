# HoneyPacks — Plantilla frontend v1

Plantilla de tienda online basada en [honeypacks.com](https://honeypacks.com/), desarrollada con React y TypeScript. Incluye catálogo, carrito, checkout de demostración y cuentas mock para explorar el recorrido del cliente.

Esta primera versión funciona con datos locales y está preparada para una futura integración con un backend. Las suscripciones de demostración tienen una frecuencia de **cuatro semanas**.

## Alcance

- Portada con promociones, beneficios, reseñas y preguntas frecuentes.
- Catálogo con filtros, ordenación y fichas de producto con distintas plantillas.
- Selección de cantidad y modalidad de compra única o suscripción, según el producto.
- Carrito lateral con persistencia local, recomendaciones, regalos y protección de envío.
- Checkout demo con contacto, direcciones, envío, facturación alternativa, validación de cupón y resumen. **No hay cupones válidos configurados.**
- Páginas de marca, contacto, mayoristas, afiliación y políticas.
- Pantallas de acceso, recuperación de contraseña y gestión de suscripciones.

Los pagos, pedidos, suscripciones, autenticación y envíos de formularios no están conectados a servicios reales. Los claims, precios, reseñas y promociones archivados se identifican como referencia, no como información comercial verificada. El texto legal incompleto y los vídeos ausentes siguen siendo pendientes explícitos.

## Cuentas temporales de demostración

En `/account/login` puedes introducir las credenciales o elegir un perfil con los botones de acceso rápido:

| Perfil | Correo | Contraseña |
| --- | --- | --- |
| Cliente con compra única | `customer@example.com` | `HoneyDemo123!` |
| Cliente con suscripción | `subscriber@example.com` | `HoneyDemo123!` |

También se aceptan los usuarios `customer` y `subscriber`. Unas credenciales distintas muestran un error. El panel `/account` requiere una sesión mock y muestra un pedido y una dirección ficticios. Desde el checkout, iniciar sesión devuelve al checkout; «Use demo account details» rellena los datos ficticios sin saltarse las validaciones ni el consentimiento de suscripción.

En `/manage-subscription`, el suscriptor puede pausar, reanudar, omitir la siguiente entrega, cancelar y restablecer la simulación. El perfil cliente muestra el estado sin suscripciones. Los pedidos son ejemplos fijos: completar el checkout no crea pedidos ni nuevas suscripciones.

La sesión y los cambios de suscripción se conservan al recargar mediante `sessionStorage`, en `honeypacks-mock-session-v1`. Solo se guarda el identificador del perfil y el estado simulado; nunca la contraseña ni los campos del checkout. Cerrar sesión elimina ese estado; volver a entrar restablece el escenario inicial. Si el almacenamiento no está disponible, la sesión funciona en memoria. Los perfiles y la contraseña son públicos y solo sirven para navegación: no son un sistema de autenticación real.

## Tecnologías

React 18, TypeScript, React Router DOM 6, Vite 5, Lucide y Nunito Sans local. Tailwind CSS 4 mediante `@tailwindcss/vite`, sin Preflight y con prefijo `hp:`.

## Ejecutar el proyecto

Requisitos: Node.js 22.18 o superior y npm. Desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

Abre la dirección que indique Vite. Para usar el puerto de los scripts de navegador: `npm run dev -- --host 127.0.0.1 --port 5175 --strictPort`.

| Comando | Uso |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm run build` | Generar la versión de producción en `dist/`. |
| `npm run preview` | Revisar localmente la compilación de producción. |
| `npm run lint` | Revisar el código con ESLint. |
| `npm run typecheck` | Revisar tipos de la aplicación activa. |
| `npm test` | Ocho pruebas de comercio, checkout y cuentas mock, sin servicios externos. |

## Organización

```text
public/assets/   Imágenes y recursos de la tienda
public/licenses/ Licencia de Nunito Sans
src/
  App.tsx        BrowserRouter y entrada a la tienda
  index.tsx      Montaje React y estilos base
  storefront/
    Storefront.tsx  Layout y rutas
    components/    Cabecera/pie, carrito, compra y diálogos
    pages/         Inicio, catálogo, fichas, checkout y soporte
    data/          Diez productos y contenido archivado
    logic/         Comercio, validación y pruebas
    state/         Carrito persistente y checkout en memoria
    services/      Repositorio local de productos
    style.css      Estilos de la tienda
    tailwind.css   Utilidades hp: sin Preflight
tests/browser/   Recorridos de prueba con Playwright
```

## Código anterior conservado

Las carpetas originales `src/components`, `contexts`, `data`, `hooks`, `pages`, `types`, `utils`, `src/index.css` y sus cuatro imágenes no se eliminaron. **No se usan ni se compilan como parte de la aplicación activa.** `typecheck` y `lint` verifican las entradas y `src/storefront/`, no ese código anterior.

`tailwind.config.js` y `postcss.config.js` de la plantilla anterior también se conservan como referencia; Vite usa el plugin Tailwind 4 y una configuración PostCSS vacía.

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
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/accounts-check.js
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/accessibility-check.js
playwright-cli --raw -s=hp-frontend-transfer run-code --filename=tests/browser/visual-check.js
playwright-cli -s=hp-frontend-transfer close
```

Para comprobar producción: `npm run build` y `npm run preview -- --host 127.0.0.1 --port 4175 --strictPort`; ejecutar `tests/browser/standalone-check.js` en una sesión de prueba. Los scripts usan un perfil de demo, restablecen sus propias claves locales y guardan capturas bajo `evidence/` (ignorado por Git); no usarlos con un perfil personal. La revisión de teclado no equivale a una auditoría WCAG completa.
