/* ==========================================================================
   WAIFUS.JS — CELONOR
   Lógica de animaciones y Text Scramble (Efecto Hacker) para los arquetipos.
   ========================================================================== */

/* 1. FORZAR SCROLL AL INICIO SIEMPRE */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0); // Doble seguro al cargar el DOM
  
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // 2. Animación de Entrada del Hero
  const heroTl = gsap.timeline({ paused: true });
  heroTl
    .from('#waifuTitle', { yPercent: 120, duration: 1.2, ease: 'power4.out' }, 0)
    .from('#waifuDesc', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, 0.2)
    .from('#wHeroImg1', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' }, 0.1)
    .from('#wHeroImg1 img', { scale: 1.3, duration: 1.2, ease: 'expo.out' }, 0.1)
    .from('#wHeroImg2', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' }, 0.3)
    .from('#wHeroImg2 img', { scale: 1.3, duration: 1.2, ease: 'expo.out' }, 0.3);

  if (window.CelonorTransitions) {
    window.CelonorTransitions.onReady(() => heroTl.play());
  } else {
    heroTl.play();
  }

  // 3. Animaciones al scrollear (Manifesto y Grid)
  gsap.from('.w-manifesto__inner > *', {
    scrollTrigger: { trigger: '.waifu-manifesto', start: 'top 80%' },
    y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
  });

  gsap.from('.w-card', {
    scrollTrigger: { trigger: '.waifu-roster', start: 'top 75%' },
    y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
  });

  gsap.from('.matrix-cell', {
    scrollTrigger: { trigger: '.archetype-matrix', start: 'top 80%' },
    y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out'
  });

  // 4. Efecto Text Scramble (Decodificador de Arquetipos)
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
  const matrixCells = document.querySelectorAll('.matrix-cell');

  matrixCells.forEach(cell => {
    const glitchText = cell.querySelector('.matrix-cell__glitch');
    const targetWord = cell.getAttribute('data-word');
    const targetColor = cell.getAttribute('data-color');
    let interval = null;

    cell.addEventListener('mouseenter', () => {
      cell.style.backgroundColor = targetColor;

      let iteration = 0;
      clearInterval(interval);
      
      interval = setInterval(() => {
        glitchText.innerText = targetWord
          .split("")
          .map((letter, index) => {
            if(index < iteration) return targetWord[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
        
        if(iteration >= targetWord.length){
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    });

    cell.addEventListener('mouseleave', () => {
      cell.style.backgroundColor = 'var(--bg-dark)';
      clearInterval(interval);
      glitchText.innerText = "SYSTEM.LOCK";
    });
  });
});