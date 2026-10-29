if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const introTl = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: true });

  introTl
    .from('.circle-blue', { scale: 0.6, opacity: 0, duration: 1.4 }, 0)
    .from('.circle-orange', { scale: 0.6, opacity: 0, duration: 1.4 }, 0.15)
    .from('.hero-line', { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, 0.1)
    .from('.hero-title', { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.25)
    .from(['.hero-sub-right', '.hero-sub-left', '.hero-paragraph'], { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, 0.55);

  // El Hero arranca después del telón de transitions.js
  if (window.CelonorTransitions) {
    window.CelonorTransitions.onReady(() => introTl.play());
  } else {
    introTl.play();
  }

  gsap.to('.circle-blue', {
    yPercent: -18,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.to('.circle-orange', {
    yPercent: -30,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.from('.skill-col', {
    y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: '.skills-section', start: 'top 75%' }
  });

  gsap.to('#rouletteTrack', {
    xPercent: -50, ease: 'none', duration: 28, repeat: -1
  });

  gsap.set('.roller-up', { yPercent: 0 });
  gsap.set('.roller-main', { yPercent: -66.66 });
  gsap.set('.roller-down', { yPercent: 0 });

  gsap.timeline({ scrollTrigger: { trigger: '.manifesto-section', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    .to('.roller-up', { yPercent: -66.66, ease: 'none' }, 0)
    .to('.roller-main', { yPercent: -33.33, ease: 'none' }, 0)
    .to('.roller-down', { yPercent: -66.66, ease: 'none' }, 0);

  const upcomingSlides = gsap.utils.toArray('.exp-slide:not(.slide-1)');

  upcomingSlides.forEach((slide) => {
    const imgContainer = slide.querySelector('.exp-img-container');
    gsap.set(slide, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(imgContainer, { scale: 0.55 });
  });

  const expertiseTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#expertiseSection',
      start: 'top top',
      end: () => `+=${upcomingSlides.length * 100}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }
  });

  upcomingSlides.forEach((slide) => {
    const imgContainer = slide.querySelector('.exp-img-container');
    expertiseTl
      .to(slide, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 })
      .to(imgContainer, { scale: 1, ease: 'power2.out', duration: 1 }, '<'); 
  });
});