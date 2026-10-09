# Control Plagas 3D Aranjuez — Propuesta de remaquetación de la homepage

Prototipo de homepage para **Control Plagas 3D Aranjuez**, empresa de control de plagas con más de 25 años en Aranjuez.

**Qué es:** la misma home que tienen hoy — sus bloques, en su orden, con sus textos y sus imágenes — remaquetada con sus colores de marca (verde y blanco).
**Qué no es:** no añade secciones ni contenido nuevo. Las mejoras de fondo se recogen aparte, en la propuesta.

**Dirección estética:** *"Hoja"* — la hoja verde de su logo se convierte en la forma de cada foto, tarjeta y botón.

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Fuentes autoalojadas (Sofia Sans Condensed + Figtree) e imágenes en WebP.

## Ver en local
```bash
cd prototype && python3 -m http.server 8000
```

## Publicación
La carpeta `prototype/` se publica en la rama `gh-pages` con `git subtree push --prefix=prototype origin gh-pages`.

## Caducidad
La propuesta se ve 10 días desde su envío, el 6 de septiembre de 2026 (el día de envío cuenta): hasta el **15 de septiembre de 2026 a las 23:59** (hora de Madrid). Desde el 16, `index.html` lleva a `caducada.html`: «No puedes ver esta página porque han pasado más de 10 días desde su envío. Si sigues con interés, escríbeme a jjuradogarciadelrio@gmail.com.» y la home entera en miniatura (`assets/img/home-miniatura.webp`). La fecha está en el primer `<script>` de `index.html` (`Date.UTC(2026, 8, 15, 22, 0)`). Solo caduca en `github.io`: en local se sigue viendo; `?caducada` simula el aviso.

---
Diseño y desarrollo: **Juan Jurado**
