/* ============================================================
   CONTROL PLAGAS 3D ARANJUEZ — "LÁMINA"
   El identificador es el hero. Todo es legible sin JavaScript.
   ============================================================ */
(() => {
  'use strict';
  const captura = location.search.includes('ss');
  const quieto  = captura || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  if (captura) document.documentElement.classList.add('captura');

  const cab = $('.cab');
  if (cab) {
    const medir = () => document.documentElement.style
      .setProperty('--cab-h', cab.offsetHeight + 'px');
    medir(); addEventListener('resize', medir, { passive: true });
  }

  /* ---------- Entrada al viewport, y el trazo de los especímenes ---------- */
  const entradas = $$('.entra');
  if (quieto || !('IntersectionObserver' in window)) {
    entradas.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((filas, obs) => {
      filas.forEach(f => {
        if (!f.isIntersecting) return;
        f.target.classList.add('visible', 'dibuja');
        obs.unobserve(f.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    entradas.forEach(el => io.observe(el));
    // Los del hero se dibujan de entrada, escalonados
    requestAnimationFrame(() => $$('.ident__op').forEach((b, i) => {
      b.classList.add('dibuja');
      $('.espec', b).style.animationDelay = (i * 70) + 'ms';
    }));
  }

  /* ============================================================
     EL IDENTIFICADOR
     La primera pregunta real de quien se encuentra un bicho.
     ============================================================ */
  const PLAGAS = {
    cucaracha: {
      nombre: 'Cucaracha', cient: 'Blattella germanica · Periplaneta americana · Blatta orientalis',
      urg: 'alta',
      donde: 'Cocinas y baños, detrás de electrodomésticos, arquetas y patinillos. Buscan calor, humedad y comida.',
      delata: 'Verlas de día. Salen de noche: si aparecen con luz, la colonia ya es grande. También un olor dulzón y manchas oscuras en las juntas.',
      hacer: 'No las aplastes ni uses insecticida de supermercado: las dispersa a otras viviendas. Tapa la comida, seca los fregaderos y llámanos.'
    },
    roedor: {
      nombre: 'Rata o ratón', cient: 'Rattus norvegicus · Mus musculus · Rattus rattus',
      urg: 'alta',
      donde: 'Falsos techos, patinillos, huecos de bajantes, sótanos y cubiertas. Entran por huecos de menos de dos centímetros.',
      delata: 'Excrementos junto al rodapié, roeduras en envases o cableado, y ruido de carrera por el techo de noche.',
      hacer: 'No pongas veneno por tu cuenta: si muere dentro de un tabique, el olor dura semanas. Guarda la comida en botes cerrados y llámanos.'
    },
    chinche: {
      nombre: 'Chinche de cama', cient: 'Cimex lectularius',
      urg: 'alta',
      donde: 'Costuras del colchón, canapé, cabecero, rodapiés y detrás de los enchufes del dormitorio.',
      delata: 'Picaduras en fila de tres o cuatro al despertar, puntitos oscuros en la sábana y manchas de sangre.',
      hacer: 'No cambies de habitación ni saques el colchón: las extiendes por toda la casa. Mete la ropa de cama a 60º y llámanos hoy.'
    },
    hormiga: {
      nombre: 'Hormigas', cient: 'Formicidae',
      urg: 'baja',
      donde: 'Grietas de fachada, juntas de rodapié y bajo el solado. El nido casi nunca está donde las ves.',
      delata: 'Una fila constante hacia una fuente de azúcar o grasa, y montoncitos de tierra fina en las juntas.',
      hacer: 'Limpia el rastro con agua y vinagre para borrar la feromona, pero no mates la fila: nos sirve para encontrar el nido.'
    },
    avispa: {
      nombre: 'Avispas', cient: 'Vespula germanica · Polistes',
      urg: 'media',
      donde: 'Aleros, cajones de persiana, huecos de fachada, falsos techos y setos. En verano el nido crece muy deprisa.',
      delata: 'Entrada y salida constante por un mismo punto. Si ves tráfico continuo, el nido está dentro.',
      hacer: 'No tapones la entrada ni rocíes el nido: provoca el ataque. Cierra esa ventana, aleja a niños y mascotas y llámanos.'
    }
  };
  const URG = { alta: 'Urgente', media: 'No lo dejes', baja: 'Sin prisa' };

  const ops = $$('.ident__op');
  const pinta = clave => {
    const p = PLAGAS[clave]; if (!p) return;
    $('#f-nombre').textContent = p.nombre;
    $('#f-cient').textContent  = p.cient;
    const u = $('#f-urg');
    u.textContent = URG[p.urg]; u.dataset.n = p.urg;
    $('#f-donde').textContent  = p.donde;
    $('#f-delata').textContent = p.delata;
    $('#f-hacer').textContent  = p.hacer;
  };
  ops.forEach(b => b.addEventListener('click', () => {
    ops.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    pinta(b.dataset.plaga);
  }));
  pinta('cucaracha');

  /* ---------- Formulario ---------- */
  const form = $('#form');
  if (form) {
    const foto = $('#foto');
    if (foto) foto.addEventListener('change', () => {
      const f = foto.files && foto.files[0];
      const et = $('label[for="foto"]');
      if (f && et) et.textContent = f.name.length > 20 ? f.name.slice(0, 18) + '…' : f.name;
    });
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      $('#estado').textContent = 'Prototipo: el formulario aún no envía. En producción llega al correo y avisa por WhatsApp.';
    });
  }
})();
