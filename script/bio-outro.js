/* ==========================================================================
   FORZAR SCROLL AL INICIO PARA EVITAR BUCLES CON EL BOTÓN ATRÁS
   ========================================================================== */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

(function () {
  'use strict';

  function init() {
    var outro = document.getElementById('scrollOutro');
    var bar = document.getElementById('projectsScrollBar');
    var count = document.getElementById('projectsScrollCount');
    if (!outro || !bar || !count || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    var target = 0;      
    var shown = 0;       
    var rafId = 0;
    var finished = false;
    var armed = false;
    
    // Al final del carrusel de obras volvemos a Projects
    var leaveTarget = 'projects.html';

    function paint(p) {
      bar.style.setProperty('--cx-progress', p.toFixed(4)); 
      count.textContent = String(Math.round(p * 100)); // De 0 a 100
    }

    function triggerLeave() {
      if (finished) return;
      finished = true;
      paint(1);

      setTimeout(() => {
        if (window.CelonorTransitions && typeof window.CelonorTransitions.leave === 'function') {
          window.CelonorTransitions.leave(leaveTarget);
        } else {
          window.location.replace(leaveTarget);
        }
      }, 120);
    }

    function step() {
      rafId = 0;
      shown += (target - shown) * 0.8; // Más rápido y ágil
      
      if (Math.abs(target - shown) < 0.01) {
        shown = target;
      }
      
      paint(shown);

      if (shown >= 0.98 || target >= 0.98) {
        triggerLeave();
        return;
      }

      if (shown !== target) {
        rafId = requestAnimationFrame(step);
      }
    }

    function kick() {
      if (!rafId && !finished) {
        rafId = requestAnimationFrame(step);
      }
    }

    paint(0);

    ScrollTrigger.create({
      trigger: outro,
      start: 'bottom bottom',
      end: '+=400', // Scroll más corto para que se dispare rápido
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        if (finished) return;
        if (!armed) {                             
          if (self.progress >= 0.98) return;
          armed = true;
        }
        target = self.progress;
        kick();
      }
    });
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();