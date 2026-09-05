/* Control Plagas 3D Aranjuez — main.js
   Cabecera, menú móvil, submenú, aparición al hacer scroll y formulario de muestra. */
(() => {
  'use strict';

  const cab = document.querySelector('.cab');
  if (!cab) return;

  /* Sombra de la cabecera al desplazarse */
  const alScroll = () => cab.classList.toggle('cab--scroll', window.scrollY > 8);
  alScroll();
  window.addEventListener('scroll', alScroll, { passive: true });

  /* Menú móvil */
  const botonMenu = cab.querySelector('.cab__menu');
  const cerrarMenu = () => {
    cab.classList.remove('cab--abierta');
    botonMenu.setAttribute('aria-expanded', 'false');
  };
  botonMenu.addEventListener('click', () => {
    const abierta = cab.classList.toggle('cab--abierta');
    botonMenu.setAttribute('aria-expanded', String(abierta));
  });
  cab.querySelectorAll('.cab__nav a').forEach((a) => a.addEventListener('click', cerrarMenu));

  /* Submenú "Servicios" (teclado y táctil; el hover lo resuelve el CSS) */
  const itemSub = cab.querySelector('.cab__item--sub');
  const botonSub = cab.querySelector('.cab__sub-toggle');
  const cerrarSub = () => {
    itemSub.classList.remove('abierto');
    botonSub.setAttribute('aria-expanded', 'false');
  };
  botonSub.addEventListener('click', () => {
    const abierto = itemSub.classList.toggle('abierto');
    botonSub.setAttribute('aria-expanded', String(abierto));
  });
  document.addEventListener('click', (e) => {
    if (!itemSub.contains(e.target)) cerrarSub();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { cerrarSub(); cerrarMenu(); }
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', cerrarMenu);

  /* Aparición al hacer scroll, una sola vez */
  const elementos = document.querySelectorAll('.revela');
  const reducida = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducida || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visto'));
  } else {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('visto');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    elementos.forEach((el) => io.observe(el));
  }

  /* Formulario: prototipo sin envío real. Textos de confirmación de su web actual. */
  const form = document.querySelector('.form');
  if (form) {
    const aviso = form.querySelector('.form__aviso');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      aviso.textContent = 'Gracias por contactarnos. Le responderemos lo antes posible.';
      form.reset();
    });
  }
})();
