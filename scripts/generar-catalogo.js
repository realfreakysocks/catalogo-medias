// Script que abre tu tienda en un navegador real (Chromium),
// espera a que la página cargue COMPLETAMENTE (networkidle),
// hace scroll para disparar imágenes con lazy-load,
// y captura cada página de cada categoría hasta que ya no hay más
// (se detiene solo cuando la categoría devuelve un error 404).

const { chromium } = require('playwright');
const fs = require('fs');

const SHOP_BASE   = process.env.SHOP_BASE;    // ej: https://freakysocks.com.co
const CATEGORIAS  = (process.env.CATEGORIAS || '').split(',').map(c => c.trim()).filter(Boolean);
const ANCHO_VENTANA = parseInt(process.env.ANCHO_VENTANA || '1440', 10); // "modo escritorio"
const ALTO_VENTANA  = parseInt(process.env.ALTO_VENTANA || '900', 10);
const MAX_PAGINAS   = 30; // límite de seguridad, no debería llegar ni cerca

if (!SHOP_BASE || CATEGORIAS.length === 0) {
  console.error('Faltan SHOP_BASE o CATEGORIAS.');
  process.exit(1);
}

async function scrollCompleto(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distancia = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distancia);
        total += distancia;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: ANCHO_VENTANA, height: ALTO_VENTANA } });

  for (const categoria of CATEGORIAS) {
    const carpeta = `capturas/${categoria}`;
    fs.mkdirSync(carpeta, { recursive: true });

    console.log(`\n=== Categoría: ${categoria} ===`);

    for (let i = 1; i <= MAX_PAGINAS; i++) {
      // La página 1 no lleva "/page/1/" (patrón estándar de WordPress/WooCommerce),
      // desde la página 2 en adelante sí se agrega "/page/N/".
      const url = i === 1
        ? `${SHOP_BASE.replace(/\/$/, '')}/categoria-producto/${categoria}/`
        : `${SHOP_BASE.replace(/\/$/, '')}/categoria-producto/${categoria}/page/${i}/`;
      console.log(`Capturando página ${i}: ${url}`);

      let response;
      try {
        response = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
      } catch (err) {
        console.log(`No se pudo cargar (${err.message}). Fin de esta categoría.`);
        break;
      }

      if (!response || response.status() === 404) {
        console.log('Página no existe (404). Fin de esta categoría.');
        break;
      }

      // Espera extra a que terminen de cargar imágenes de producto,
      // sin depender de que la red quede 100% quieta.
      await page.waitForTimeout(2500);

      // Si la página no tiene ni un producto, ya llegamos al final de esta
      // categoría (muchos temas de WordPress no dan 404, solo muestran vacío).
      const cantidadProductos = await page
        .$$eval('ul.products li.product, .products .product', (els) => els.length)
        .catch(() => 0);

      if (cantidadProductos === 0) {
        console.log('No hay productos en esta página. Fin de esta categoría.');
        break;
      }

      await scrollCompleto(page);
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: `${carpeta}/pagina-${i}.jpg`,
        fullPage: true,
        quality: 85,
        type: 'jpeg',
      });
    }
  }

  await browser.close();
  console.log('\nListo. Todas las capturas están en la carpeta /capturas, organizadas por categoría.');
})();
