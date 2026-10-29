if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
window.addEventListener("pageshow", (e) => {
  if (e.persisted) window.location.reload();
});
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

gsap.registerPlugin(ScrollTrigger);

function splitTextIntoChars(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    if (window.SplitText) {
      new SplitText(el, { type: "chars", charsClass: "char" });
    } else {
      const text = el.textContent.trim();
      el.innerHTML = "";
      [...text].forEach((letter) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = letter === " " ? "\u00A0" : letter;
        el.appendChild(span);
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  splitTextIntoChars('[data-split="chars"]');

  const cards = gsap.utils.toArray(".project-card");
  const cardData = cards.map((card) => ({
    card,
    imgWrap: card.querySelector(".project-card__image-wrap"),
    chars: card.querySelectorAll(".project-card__title .char"),
    metaItems: card.querySelectorAll(".meta-item"),
    footer: card.querySelector(".project-card__footer"),
    indexEl: card.querySelector(".project-card__index"),
    btn: card.querySelector(".project-card__btn"),
    revealed: false,
  }));

  cardData.forEach(({ chars, metaItems, btn, indexEl }) => {
    gsap.set(chars, { yPercent: 125, y: 0, opacity: 0 });
    gsap.set(metaItems, { yPercent: 125, y: 0, opacity: 0 });
    gsap.set(btn, {
      opacity: 0,
      scale: 0.85,
      visibility: "hidden",
      pointerEvents: "none",
    });
    gsap.set(indexEl, { opacity: 1, visibility: "visible" });
  });

  const verticalReelTrack = document.getElementById("verticalReelTrack");
  const reelItemsGroup = document.getElementById("reelItemsGroup");
  const editorialTitleChars = gsap.utils.toArray("#editorialProjectsTitle .char");
  const editorialLines = gsap.utils.toArray(".editorial-line");
  const editorialNums = gsap.utils.toArray(".editorial-num");
  const editorialCats = gsap.utils.toArray(".editorial-cat");
  const editorialParagraph = document.getElementById("editorialParagraph");

  const awardsSection = document.getElementById("awardsSection");
  const awardsScrollTrack = document.getElementById("awardsScrollTrack");
  const awardsHeroImageWrap = document.getElementById("awardsHeroImageWrap");
  const awardsHeroImg = document.getElementById("awardsHeroImg");
  const awardsRevealItems = gsap.utils.toArray("[data-awards-reveal]");

  const expertiseSection = document.getElementById("expertiseSection");
  const expertiseTitleChars = gsap.utils.toArray("#expertiseMainTitle .char");
  const expSlides = gsap.utils.toArray(".expertise-slide");
  const expImgWraps = expSlides.map((s) => s.querySelector(".expertise-slide__img-wrap"));
  const expImgs = expSlides.map((s) => s.querySelector(".expertise-slide__img"));
  const expTextItems = gsap.utils.toArray(".expertise-text-item");
  const expStepLabels = gsap.utils.toArray(".exp-step__label");
  const expertiseProgressBar = document.getElementById("expertiseProgressBar");

  const EXP_THUMB = { x: "-41.8vw", y: "6vh", scale: 0.36 };
  const EXP_STRIP = { x: "-42.5vw", y: "9vh", scale: 0.14 };
  const EXP_EXIT_SCALE = 0.86;

  const aboutSection = document.getElementById("aboutSection");
  const aboutScrollTrack = document.getElementById("aboutScrollTrack");
  const aboutTitleChars = gsap.utils.toArray("#aboutMainTitle .char");
  const aboutRevealItems = gsap.utils.toArray("[data-about-reveal]");
  const aboutImages = gsap.utils.toArray(".about-img");

  const contactSection = document.getElementById("contactSection");
  const contactScrollTrack = document.getElementById("contactScrollTrack");
  const contactRevealItems = gsap.utils.toArray("[data-contact-reveal]");
  const contactGiantLogo = document.getElementById("contactGiantLogo");
  const contactTitleMask = document.querySelector(".contact-title").closest(".contact-reveal-mask");

  gsap.set(editorialTitleChars, { yPercent: 125, y: 0, opacity: 0 });
  gsap.set(editorialLines, { scaleX: 0, transformOrigin: "left center" });
  gsap.set([editorialNums, editorialCats], { yPercent: 125, y: 0, opacity: 0 });
  gsap.set(editorialParagraph, { yPercent: 125, opacity: 0 });

  gsap.set(awardsSection, { xPercent: 100 });
  gsap.set(awardsScrollTrack, { y: 0 });
  gsap.set(awardsHeroImageWrap, {
    xPercent: 120, x: 0, scale: 1.7, transformOrigin: "center center",
  });
  gsap.set(awardsHeroImg, { scale: 1.7, transformOrigin: "center center" });
  gsap.set(awardsRevealItems, { yPercent: 30, opacity: 0 });

  gsap.set(expertiseSection, { yPercent: 100 });
  gsap.set(expertiseTitleChars, { yPercent: 120, opacity: 0 });
  gsap.set(expertiseProgressBar, { scaleX: 0.2, transformOrigin: "left center" });

  gsap.set(expSlides[0], { xPercent: 0 });
  gsap.set(expSlides[1], { xPercent: 78 });
  gsap.set(expSlides[2], { xPercent: 94.5 });
  gsap.set(expSlides[3], { xPercent: 100 });
  gsap.set(expSlides[4], { xPercent: 100 });

  gsap.set(expImgWraps[0], { x: "0vw", y: "0vh", scale: 1 });
  gsap.set(expImgs[0], { scale: 1 });
  gsap.set(expImgWraps[1], { ...EXP_THUMB });
  gsap.set(expImgs[1], { scale: 1.08 });
  gsap.set(expImgWraps[2], { ...EXP_STRIP });
  gsap.set(expImgs[2], { scale: 1.08 });
  gsap.set(expImgWraps[3], { ...EXP_STRIP });
  gsap.set(expImgs[3], { scale: 1.08 });
  gsap.set(expImgWraps[4], { ...EXP_STRIP });
  gsap.set(expImgs[4], { scale: 1.08 });

  expTextItems.forEach((item, idx) => {
    const els = item.querySelectorAll(".expertise-item__title, .expertise-item__tags");
    if (idx === 0) gsap.set(els, { yPercent: 0, opacity: 1 });
    else gsap.set(els, { yPercent: 120, opacity: 0 });
  });

  expStepLabels.forEach((label, idx) => {
    if (idx === 0) gsap.set(label, { yPercent: 0, opacity: 1 });
    else gsap.set(label, { yPercent: 120, opacity: 0 });
  });

  gsap.set(aboutSection, { yPercent: 100 });
  gsap.set(aboutScrollTrack, { y: 0 });
  gsap.set(aboutTitleChars, { yPercent: 120, opacity: 0 });
  gsap.set(aboutRevealItems, { yPercent: 40, opacity: 0 });

  gsap.set(contactSection, { yPercent: 100 });
  gsap.set(contactScrollTrack, { y: 0 });
  gsap.set(contactRevealItems, { yPercent: 35, opacity: 0 });
  gsap.set(contactGiantLogo, { yPercent: 38 });

  const smallLogo = document.getElementById("smallAkaruLogo");
  const smallChars = gsap.utils.toArray(".small-char");
  const menuBtn = document.getElementById("menuBtn");
  const menuText = document.getElementById("menuText");
  const menuCircle = document.getElementById("menuCircle");

  gsap.set(smallChars, { yPercent: 125, y: 0, opacity: 0 });
  gsap.set(menuBtn, { opacity: 0, width: 44, scale: 0.5 });
  gsap.set(menuText, { opacity: 0, x: 10 });
  gsap.set(menuCircle, { opacity: 0, scale: 0 });

  const preloaderEl = document.getElementById("preloader");
  const preloaderLogo = document.getElementById("preloaderLogo");
  const preloaderChars = gsap.utils.toArray(".preloader-char");
  let isPreloaderRunning = false;
  let silentRevealTl = null;

  function playPreloader(onCovered, { silent = false } = {}) {
    if (isPreloaderRunning) return;
    isPreloaderRunning = true;
    gsap.killTweensOf([preloaderEl, preloaderLogo, preloaderChars]);

    preloaderEl.style.display = "flex";
    gsap.set(preloaderEl, { yPercent: 0 });
    gsap.set(preloaderLogo, { scale: 0.96, autoAlpha: silent ? 0 : 1 });
    gsap.set(preloaderChars, { yPercent: 120, rotateZ: 5, opacity: 0 });

    if (typeof onCovered === "function") onCovered();

    const tl = gsap.timeline({
      paused: silent,
      onComplete: () => {
        preloaderEl.style.display = "none";
        isPreloaderRunning = false;
      },
    });

    if (silent) {
      tl.to(preloaderEl, { yPercent: -100, duration: 0.95, ease: "expo.inOut", force3D: true }, 0);
      silentRevealTl = tl;
      return;
    }

    tl.to(preloaderChars, {
      yPercent: 0, rotateZ: 0, opacity: 1, duration: 0.68, stagger: 0.055, ease: "power4.out",
    })
    .to(preloaderLogo, { scale: 1.03, duration: 0.45, ease: "sine.inOut" }, "-=0.25")
    .to(preloaderChars, {
      yPercent: -15, opacity: 0.9, duration: 0.35, stagger: 0.02, ease: "power2.in", delay: 0.12,
    })
    .to(preloaderEl, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.25");
  }

  const arrivedFromProjects = sessionStorage.getItem("celonorNav") === "from-projects";
  const pendingNavTarget = sessionStorage.getItem("celonorTarget");
  sessionStorage.removeItem("celonorNav");
  sessionStorage.removeItem("celonorTarget");
  playPreloader(null, { silent: arrivedFromProjects });

  function revealProjectText(index) {
    const item = cardData[index];
    if (item.revealed) return;
    item.revealed = true;
    gsap.killTweensOf([item.chars, item.metaItems, item.btn, item.indexEl, item.footer]);

    if (index === 2 && item.footer && !kirikoFooterHiddenForReel) {
      item.footer.classList.remove("is-reel-hidden");
      gsap.set([item.footer, item.indexEl], { opacity: 1, visibility: "visible" });
    }
    gsap.to(item.chars, { yPercent: 0, y: 0, opacity: 1, duration: 0.6, stagger: 0.045, ease: "sine.out", overwrite: true });
    gsap.to(item.metaItems, { yPercent: 0, y: 0, opacity: 1, duration: 0.55, ease: "sine.out", overwrite: true });

    if (index !== 2 || !kirikoFooterHiddenForReel) {
      gsap.set(item.btn, { visibility: "visible", pointerEvents: "auto" });
      gsap.to(item.btn, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out", overwrite: true });
    }
  }

  function hideProjectTextDrop(index) {
    const item = cardData[index];
    if (!item.revealed) return;
    item.revealed = false;
    gsap.killTweensOf([item.chars, item.metaItems, item.btn, item.indexEl, item.footer]);
    gsap.to([item.chars, item.metaItems], { yPercent: 125, y: 0, opacity: 0, duration: 0.32, stagger: 0, ease: "power2.in", overwrite: true });
    gsap.to(item.btn, {
      opacity: 0, scale: 0.85, duration: 0.25, ease: "power2.in", overwrite: true,
      onComplete: () => { if (!item.revealed) gsap.set(item.btn, { visibility: "hidden", pointerEvents: "none" }); },
    });
  }

  let kirikoFooterHiddenForReel = false;
  function setKirikoFooterReelHidden(shouldHide) {
    if (kirikoFooterHiddenForReel === shouldHide) return;
    kirikoFooterHiddenForReel = shouldHide;
    const kItem = cardData[2];
    gsap.killTweensOf([kItem.footer, kItem.indexEl, kItem.btn]);

    if (shouldHide) {
      kItem.footer.classList.add("is-reel-hidden");
      gsap.set([kItem.footer, kItem.indexEl, kItem.btn], { opacity: 0, visibility: "hidden", pointerEvents: "none" });
    } else {
      kItem.footer.classList.remove("is-reel-hidden");
      gsap.set([kItem.footer, kItem.indexEl], { opacity: 1, visibility: "visible" });
      if (kItem.revealed) {
        gsap.set(kItem.btn, { opacity: 1, scale: 1, visibility: "visible", pointerEvents: "auto" });
      }
    }
  }

  let editorialHeadingRevealed = false;
  function revealEditorialContent() {
    if (editorialHeadingRevealed) return;
    editorialHeadingRevealed = true;
    gsap.killTweensOf([editorialTitleChars, editorialNums, editorialCats, editorialParagraph]);
    gsap.to(editorialTitleChars, { yPercent: 0, y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "sine.out", overwrite: true });
    gsap.to(editorialNums, { yPercent: 0, y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out", overwrite: true });
    gsap.to(editorialCats, { yPercent: 0, y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out", overwrite: true });
    gsap.to(editorialParagraph, { yPercent: 0, opacity: 1, duration: 0.65, ease: "power3.out", overwrite: true });
  }

  function hideEditorialContent() {
    if (!editorialHeadingRevealed) return;
    editorialHeadingRevealed = false;
    gsap.killTweensOf([editorialTitleChars, editorialNums, editorialCats, editorialParagraph]);
    gsap.to(editorialTitleChars, { yPercent: 125, y: 0, opacity: 0, duration: 0.3, stagger: 0, ease: "power2.in", overwrite: true });
    gsap.to([editorialNums, editorialCats], { yPercent: 125, y: 0, opacity: 0, duration: 0.3, stagger: 0, ease: "power2.in", overwrite: true });
    gsap.to(editorialParagraph, { yPercent: 125, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
  }

  let awardsHeaderRevealed = false;
  function revealAwardsHeader() {
    if (awardsHeaderRevealed) return;
    awardsHeaderRevealed = true;
    gsap.killTweensOf(awardsRevealItems);
    gsap.to(awardsRevealItems, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", overwrite: true });
  }
  function hideAwardsHeader() {
    if (!awardsHeaderRevealed) return;
    awardsHeaderRevealed = false;
    gsap.killTweensOf(awardsRevealItems);
    gsap.to(awardsRevealItems, { yPercent: 30, opacity: 0, duration: 0.32, stagger: 0, ease: "power2.in", overwrite: true });
  }

  let expertiseTitleRevealed = false;
  function revealExpertiseTitle() {
    if (expertiseTitleRevealed) return;
    expertiseTitleRevealed = true;
    gsap.killTweensOf(expertiseTitleChars);
    gsap.to(expertiseTitleChars, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.035, ease: "power3.out", overwrite: true });
  }
  function hideExpertiseTitle() {
    if (!expertiseTitleRevealed) return;
    expertiseTitleRevealed = false;
    gsap.killTweensOf(expertiseTitleChars);
    gsap.to(expertiseTitleChars, { yPercent: 120, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
  }

  let currentExpertiseIndex = 0;
  function setActiveExpertiseSlide(activeIndex) {
    if (currentExpertiseIndex === activeIndex) return;
    currentExpertiseIndex = activeIndex;
    expTextItems.forEach((item, idx) => {
      const els = item.querySelectorAll(".expertise-item__title, .expertise-item__tags");
      gsap.killTweensOf(els);
      if (idx === activeIndex) {
        item.classList.add("is-active");
        gsap.fromTo(els, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.06, ease: "power3.out", overwrite: true });
      } else {
        item.classList.remove("is-active");
        gsap.to(els, { yPercent: -110, opacity: 0, duration: 0.28, ease: "power2.in", overwrite: true });
      }
    });
    expStepLabels.forEach((label, idx) => {
      gsap.killTweensOf(label);
      if (idx <= activeIndex) {
        gsap.to(label, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out", overwrite: true });
      } else {
        gsap.to(label, { yPercent: 120, opacity: 0, duration: 0.25, ease: "power2.in", overwrite: true });
      }
    });
  }

  let aboutHeaderRevealed = false;
  function revealAboutHeader() {
    if (aboutHeaderRevealed) return;
    aboutHeaderRevealed = true;
    gsap.killTweensOf([aboutTitleChars, aboutRevealItems]);
    gsap.to(aboutTitleChars, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out", overwrite: true });
    gsap.to(aboutRevealItems, { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power3.out", overwrite: true });
  }
  function hideAboutHeader() {
    if (!aboutHeaderRevealed) return;
    aboutHeaderRevealed = false;
    gsap.killTweensOf([aboutTitleChars, aboutRevealItems]);
    gsap.to([aboutTitleChars, aboutRevealItems], { yPercent: 120, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
  }

  let contactHeaderRevealed = false;
  function revealContactHeader() {
    if (contactHeaderRevealed) return;
    contactHeaderRevealed = true;
    gsap.killTweensOf(contactRevealItems);
    gsap.to(contactRevealItems, { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out", overwrite: true });
  }
  function hideContactHeader() {
    if (!contactHeaderRevealed) return;
    contactHeaderRevealed = false;
    gsap.killTweensOf(contactRevealItems);
    gsap.to(contactRevealItems, { yPercent: 35, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
  }

  let headerUIActive = false;
  function showHeaderUI() {
    if (headerUIActive) return;
    headerUIActive = true;
    smallLogo.style.pointerEvents = "auto";
    gsap.killTweensOf(smallChars);
    gsap.to(smallChars, { yPercent: 0, y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: { each: 0.045, from: "end" }, overwrite: true });
    menuBtn.style.pointerEvents = "auto";
    gsap.killTweensOf([menuBtn, menuText, menuCircle]);
    const pillTl = gsap.timeline();
    pillTl.to(menuBtn, { opacity: 1, scale: 1, width: 44, duration: 0.25, ease: "back.out(1.8)" })
      .to(menuBtn, { width: 148, duration: 0.42, ease: "power3.inOut" })
      .to(menuText, { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" }, "-=0.22")
      .to(menuCircle, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.25");
  }

  function hideHeaderUI() {
    if (!headerUIActive) return;
    headerUIActive = false;
    smallLogo.style.pointerEvents = "none";
    gsap.killTweensOf(smallChars);
    gsap.to(smallChars, {
      yPercent: -120, y: 0, opacity: 0, duration: 0.35, ease: "power2.in", stagger: { each: 0.04, from: "end" }, overwrite: true,
      onComplete: () => { if (!headerUIActive) gsap.set(smallChars, { yPercent: 125, y: 0, opacity: 0 }); },
    });
    menuBtn.style.pointerEvents = "none";
    gsap.killTweensOf([menuBtn, menuText, menuCircle]);
    const hidePillTl = gsap.timeline();
    hidePillTl.to([menuText, menuCircle], { opacity: 0, duration: 0.18, ease: "power2.in" })
      .to(menuBtn, { width: 44, duration: 0.28, ease: "power3.inOut" }, "-=0.1")
      .to(menuBtn, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power2.in" });
  }

  const track = document.getElementById("horizontalTrack");
  const mainWrapper = document.getElementById("mainWrapper");

  const EXP_START = 13.65;
  const EXP_DUR = 0.9;
  const EXP_PHASE_START = [0, 1, 2, 3].map((i) => EXP_START + i * EXP_DUR);
  const EXP_END = EXP_START + 4 * EXP_DUR;
  const ABOUT_ENTER_START = EXP_END;
  const ABOUT_ENTER_DUR = 1.0;
  const ABOUT_SCROLL_START = ABOUT_ENTER_START + ABOUT_ENTER_DUR;
  const ABOUT_SCROLL_DUR = 1.8;
  const ABOUT_SCROLL_Y = "-148vh";
  const ABOUT_EXIT_Y = "-235vh";
  const CONTACT_ENTER_START = ABOUT_SCROLL_START + ABOUT_SCROLL_DUR;
  const CONTACT_ENTER_DUR = 1.2;
  const CONTACT_RISE_START = CONTACT_ENTER_START + CONTACT_ENTER_DUR;
  const CONTACT_RISE_DUR = 1.0;
  const TIMELINE_END = CONTACT_RISE_START + CONTACT_RISE_DUR;
  const SCROLL_W_PER_UNIT = 14.5 / 26.35;

  const EXP_INCOMING_START_X = [78, 80, 82, 84];
  let expSwitchTimes = EXP_PHASE_START.map((t0) => t0 + EXP_DUR * 0.78);

  function computeExpertiseSwitchTimes() {
    const W = window.innerWidth;
    const eChar = expertiseTitleChars[0];
    if (!eChar) return;
    const eRight = eChar.getBoundingClientRect().right;
    const gap = W * 0.012;
    expSwitchTimes = EXP_PHASE_START.map((t0, i) => {
      const startX = (EXP_INCOMING_START_X[i] / 100) * W;
      const p = 1 - (eRight + gap) / startX;
      return t0 + EXP_DUR * gsap.utils.clamp(0.05, 0.95, p);
    });
  }

  function layoutContactSection() {
    contactScrollTrack.style.minHeight = "0px";
    const rel = contactTitleMask.getBoundingClientRect().bottom - contactScrollTrack.getBoundingClientRect().top;
    contactScrollTrack.style.minHeight = window.innerHeight + rel + 12 + "px";
  }

  layoutContactSection();
  computeExpertiseSwitchTimes();
  ScrollTrigger.addEventListener("refreshInit", () => {
    layoutContactSection();
    computeExpertiseSwitchTimes();
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: mainWrapper,
      pin: true,
      scrub: 0.6,
      start: "top top",
      end: () => "+=" + window.innerWidth * SCROLL_W_PER_UNIT * TIMELINE_END,
      invalidateOnRefresh: true,
      onUpdate: () => {
        const t = masterTl.time();
        if (t >= 0.88) showHeaderUI(); else hideHeaderUI();
        if (t >= 0.24) revealProjectText(0); else hideProjectTextDrop(0);
        if (t >= 1.25) revealProjectText(1); else hideProjectTextDrop(1);
        if (t >= 2.25) revealProjectText(2); else hideProjectTextDrop(2);
        if (t >= 3.85) setKirikoFooterReelHidden(true); else setKirikoFooterReelHidden(false);
        if (t >= 4.2) revealEditorialContent(); else hideEditorialContent();
        if (t >= 8.35) revealAwardsHeader(); else hideAwardsHeader();
        if (t >= 13.0) revealExpertiseTitle(); else hideExpertiseTitle();
        let expActive = 0;
        for (let k = 0; k < expSwitchTimes.length; k++) {
          if (t >= expSwitchTimes[k]) expActive = k + 1;
        }
        setActiveExpertiseSlide(expActive);
        if (t >= ABOUT_ENTER_START + ABOUT_ENTER_DUR * 0.46) revealAboutHeader(); else hideAboutHeader();
        if (t >= CONTACT_ENTER_START + CONTACT_ENTER_DUR * 0.42) revealContactHeader(); else hideContactHeader();
      },
    },
  });

  masterTl
    .to(track, { x: "-50vw", ease: "none", duration: 1 }, 0)
    .to(cardData[0].card, { width: "66vw", ease: "power2.out", duration: 1 }, 0)
    .to(cardData[0].imgWrap, { height: "66vh", marginTop: "0vh", ease: "power2.out", duration: 1 }, 0)
    .to(cardData[1].card, { width: "44vw", ease: "power2.out", duration: 1 }, 0)
    .to(cardData[1].imgWrap, { height: "46vh", marginTop: "13vh", ease: "power2.out", duration: 1 }, 0)
    .to(cardData[2].card, { width: "12vw", ease: "none", duration: 1 }, 0)
    
    .to(track, { x: "-116vw", ease: "none", duration: 1 }, 1)
    .to(cardData[1].card, { width: "66vw", ease: "power2.out", duration: 1 }, 1)
    .to(cardData[1].imgWrap, { height: "66vh", marginTop: "0vh", ease: "power2.out", duration: 1 }, 1)
    .to(cardData[2].card, { width: "44vw", ease: "power2.out", duration: 1 }, 1)
    .to(cardData[2].imgWrap, { height: "54vh", marginTop: "11vh", ease: "power2.out", duration: 1 }, 1)

    .to(track, { x: "-182vw", ease: "none", duration: 1 }, 2)
    .to(cardData[2].card, { width: "66vw", ease: "power2.out", duration: 1 }, 2)
    .to(cardData[2].imgWrap, { height: "66vh", marginTop: "0vh", ease: "power2.out", duration: 1 }, 2);

  masterTl.to(editorialLines, { scaleX: 1, duration: 0.65, stagger: 0.08, ease: "power2.inOut" }, 2.85);

  masterTl
    .to(cardData[2].card, { width: "35vw", duration: 1.0, ease: "power2.inOut" }, 3.2)
    .to(reelItemsGroup, { marginTop: "0vh", duration: 0.68, ease: "power2.inOut" }, 3.2)
    .to(cardData[2].imgWrap, { height: "45vh", duration: 0.82, ease: "power2.inOut" }, 3.38)
    .to(verticalReelTrack, { y: "-45vh", duration: 0.82, ease: "none" }, 3.38);

  masterTl.to(verticalReelTrack, { y: "-287vh", duration: 3.2, ease: "none" }, 4.2);

  masterTl
    .to(awardsSection, { xPercent: 0, duration: 1.35, ease: "none" }, 7.5)
    .to(cardData[2].card, { x: "-35vw", duration: 0.45, ease: "none" }, 8.4)
    .to(awardsHeroImageWrap, { xPercent: 0, x: 0, duration: 1.25, ease: "back.out(1.15)" }, 7.6)
    .to(awardsHeroImageWrap, { scale: 1, duration: 1.25, ease: "power2.out" }, 7.6)
    .to(awardsHeroImg, { scale: 1, duration: 1.25, ease: "power2.out" }, 7.6);

  masterTl.to(awardsScrollTrack, { y: "-100vh", duration: 1.8, ease: "none" }, 8.85);
  masterTl.to(awardsScrollTrack, { y: "-200vh", duration: 1.8, ease: "none" }, 10.65);

  masterTl
    .to(awardsScrollTrack, { y: "-300vh", duration: 1.2, ease: "none" }, 12.45)
    .to(expertiseSection, { yPercent: 0, duration: 1.2, ease: "none" }, 12.45);

  const EXP_NEXT_X = [80, 82, 84];
  const EXP_STRIP_X = [95, 95.5];
  const EXP_BAR = [0.4, 0.6, 0.8, 1];

  for (let i = 0; i < 4; i++) {
    const at = EXP_PHASE_START[i];
    const outgoing = i, incoming = i + 1, next = i + 2, afterNext = i + 3;
    masterTl.to(expSlides[incoming], { xPercent: 0, duration: EXP_DUR, ease: "none" }, at);
    if (expSlides[next]) masterTl.to(expSlides[next], { xPercent: EXP_NEXT_X[i], duration: EXP_DUR, ease: "none" }, at);
    if (expSlides[afterNext]) masterTl.to(expSlides[afterNext], { xPercent: EXP_STRIP_X[i], duration: EXP_DUR, ease: "none" }, at);
    masterTl.to(expImgWraps[outgoing], { scale: EXP_EXIT_SCALE, duration: EXP_DUR, ease: "power1.in" }, at);
    masterTl.to(expImgWraps[incoming], { x: "0vw", y: "0vh", scale: 1, duration: EXP_DUR, ease: "none" }, at)
            .to(expImgs[incoming], { scale: 1, duration: EXP_DUR, ease: "none" }, at);
    if (expImgWraps[next]) masterTl.to(expImgWraps[next], { ...EXP_THUMB, duration: EXP_DUR, ease: "none" }, at);
    masterTl.to(expertiseProgressBar, { scaleX: EXP_BAR[i], duration: EXP_DUR, ease: "none" }, at);
  }

  masterTl.to(aboutSection, { yPercent: 0, duration: ABOUT_ENTER_DUR, ease: "none" }, ABOUT_ENTER_START)
          .to(expImgWraps[4], { scale: EXP_EXIT_SCALE, duration: ABOUT_ENTER_DUR, ease: "power1.in" }, ABOUT_ENTER_START);

  masterTl.to(aboutScrollTrack, { y: ABOUT_SCROLL_Y, duration: ABOUT_SCROLL_DUR, ease: "none" }, ABOUT_SCROLL_START)
          .fromTo(aboutImages, { yPercent: -4 }, { yPercent: 4, duration: ABOUT_SCROLL_DUR, ease: "none" }, ABOUT_SCROLL_START);

  masterTl.to(aboutScrollTrack, { y: ABOUT_EXIT_Y, duration: CONTACT_ENTER_DUR, ease: "none" }, CONTACT_ENTER_START)
          .to(contactSection, { yPercent: 0, duration: CONTACT_ENTER_DUR, ease: "none" }, CONTACT_ENTER_START);

  masterTl.to(contactScrollTrack, { y: () => -(contactScrollTrack.offsetHeight - window.innerHeight), duration: CONTACT_RISE_DUR, ease: "none" }, CONTACT_RISE_START)
          .to(contactGiantLogo, { yPercent: 0, duration: CONTACT_RISE_DUR, ease: "none" }, CONTACT_RISE_START);

  function resetSiteToStartInstant() {
    if (isMenuOpen) closeMenuImmediate();
    window.scrollTo(0, 0);
    masterTl.progress(0);
    ScrollTrigger.update();
    hideHeaderUI();
    cardData.forEach((_, idx) => hideProjectTextDrop(idx));
    setKirikoFooterReelHidden(false);
    hideEditorialContent();
    hideAwardsHeader();
    hideExpertiseTitle();
    setActiveExpertiseSlide(0);
    hideAboutHeader();
    hideContactHeader();
  }

  smallLogo.addEventListener("click", (e) => {
    e.preventDefault();
    if (isPreloaderRunning) return;
    playPreloader(() => { resetSiteToStartInstant(); });
  });

  const menuOverlay = document.getElementById("menuOverlay");
  const pillHamburgerSpans = gsap.utils.toArray("#pillHamburger span");
  const menuNavLinks = gsap.utils.toArray(".menu-nav__link");
  const menuStaggerBlocks = gsap.utils.toArray("[data-menu-stagger]");
  const menuFeatureCard = document.getElementById("menuFeatureCard");
  const menuGiantChars = gsap.utils.toArray(".menu-giant-char");
  const menuLangBtns = gsap.utils.toArray(".menu-lang-btn");

  let isMenuOpen = false;
  let isMenuAnimating = false;
  const PILL_DUR = 0.55;
  const PILL_EASE = "power3.inOut";
  let pillTextW = 0;

  function pillOpenTweens(tl, startSize) {
    pillTextW = menuText.getBoundingClientRect().width || pillTextW;
    gsap.set(menuCircle, { width: startSize, height: startSize });
    gsap.set(menuText, { width: pillTextW });
    gsap.set(menuBtn, { backgroundColor: "rgba(22,22,22,1)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)", paddingRight: 23.5 - startSize / 2 });
    tl.to(menuText, { opacity: 0, width: 0, duration: 0.32, ease: "power2.inOut" }, 0)
      .to(menuBtn, { width: 44, paddingLeft: 0, paddingRight: 0, backgroundColor: "rgba(22,22,22,0)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0)", duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to(menuCircle, { width: 44, height: 44, duration: PILL_DUR, ease: PILL_EASE }, 0);
  }

  function pillCloseTweens(tl) {
    const textW = pillTextW || menuText.scrollWidth;
    tl.to(menuCircle, { width: 15, height: 15, duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to(menuBtn, { width: 148, paddingLeft: 23, paddingRight: 16, backgroundColor: "rgba(22,22,22,1)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)", duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to(menuText, { width: textW, opacity: 1, duration: 0.4, ease: "power2.out" }, 0.2);
  }

  function pillResetBase() {
    gsap.killTweensOf([menuText, menuCircle]);
    gsap.set(menuText, { clearProps: "width" });
    gsap.set(menuText, { opacity: 1, x: 0 });
    gsap.set(menuCircle, { clearProps: "width,height" });
    gsap.set(menuBtn, { clearProps: "paddingLeft,paddingRight,backgroundColor,boxShadow" });
    gsap.set(menuBtn, { width: 148 });
  }

  gsap.set(menuOverlay, { yPercent: 100 });
  gsap.set(menuNavLinks, { yPercent: 115, y: 0, opacity: 0 });
  gsap.set(menuStaggerBlocks, { y: 30, opacity: 0 });
  gsap.set(menuFeatureCard, { y: 40, opacity: 0, scale: 0.92 });
  gsap.set(menuGiantChars, { yPercent: 115 });

  function openMenu() {
    if (isMenuOpen || isMenuAnimating) return;
    isMenuOpen = true; isMenuAnimating = true;
    const pillStartSize = menuCircle.getBoundingClientRect().width || 15;
    document.body.classList.add("is-menu-open");
    menuOverlay.classList.add("is-open");
    menuBtn.classList.add("is-active");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");

    gsap.killTweensOf([menuOverlay, menuNavLinks, menuStaggerBlocks, menuFeatureCard, menuGiantChars, pillHamburgerSpans, smallLogo, menuBtn]);
    gsap.set(menuOverlay, { yPercent: 100 });
    gsap.set(menuNavLinks, { yPercent: 115, y: 0, opacity: 0 });
    gsap.set(menuStaggerBlocks, { y: 32, opacity: 0 });
    gsap.set(menuFeatureCard, { y: 40, opacity: 0, scale: 0.92 });
    gsap.set(menuGiantChars, { yPercent: 115 });

    const openTl = gsap.timeline({ onComplete: () => { isMenuAnimating = false; } });
    pillOpenTweens(openTl, pillStartSize);
    openTl
      .to(pillHamburgerSpans[0], { y: 2.5, rotate: 45, width: 16, height: 2.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to(pillHamburgerSpans[1], { y: -2.5, rotate: -45, width: 16, height: 2.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to(menuOverlay, { yPercent: 0, duration: 0.82, ease: "power3.inOut" }, 0)
      .to(menuNavLinks, { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power3.out" }, 0.42)
      .to(menuStaggerBlocks, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" }, 0.5)
      .to(menuFeatureCard, { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" }, 0.54)
      .to(menuGiantChars, { yPercent: 0, duration: 0.72, stagger: 0.045, ease: "power4.out" }, 0.46);
  }

  function closeMenu({ direction = "down", onComplete } = {}) {
    if (!isMenuOpen || isMenuAnimating) return;
    isMenuAnimating = true;
    gsap.killTweensOf([menuOverlay, menuNavLinks, menuStaggerBlocks, menuFeatureCard, menuGiantChars, pillHamburgerSpans, smallLogo, menuBtn]);
    const exitYPercent = direction === "up" ? -100 : 100;

    const closeTl = gsap.timeline({
      onComplete: () => {
        isMenuOpen = false; isMenuAnimating = false;
        menuOverlay.classList.remove("is-open");
        menuBtn.classList.remove("is-active");
        menuOverlay.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("is-menu-open");
        gsap.set(menuOverlay, { yPercent: 100 });
        pillResetBase();
        if (typeof onComplete === "function") onComplete();
      },
    });

    pillCloseTweens(closeTl);
    closeTl
      .to(pillHamburgerSpans[0], { y: 0, rotate: 0, width: 9, height: 1.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to(pillHamburgerSpans[1], { y: 0, rotate: 0, width: 6, height: 1.5, duration: PILL_DUR, ease: PILL_EASE }, 0)
      .to([menuNavLinks, menuStaggerBlocks, menuFeatureCard], { opacity: 0, y: -15, duration: 0.25, ease: "power2.in" }, 0)
      .to(menuGiantChars, { yPercent: 115, duration: 0.35, stagger: 0.02, ease: "power2.in" }, 0)
      .to(menuOverlay, { yPercent: exitYPercent, duration: 0.72, ease: "power3.inOut" }, 0.12);
  }

  function closeMenuImmediate() {
    gsap.killTweensOf([menuOverlay, menuNavLinks, menuStaggerBlocks, menuFeatureCard, menuGiantChars, pillHamburgerSpans, menuBtn]);
    isMenuOpen = false; isMenuAnimating = false;
    menuOverlay.classList.remove("is-open");
    menuBtn.classList.remove("is-active");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
    gsap.set(menuOverlay, { yPercent: 100 });
    gsap.set(pillHamburgerSpans[0], { y: 0, rotate: 0, width: 9, height: 1.5 });
    gsap.set(pillHamburgerSpans[1], { y: 0, rotate: 0, width: 6, height: 1.5 });
    pillResetBase();
  }

  menuBtn.addEventListener("click", () => {
    if (isMenuOpen) closeMenu({ direction: "down" });
    else openMenu();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) closeMenu({ direction: "down" });
  });

  menuLangBtns.forEach((btn) => { btn.addEventListener("click", () => window.location.reload()); });

  const SECTION_TIMELINE_TARGETS = {
    expertise: EXP_START,
    gaming: EXP_START,
    agency: ABOUT_SCROLL_START,
    waifus: ABOUT_SCROLL_START,
    contact: CONTACT_RISE_START,
  };

  function scrollToMasterTime(targetTime, instant = false) {
    const st = masterTl.scrollTrigger;
    if (!st) return;
    const progress = gsap.utils.clamp(0, 1, targetTime / masterTl.duration());
    const targetScrollY = st.start + progress * (st.end - st.start);
    if (targetTime >= 0.88) { showHeaderUI(); gsap.set([smallLogo, menuBtn], { opacity: 1 }); }
    window.scrollTo({ top: targetScrollY, behavior: instant ? "instant" : "smooth" });
  }

  if (arrivedFromProjects) {
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const pageLoaded = document.readyState === "complete" ? Promise.resolve() : new Promise((res) => window.addEventListener("load", res, { once: true }));
    const maxWait = new Promise((res) => setTimeout(res, 2500));
    Promise.race([Promise.all([fontsReady, pageLoaded]), maxWait]).then(() => {
      ScrollTrigger.refresh();
      const hasTarget = pendingNavTarget && pendingNavTarget in SECTION_TIMELINE_TARGETS;
      if (hasTarget) scrollToMasterTime(SECTION_TIMELINE_TARGETS[pendingNavTarget], true);
      const reveal = () => { if (silentRevealTl) silentRevealTl.play(); };
      if (hasTarget) setTimeout(reveal, 750); else requestAnimationFrame(() => requestAnimationFrame(reveal));
    });
  }

  menuNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetKey = link.getAttribute("data-menu-target");
      if (targetKey && targetKey in SECTION_TIMELINE_TARGETS) {
        e.preventDefault();
        const targetTime = SECTION_TIMELINE_TARGETS[targetKey];
        closeMenu({ direction: "up", onComplete: () => scrollToMasterTime(targetTime) });
      }
    });
  });

  document.querySelectorAll(".hero-panel .navbar .nav-link").forEach((navLink) => {
    navLink.addEventListener("click", (e) => {
      const href = navLink.getAttribute("href") || "";
      if (href.startsWith("#")) {
        const key = href.replace("#", "").toLowerCase();
        if (key in SECTION_TIMELINE_TARGETS) { e.preventDefault(); scrollToMasterTime(SECTION_TIMELINE_TARGETS[key]); }
      }
    });
  });

  ["wheel", "touchmove"].forEach((evt) => {
    menuOverlay.addEventListener(evt, (e) => { if (isMenuOpen) e.preventDefault(); }, { passive: false });
  });
});

/* =========================================================================
   TRANSICIÓN HACIA CUALQUIER OTRA PÁGINA (WIPE UP)
   Sube un telón negro desde abajo empujando la página entera hacia arriba.
   ========================================================================= */
(function initIndexExitTransition() {
  let leaving = false;
  document.addEventListener("click", (e) => {
    // Escucha cualquier enlace válido (o elemento con data-href) que salga de index
    const link = e.target.closest && e.target.closest('a[href], [data-href]');
    if (!link) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    
    const href = link.getAttribute('href') || link.getAttribute('data-href');
    // Ignorar links internos (anclas de la misma página) o externos/mail
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    if (leaving) return;
    leaving = true;

    const curtain = document.createElement("div");
    curtain.setAttribute("aria-hidden", "true");
    Object.assign(curtain.style, {
      position: "fixed", inset: "0", background: "#0d0d0d", zIndex: "10000", willChange: "transform",
    });
    document.body.appendChild(curtain);
    
    // Wipe UP: Arranca escondido abajo (y = 100%)
    gsap.set(curtain, { yPercent: 100 });
    document.documentElement.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    const pushTargets = ["#mainWrapper", "#menuOverlay", "#smallAkaruLogo", "#menuBtn"]
      .map((sel) => document.querySelector(sel)).filter(Boolean);
    const push = window.innerHeight * 0.22;

    gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("celonorNav", "from-index");
          window.location.href = href;
        },
      })
      // Sube a 0
      .to(curtain, { yPercent: 0, duration: 0.95, ease: "power3.inOut" }, 0)
      // Empuja el contenido hacia arriba (-push)
      .to(pushTargets, { y: -push, duration: 0.95, ease: "power3.inOut" }, 0);
  }, true);
})();
