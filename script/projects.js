/**
 * PROJECTS.JS — CELONOR
 * - Carga instantánea de las imágenes top para evitar delays de ScrollTrigger.
 * - Filtro dinámico (Miniseries, Series, Short Films, Movies).
 * - NOTA: El menú y la transición de salida (clic en cualquier enlace) ahora
 *   se manejan 100% desde script/transitions.js (wipe up).
 */

window.addEventListener('pageshow', (e) => {
  if (e.persisted) window.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  initImageFallbacks();
  initCategoryInteractions();
});

// Cuando el telón de entrada (transitions.js) pasa por la mitad, animamos los textos y cartas.
document.addEventListener('celonor:ready', () => {
  const heroTexts = [document.querySelector('.projects-title'), document.querySelector('.projects-intro')].filter(Boolean);
  const categoryItems = document.querySelectorAll('.category-bar__item');

  gsap.fromTo(heroTexts, 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' }
  );
  gsap.fromTo(categoryItems, 
    { y: 18, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
  );

  // Las tarjetas iniciales (Large y Medium) entran de inmediato para evitar que el usuario
  // vea un bloque vacío y tenga que hacer scroll para que aparezcan.
  const largeCards = document.querySelectorAll('.large-card');
  gsap.fromTo(largeCards,
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
  );

  const mediumCards = document.querySelectorAll('.medium-card');
  gsap.fromTo(mediumCards,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.35 }
  );

  // Solo las filas del archivo (que están más abajo) mantienen el ScrollTrigger
  const archiveRows = document.querySelectorAll('.archive-row');
  archiveRows.forEach((row) => {
    gsap.from(row, {
      scrollTrigger: { trigger: row, start: 'top 95%', toggleActions: 'play none none none' },
      y: 14, opacity: 0, duration: 0.45, ease: 'power2.out'
    });
  });
});

/* =========================================================================
   3. MICRO-INTERACCIONES Y FILTRADO DINÁMICO DE CATEGORÍAS
   ========================================================================= */
const CAT_DOT_REST = 0.175;
const CAT_DOT_HOVER = 0.85;
const ARROW_HIDDEN = { opacity: 0, x: -3, y: 3, scale: 0.6 };
const ARROW_SHOWN = { opacity: 1, x: 0, y: 0, scale: 1 };

const HOVER_COLOR_SEQUENCE = [
  'var(--accent-grey)',
  'var(--accent-sage)',
  'var(--accent-mauve)',
  'var(--accent-orange)',
];

