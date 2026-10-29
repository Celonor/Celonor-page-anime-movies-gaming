/**
 * TRANSITIONS.JS — CELONOR
 * Sistema único de transiciones para las páginas secundarias:
 *   projects.html · gaming.html · waifus.html · contact.html · bio.html · character.html
 * NO se carga en index.html (index conserva su propia salida en main.js).
 */
(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;

  var CFG = {
    exitDur: 0.95,
    exitPush: 0.22,
    lettersIn: 0.6,
    stagger: 0.05,
    hold: 0.45,
    lift: 1.1,
    fontWait: 600
  };

  var leaving = false;
  var uiMenu = null;
  var isReady = false;
  var readyQueue = [];

  // Si el usuario vuelve con el botón Atrás del navegador (bfcache), recargamos limpio
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      window.location.reload();
    }
  });

  function resolveLink(el) {
    if (!el || !el.closest) return null;

    var a = el.closest('a[href]');
    if (!a) return null;
    if (a.target && a.target !== '_self') return null;
    if (a.hasAttribute('download')) return null;

    var rawHref = (a.getAttribute('href') || '').trim();
    if (
      !rawHref ||
      rawHref.charAt(0) === '#' ||
      /^mailto:/i.test(rawHref) ||
      /^tel:/i.test(rawHref) ||
      /^javascript:/i.test(rawHref)
    ) {
      return null;
    }

    var url;
    try {
      url = new URL(rawHref, window.location.href);
    } catch (err) {
      return null;
    }

    if (url.origin !== window.location.origin) return null;
    return { a: a, url: url };
  }

  function isSamePage(url) {
    return url.pathname === window.location.pathname && url.search === window.location.search;
  }

  function isIndexUrl(url) {
    return /(^|\/)index\.html?$/i.test(url.pathname) || /\/$/.test(url.pathname);
  }

  function hasModifier(e) {
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  }

  function lockScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
  }

  function go(url) {
    try {
      if (isIndexUrl(url)) {
        sessionStorage.setItem('celonorNav', 'from-projects');
      } else {
        sessionStorage.setItem('celonorNav', 'internal');
      }
    } catch (err) {}
    window.location.href = url.href;
  }

  /* =========================================================================
     ANIMACIÓN DE SALIDA (0.95s, power3.inOut, empuje 22% hacia arriba)
     Idéntica a la salida de index.html en main.js.
     ========================================================================= */
  function leave(targetInput) {
    if (leaving) return;

    var url;
    try {
      url = targetInput instanceof URL ? targetInput : new URL(String(targetInput), window.location.href);
    } catch (err) {
      window.location.href = String(targetInput);
      return;
    }

    leaving = true;
    document.documentElement.classList.add('cx-leaving');
    lockScroll();

    var curtain = document.createElement('div');
    curtain.className = 'cx-exit';
    curtain.setAttribute('aria-hidden', 'true');
    Object.assign(curtain.style, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0d0d0d',
      zIndex: '100000',
      pointerEvents: 'all',
      willChange: 'transform'
    });
    document.body.appendChild(curtain);

    // Forzamos y: 0 y yPercent: 100 para evitar cualquier offset residual en píxeles
    gsap.set(curtain, { y: 0, yPercent: 100 });

    var pushTargets = Array.from(document.body.children).filter(function (child) {
      return (
        child !== curtain &&
        child.id !== 'pageCurtain' &&
        child.tagName !== 'SCRIPT' &&
        child.tagName !== 'STYLE'
      );
    });

    var push = Math.round(window.innerHeight * CFG.exitPush);

    var tl = gsap.timeline({
      onComplete: function () {
        go(url);
      }
    });

    tl.to(
      curtain,
      {
        y: 0,
        yPercent: 0,
        duration: CFG.exitDur,
        ease: 'power3.inOut',
        force3D: true
      },
      0
    );

    if (pushTargets.length) {
      tl.to(
        pushTargets,
        {
          y: -push,
          duration: CFG.exitDur,
          ease: 'power3.inOut',
          force3D: true
        },
        0
      );
    }
  }

  // Interceptamos todos los clics en links internos en fase de captura
  document.addEventListener(
    'click',
    function (e) {
      var info = resolveLink(e.target);
      if (!info) return;

      if (leaving) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (e.defaultPrevented || e.button !== 0 || hasModifier(e)) return;

      if (isSamePage(info.url)) {
        if (uiMenu && uiMenu.isOpen()) {
          if (!info.url.hash) e.preventDefault();
          uiMenu.close();
        }
        return;
      }

      e.preventDefault();
      e.stopImmediatePropagation();
      leave(info.url);
    },
    true
  );

  /* =========================================================================
     MENÚ FULLSCREEN Y TELÓN DE ENTRADA (.cx-arrival / #pageCurtain)
     ========================================================================= */
  function initMenu() {
    var menuBtn = document.getElementById('menuBtn');
    var menuText = document.getElementById('menuText');
    var menuCircle = document.getElementById('menuCircle');
    var menuOverlay = document.getElementById('menuOverlay');
    if (!menuBtn || !menuOverlay) return null;

    var pillHamburgerSpans = gsap.utils.toArray('#pillHamburger span');
    var menuNavLinks = gsap.utils.toArray('.menu-nav__link');
    var menuStaggerBlocks = gsap.utils.toArray('[data-menu-stagger]');
    var menuFeatureCard = document.getElementById('menuFeatureCard');
    var menuGiantChars = gsap.utils.toArray('.menu-giant-char');
    var menuLangBtns = gsap.utils.toArray('.menu-lang-btn');

    var isMenuOpen = false;
    var isMenuAnimating = false;
    var PILL_DUR = 0.55;
    var PILL_EASE = 'power3.inOut';
    var pillTextW = 0;

    function pillOpenTweens(tl, startSize) {
      pillTextW = menuText.getBoundingClientRect().width || pillTextW;
      gsap.set(menuCircle, { width: startSize, height: startSize });
      gsap.set(menuText, { width: pillTextW });
      gsap.set(menuBtn, {
        backgroundColor: 'rgba(22,22,22,1)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)',
        paddingRight: 23.5 - startSize / 2
      });
      tl.to(menuText, { opacity: 0, width: 0, duration: 0.32, ease: 'power2.inOut' }, 0)
        .to(
          menuBtn,
          {
            width: 44,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'rgba(22,22,22,0)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0)',
            duration: PILL_DUR,
            ease: PILL_EASE
          },
          0
        )
        .to(menuCircle, { width: 44, height: 44, duration: PILL_DUR, ease: PILL_EASE }, 0);
    }

    function pillCloseTweens(tl) {
      var textW = pillTextW || menuText.scrollWidth;
      tl.to(menuCircle, { width: 15, height: 15, duration: PILL_DUR, ease: PILL_EASE }, 0)
        .to(
          menuBtn,
          {
            width: 148,
            paddingLeft: 23,
            paddingRight: 16,
            backgroundColor: 'rgba(22,22,22,1)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)',
            duration: PILL_DUR,
            ease: PILL_EASE
          },
          0
        )
        .to(menuText, { width: textW, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.2);
    }

    function pillResetBase() {
      gsap.killTweensOf([menuText, menuCircle]);
      gsap.set(menuText, { clearProps: 'width' });
      gsap.set(menuText, { opacity: 1, x: 0 });
      gsap.set(menuCircle, { clearProps: 'width,height' });
      gsap.set(menuBtn, { clearProps: 'paddingLeft,paddingRight,backgroundColor,boxShadow' });
      gsap.set(menuBtn, { width: 148 });
    }

    gsap.set(menuBtn, { opacity: 0, width: 44, scale: 0.5 });
    gsap.set(menuText, { opacity: 0, x: 10 });
    gsap.set(menuCircle, { opacity: 0, scale: 0 });
    gsap.set(menuOverlay, { yPercent: 100 });
    gsap.set(menuNavLinks, { yPercent: 115, y: 0, opacity: 0 });
    gsap.set(menuStaggerBlocks, { y: 30, opacity: 0 });
    gsap.set(menuFeatureCard, { y: 40, opacity: 0, scale: 0.92 });
    gsap.set(menuGiantChars, { yPercent: 115 });

    function showPill() {
      menuBtn.style.pointerEvents = 'auto';
      gsap.killTweensOf([menuBtn, menuText, menuCircle]);
      gsap
        .timeline()
        .to(menuBtn, { opacity: 1, scale: 1, width: 44, duration: 0.25, ease: 'back.out(1.8)' })
        .to(menuBtn, { width: 148, duration: 0.42, ease: 'power3.inOut' })
        .to(menuText, { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' }, '-=0.22')
        .to(menuCircle, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.25');
    }

    function killMenuTweens() {
      gsap.killTweensOf([
        menuOverlay,
        menuNavLinks,
        menuStaggerBlocks,
        menuFeatureCard,
        menuGiantChars,
        pillHamburgerSpans
      ]);
    }

    function openMenu() {
      if (isMenuOpen || isMenuAnimating) return;
      isMenuOpen = true;
      isMenuAnimating = true;
      var pillStartSize = menuCircle.getBoundingClientRect().width || 15;
      document.body.classList.add('is-menu-open');
      menuOverlay.classList.add('is-open');
      menuBtn.classList.add('is-active');
      menuOverlay.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');

      killMenuTweens();
      gsap.set(menuOverlay, { yPercent: 100 });
      gsap.set(menuNavLinks, { yPercent: 115, y: 0, opacity: 0 });
      gsap.set(menuStaggerBlocks, { y: 32, opacity: 0 });
      gsap.set(menuFeatureCard, { y: 40, opacity: 0, scale: 0.92 });
      gsap.set(menuGiantChars, { yPercent: 115 });

      var openTl = gsap.timeline({
        onComplete: function () {
          isMenuAnimating = false;
        }
      });
      pillOpenTweens(openTl, pillStartSize);
      openTl
        .to(pillHamburgerSpans[0], { y: 2.5, rotate: 45, width: 16, height: 2.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
        .to(pillHamburgerSpans[1], { y: -2.5, rotate: -45, width: 16, height: 2.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
        .to(menuOverlay, { yPercent: 0, duration: 0.82, ease: 'power3.inOut' }, 0)
        .to(menuNavLinks, { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: 'power3.out' }, 0.42)
        .to(menuStaggerBlocks, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, 0.5)
        .to(menuFeatureCard, { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' }, 0.54)
        .to(menuGiantChars, { yPercent: 0, duration: 0.72, stagger: 0.045, ease: 'power4.out' }, 0.46);
    }

    function closeMenu() {
      if (!isMenuOpen || isMenuAnimating) return;
      isMenuAnimating = true;
      killMenuTweens();

      var closeTl = gsap.timeline({
        onComplete: function () {
          isMenuOpen = false;
          isMenuAnimating = false;
          menuOverlay.classList.remove('is-open');
          menuBtn.classList.remove('is-active');
          menuOverlay.setAttribute('aria-hidden', 'true');
          menuBtn.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('is-menu-open');
          gsap.set(menuOverlay, { yPercent: 100 });
          pillResetBase();
        }
      });

      pillCloseTweens(closeTl);
      closeTl
        .to(pillHamburgerSpans[0], { y: 0, rotate: 0, width: 9, height: 1.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
        .to(pillHamburgerSpans[1], { y: 0, rotate: 0, width: 6, height: 1.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
        .to([menuNavLinks, menuStaggerBlocks, menuFeatureCard], { opacity: 0, y: -15, duration: 0.25, ease: 'power2.in' }, 0)
        .to(menuGiantChars, { yPercent: 115, duration: 0.35, stagger: 0.02, ease: 'power2.in' }, 0)
        .to(menuOverlay, { yPercent: 100, duration: 0.72, ease: 'power3.inOut' }, 0.12);
    }

    menuBtn.addEventListener('click', function () {
      if (isMenuOpen) closeMenu();
      else openMenu();
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen) closeMenu();
    });

    menuLangBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.reload();
      });
    });

    ['wheel', 'touchmove'].forEach(function (evt) {
      menuOverlay.addEventListener(
        evt,
        function (e) {
          if (isMenuOpen) e.preventDefault();
        },
        { passive: false }
      );
    });

    return {
      showPill: showPill,
      isOpen: function () {
        return isMenuOpen;
      },
      close: closeMenu
    };
  }

  function initLogo() {
    var logo = document.getElementById('smallAkaruLogo');
    var chars = gsap.utils.toArray('.small-char');
    if (!logo || !chars.length) return null;
    gsap.set(chars, { yPercent: 125, y: 0, opacity: 0 });
    return function showLogo() {
      logo.style.pointerEvents = 'auto';
      gsap.to(chars, {
        yPercent: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: { each: 0.045, from: 'end' },
        overwrite: true
      });
    };
  }

  function markReady() {
    if (isReady) return;
    isReady = true;
    document.documentElement.classList.add('cx-ready');
    document.dispatchEvent(new CustomEvent('celonor:ready'));
    readyQueue.splice(0).forEach(function (fn) {
      fn();
    });
  }

  function playArrival(showLogo, menu) {
    var curtain = document.getElementById('pageCurtain');
    function reveal() {
      if (showLogo) showLogo();
      if (menu) menu.showPill();
      markReady();
    }
    if (!curtain) {
      reveal();
      return;
    }
    var chars = curtain.querySelectorAll('.cx-char');
    gsap.set(curtain, { y: 0, yPercent: 0 });

    gsap
      .timeline({
        onComplete: function () {
          curtain.remove();
        }
      })
      .fromTo(chars, { yPercent: 120 }, { yPercent: 0, duration: CFG.lettersIn, stagger: CFG.stagger, ease: 'back.out(1.6)' }, 0)
      .to(chars, { yPercent: -120, duration: 0.35, stagger: 0.025, ease: 'power3.in' }, '+=' + CFG.hold)
      .to(curtain, { yPercent: -100, duration: CFG.lift, ease: 'power4.inOut' }, '<+0.12')
      .add(reveal, '-=0.45');
  }

  function boot() {
    if (document.body.getAttribute('data-page') === 'index') return;
    if (document.body.hasAttribute('data-cx-menu')) uiMenu = initMenu();
    var showLogo = initLogo();
    var fontReady =
      document.fonts && document.fonts.load
        ? document.fonts.load('700 1em Antonio').catch(function () {})
        : Promise.resolve();
    var timeout = new Promise(function (res) {
      setTimeout(res, CFG.fontWait);
    });
    Promise.race([fontReady, timeout]).then(function () {
      playArrival(showLogo, uiMenu);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('load', function () {
    var logo = document.querySelector('#siteFooter .contact-giant-logo');
    if (!logo || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      logo,
      { yPercent: 38 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#siteFooter',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          refreshPriority: -1
        }
      }
    );
  });

  window.CelonorTransitions = {
    leave: function (href) {
      leave(href);
    },
    onReady: function (fn) {
      if (isReady) fn();
      else readyQueue.push(fn);
    },
    isLeaving: function () {
      return leaving;
    }
  };
})();