# Catálogo automático — guía desde cero (sin saber nada de GitHub)

## ¿Qué es GitHub, en corto?
Es un sitio donde guardás archivos de código, y desde ahí podés decirle
"corré este programa" gratis en sus servidores. Nosotros lo usamos solo
para que corra el robot que toma las capturas — vos no tenés que
programar nada.

---

## PASO 1: Crear tu cuenta
1. Andá a **github.com**
2. Click en **Sign up** (arriba a la derecha)
3. Poné tu correo, una contraseña, y un nombre de usuario (el que quieras)
4. Confirmá el correo que te llega

## PASO 2: Crear el repositorio (la carpeta del proyecto)
1. Ya adentro, click en el botón verde **New** (o el ícono "+" arriba a la derecha > "New repository")
2. En "Repository name" poné: `catalogo-medias`
3. Dejalo marcado como **Public**
4. Bajá y click en **Create repository**

## PASO 3: Subir los 3 archivos que te di
Vas a subir 3 archivos, y OJO: dos de ellos van dentro de carpetas específicas.
GitHub te deja escribir el nombre de la carpeta al mismo tiempo que subís el archivo.

1. En tu repo recién creado, click en **Add file** > **Upload files**
2. Arrastrá o seleccioná el archivo `generar-catalogo.js`
3. Antes de darle a "Commit", en el nombre del archivo (arriba de la lista) escribí:
   `scripts/generar-catalogo.js` — así GitHub crea la carpeta `scripts` sola
4. Click en **Commit changes**
5. Repetí "Add file > Upload files" con el archivo `generar-catalogo.yml`,
   y nombralo: `.github/workflows/generar-catalogo.yml`
6. Click en **Commit changes**
7. (El `LEEME.md` es solo para vos, no hace falta subirlo, pero si querés tenerlo ahí de recuerdo, dale)

## PASO 4: Correr el catálogo por primera vez
1. Arriba en tu repo, click en la pestaña **Actions**
2. A la izquierda vas a ver "Generar catálogo" — click ahí
3. Click en el botón **Run workflow** (sale un menú desplegable)
4. Rellená:
   - `shop_base`: `https://freakysocks.com.co`
   - `categorias`: `medias-media-cana,compresion,bajitas,regalos`
     (poné aquí los slugs reales de tus 4 categorías, separados por coma, sin espacios)
5. Click en el botón verde **Run workflow**
6. Esperá y refrescá la página — vas a ver un círculo 🟡 amarillo (corriendo) que
   se pone ✅ verde cuando termina (1-3 minutos, dependiendo de cuántas categorías/páginas haya)

## PASO 5: Activar los links para ver las fotos
Esto solo se hace una vez:
1. Click en **Settings** (arriba en el repo)
2. En el menú de la izquierda, click en **Pages**
3. En "Build and deployment" > **Branch**, elegí **gh-pages** (ya debería existir
   después de correr el workflow del Paso 4) y dejá la carpeta en `/ (root)`
4. Click en **Save**
5. Esperá 1 minuto y GitHub te muestra un link arriba tipo:
   `https://TU-USUARIO.github.io/catalogo-medias/`

## PASO 6: Ver y compartir tus fotos
Las imágenes quedan organizadas por categoría, así:
```
https://TU-USUARIO.github.io/catalogo-medias/medias-media-cana/pagina-1.jpg
https://TU-USUARIO.github.io/catalogo-medias/compresion/pagina-1.jpg
https://TU-USUARIO.github.io/catalogo-medias/bajitas/pagina-1.jpg
https://TU-USUARIO.github.io/catalogo-medias/regalos/pagina-1.jpg
```
Abrilos desde el celular (guardás con "mantener presionado > guardar imagen")
y los mandás por WhatsApp.

## Para actualizar el catálogo después (cuando cambian los diseños)
Solo repetís el **PASO 4** — Actions > Generar catálogo > Run workflow.
No hay que tocar nada más, los links del Paso 6 se actualizan solos.

## Notas
- Es gratis: GitHub regala 2.000 minutos al mes de estas corridas, y esto gasta 1-3 minutos.
- El script se detiene solo cuando llega a la última página de cada categoría
  (no hay que contar páginas a mano).
- Si el nombre de una categoría cambia o agregás una nueva, solo cambiás el
  texto de `categorias` la próxima vez que le des "Run workflow" — no hay
  que tocar código.