function initCategoryInteractions() {
  const categoryItems = document.querySelectorAll('.category-bar__item');
  const featuredGrid = document.querySelector('.featured-grid');
  const mediumGrid = document.querySelector('.medium-grid');
  const archiveSection = document.querySelector('.projects-archive');
  const archiveList = document.querySelector('.archive-list');

  if (!featuredGrid || !mediumGrid || !archiveList) return;

  const initialFeaturedHTML = featuredGrid.innerHTML;
  const initialMediumHTML = mediumGrid.innerHTML;
  const initialArchiveHTML = archiveList.innerHTML;

  const projectsByCategory = extractProjectsFromDOM(featuredGrid, mediumGrid, archiveList);
  let activeCategory = null;

  function setItemState(item, active, duration = 0.4) {
    const dot = item.querySelector('.category-btn__dot');
    const arrow = item.querySelector('.category-btn__arrow');
    gsap.to(dot, { scale: active ? CAT_DOT_HOVER : CAT_DOT_REST, duration, ease: 'power3.out', overwrite: 'auto' });
    if (arrow) {
      gsap.to(arrow, { ...(active ? ARROW_SHOWN : ARROW_HIDDEN), duration, ease: 'power3.out', overwrite: 'auto' });
    }
  }

  function renderInitialView() {
    featuredGrid.innerHTML = initialFeaturedHTML;
    mediumGrid.innerHTML = initialMediumHTML;
    archiveList.innerHTML = initialArchiveHTML;
    if (archiveSection) archiveSection.classList.remove('is-filtered-out');

    initImageFallbacks();

    const allCards = [
      ...featuredGrid.querySelectorAll('.large-card'),
      ...mediumGrid.querySelectorAll('.medium-card'),
      ...archiveList.querySelectorAll('.archive-row'),
    ];

    gsap.fromTo(allCards, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.02, ease: 'power2.out' });
  }

  function renderFilteredCategory(category) {
    const list = projectsByCategory[category] || [];
    if (!list.length) return;

    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const largeProjects = shuffled.slice(0, 2);
    const mediumProjects = shuffled.slice(2, 7);

    featuredGrid.innerHTML = largeProjects.map((proj, idx) => {
      const hoverColor = HOVER_COLOR_SEQUENCE[idx % HOVER_COLOR_SEQUENCE.length];
      return buildLargeCardHTML(proj, hoverColor);
    }).join('');

    mediumGrid.innerHTML = mediumProjects.map((proj, idx) => {
      const hoverColor = HOVER_COLOR_SEQUENCE[idx % HOVER_COLOR_SEQUENCE.length];
      return buildMediumCardHTML(proj, hoverColor);
    }).join('');

    if (archiveSection) archiveSection.classList.add('is-filtered-out');

    initImageFallbacks();

    const newCards = [
      ...featuredGrid.querySelectorAll('.large-card'),
      ...mediumGrid.querySelectorAll('.medium-card'),
    ];

    gsap.fromTo(newCards, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' });
  }

  categoryItems.forEach((item) => {
    const count = item.querySelector('.category-btn__count');

    item.addEventListener('mouseenter', () => {
      setItemState(item, true, 0.4);
      gsap.to(count, { y: -11, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
    });

    item.addEventListener('mouseleave', () => {
      if (item.classList.contains('is-active')) return;
      setItemState(item, false, 0.35);
      gsap.to(count, { y: -10.4, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
    });

    item.addEventListener('click', () => {
      const selectedCat = item.dataset.category;
      if (activeCategory === selectedCat) {
        activeCategory = null;
        categoryItems.forEach((el) => {
          el.classList.remove('is-active');
          setItemState(el, false, 0.35);
        });
        renderInitialView();
      } else {
        activeCategory = selectedCat;
        categoryItems.forEach((el) => {
          const isMatch = el.dataset.category === selectedCat;
          el.classList.toggle('is-active', isMatch);
          setItemState(el, isMatch, 0.35);
        });
        renderFilteredCategory(selectedCat);
      }
      ScrollTrigger.refresh();
    });
  });
}

function extractProjectsFromDOM(featuredGrid, mediumGrid, archiveList) {
  const byCat = { miniseries: [], series: [], cortos: [], peliculas: [] };

  featuredGrid.querySelectorAll('.large-card').forEach((card) => {
    const cat = card.dataset.category;
    if (!byCat[cat]) byCat[cat] = [];
    const imgEl = card.querySelector('.large-card__img');
    byCat[cat].push({
      category: cat,
      categoryLabel: card.querySelector('.large-card__category')?.textContent.trim() || cat.toUpperCase(),
      title: card.querySelector('.large-card__title')?.textContent.trim() || '',
      subtitle: card.querySelector('.large-card__subtitle')?.textContent.trim() || '',
      year: card.querySelector('.year-pill')?.textContent.trim() || '',
      href: card.querySelector('.large-card__link')?.getAttribute('href') || '#',
      img: imgEl ? imgEl.getAttribute('src') : '',
    });
  });

  mediumGrid.querySelectorAll('.medium-card').forEach((card) => {
    const cat = card.dataset.category;
    if (!byCat[cat]) byCat[cat] = [];
    const imgEl = card.querySelector('.medium-card__img');
    byCat[cat].push({
      category: cat,
      categoryLabel: card.querySelector('.medium-card__tag')?.textContent.trim() || cat.toUpperCase(),
      title: card.querySelector('.medium-card__title')?.textContent.trim() || '',
      subtitle: card.querySelector('.medium-card__subtitle')?.textContent.trim() || '',
      year: card.querySelector('.year-pill')?.textContent.trim() || '',
      href: card.querySelector('.medium-card__link')?.getAttribute('href') || '#',
      img: imgEl ? imgEl.getAttribute('src') : '',
    });
  });

  archiveList.querySelectorAll('.archive-row').forEach((row) => {
    const cat = row.dataset.category;
    if (!byCat[cat]) byCat[cat] = [];
    byCat[cat].push({
      category: cat,
      categoryLabel: row.querySelector('.archive-row__category')?.textContent.trim() || cat.toUpperCase(),
      title: row.querySelector('.archive-row__title')?.textContent.trim() || '',
      subtitle: row.querySelector('.archive-row__tagline')?.textContent.trim() || '',
      year: row.querySelector('.year-pill')?.textContent.trim() || '',
      href: row.querySelector('.archive-row__link')?.getAttribute('href') || '#',
      img: row.dataset.img || '', // Usa el data-img de projects.html
    });
  });

  return byCat;
}

function escapeHTML(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildLargeCardHTML(proj, hoverColor) {
  const title = escapeHTML(proj.title);
  const subtitle = escapeHTML(proj.subtitle);
  const categoryLabel = escapeHTML(proj.categoryLabel);
  const year = escapeHTML(proj.year);
  return `
    <article class="large-card" data-category="${proj.category}" style="--hover-bg: ${hoverColor};">
      <a href="${proj.href}" class="large-card__link">
        <header class="large-card__header">
          <h2 class="large-card__title">${title}</h2>
          <p class="large-card__subtitle">${subtitle}</p>
        </header>
        <div class="large-card__media-wrap">
          <div class="large-card__media">
            <img src="${proj.img}" alt="${title}" class="large-card__img" loading="eager" />
            <span class="large-card__center-title" aria-hidden="true">${title}</span>
          </div>
        </div>
        <footer class="large-card__footer">
          <span class="large-card__category">${categoryLabel}</span>
          <span class="year-pill">${year}</span>
        </footer>
      </a>
    </article>
  `;
}

function buildMediumCardHTML(proj, hoverColor) {
  const title = escapeHTML(proj.title);
  const subtitle = escapeHTML(proj.subtitle);
  const categoryLabel = escapeHTML(proj.categoryLabel);
  const year = escapeHTML(proj.year);
  return `
    <article class="medium-card" data-category="${proj.category}" style="--hover-bg: ${hoverColor};">
      <a href="${proj.href}" class="medium-card__link">
        <div class="medium-card__media">
          <img src="${proj.img}" alt="${title}" class="medium-card__img" loading="lazy" />
        </div>
        <div class="medium-card__content">
          <div class="medium-card__meta">
            <span class="year-pill">${year}</span>
            <span class="medium-card__tag">${categoryLabel}</span>
          </div>
          <div class="medium-card__info">
            <h3 class="medium-card__title">${title}</h3>
            <p class="medium-card__subtitle">${subtitle}</p>
          </div>
        </div>
      </a>
    </article>
  `;
}

/* =========================================================================
   5. FALLBACK VISUAL ELEGANTE PARA IMÁGENES
   ========================================================================= */
function initImageFallbacks() {
  const images = document.querySelectorAll('.large-card__img, .medium-card__img');
  const palettes = ['#22272e', '#2d3b32', '#3c2e37', '#4a2c1d'];

  images.forEach((img, idx) => {
    function applyFallback() {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      const title = (img.getAttribute('alt') || 'CELONOR').replace(/&/g, '&amp;');
      const bg = palettes[idx % palettes.length];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="#121212"/></linearGradient></defs>
        <rect width="800" height="800" fill="url(#g)"/>
        <rect x="40" y="40" width="720" height="720" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-size="34" font-weight="500" opacity="0.85">${title}</text>
      </svg>`;
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }
    img.addEventListener('error', applyFallback);
    if (img.complete && img.naturalWidth === 0) applyFallback();
  });
}