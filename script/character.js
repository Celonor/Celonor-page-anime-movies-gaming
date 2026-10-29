/* ==========================================================================
   FORZAR SCROLL AL INICIO PARA EVITAR BUCLES CON EL BOTÓN ATRÁS
   ========================================================================== */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

/* ==========================================================================
   DATABASE FOR GAMING CHARACTERS (5 PERSONAJES DEFINITIVOS)
   Carpetas en img/gaming/: kiriko, jill-valentine, ellie, ciri, clementine
   ========================================================================== */
const CHARACTER_DATA = [
  {
    id: "kiriko",
    number: 1,
    title: "Kiriko",
    game: "Overwatch 2",
    role: "Support / Healer",
    weapon: "Healing Ofuda & Kunai",
    voice: "Sally Amaki (EN) / Fairouz Ai (JP)",
    year: "2022",
    color: "#7c8f7f", // Sage Green
    lore: "Raised by her grandmother in the spiritual traditions of the Kanezaka fox shrine and trained in ninjutsu by her mother Asa, Kiriko Kamori bridges ancient heritage with rebellious street agility. After the Hashimoto clan seized control of her neighborhood, she became Kanezaka's fiercely independent protector.",
    playstyle: "Kiriko blends high-mobility flanking with clutch utility. Swift Step allows her to teleport directly through walls to aid endangered allies, while Protection Suzu cleanses negative status effects and grants brief invulnerability. Her kunai reward pinpoint accuracy with lethal critical damage multipliers."
  },
  {
    id: "jill-valentine",
    number: 2,
    title: "Jill Valentine",
    game: "Resident Evil",
    role: "S.T.A.R.S. Operative",
    weapon: "Samurai Edge & Assault Arsenal",
    voice: "Nicole Tompkins / Sasha Zotova (Model)",
    year: "1996 / 2020",
    color: "#c1ccd7", // Dusty Blue
    lore: "A former Delta Force trainee and master of lockpicking and explosive ordnance, Jill Valentine survived the Arklay Mountains mansion incident as a member of S.T.A.R.S. Alpha Team. Months later, during the catastrophic outbreak in Raccoon City, she became the relentless target of Umbrella's bioweapon, Nemesis.",
    playstyle: "Defined by tactical resourcefulness under extreme pressure. In the Raccoon City campaign, her combat kit revolves around the Perfect Dodge mechanic—allowing her to evade lethal strikes at the last millisecond and counter with slow-motion precision fire against overwhelming bio-organic threats."
  },
  {
    id: "ellie",
    number: 3,
    title: "Ellie",
    game: "The Last of Us",
    role: "Survivor / Stealth",
    weapon: "Switchblade, Bow & Hunting Rifle",
    voice: "Ashley Johnson",
    year: "2013 / 2020",
    color: "#b597a3", // Mauve
    lore: "Born in a quarantined Boston twenty years after the Cordyceps fungal pandemic ravaged humanity, Ellie discovered she was uniquely immune to the infection. What began as a perilous cross-country smuggling journey with Joel Miller evolved into a deeply scarred tale of love, loss, and consuming vengeance in Jackson and Seattle.",
    playstyle: "Agile, scrappy, and lethal in close quarters. Unlike heavier combatants, Ellie relies on her unbreakable switchblade for silent takedowns, squeezing through tight crawlspaces, laying proximity mines, and crafting explosive arrows on the fly to wage guerrilla warfare in overgrown urban ruins."
  },
  {
    id: "ciri",
    number: 4,
    title: "Ciri",
    game: "The Witcher",
    role: "Lady of Space & Time",
    weapon: "Zireael (Silver Sword) & Elder Blood",
    voice: "Jo Wyatt",
    year: "2015",
    color: "#d97843", // Terracotta Orange
    lore: "Cirilla Fiona Elen Riannon, princess of Cintra and adoptive daughter of Geralt of Rivia and Yennefer of Vengerberg, carries the ancient Lara Dorren gene. Hunted across dimensions by the spectral Wild Hunt for her Elder Blood, she was trained at Kaer Morhen to fight like a witcher while mastering her planar powers.",
    playstyle: "Rather than casting traditional witcher Signs or drinking toxic decoctions, Ciri fights with blinding speed by blinking across the battlefield. She teleports behind enemies in a flash of emerald light, chaining spatial dashes with devastating sword strikes from her gwyhyr blade, Zireael."
  },
  {
    id: "clementine",
    number: 5,
    title: "Clementine",
    game: "The Walking Dead",
    role: "Survivor & Leader",
    weapon: "Survival Knife, Pistol & Bow",
    voice: "Melissa Hutchinson",
    year: "2012",
    color: "#e68a5c", // Warm Amber
    lore: "Found alone in a suburban Georgia treehouse at the dawn of the undead apocalypse, Clementine was protected and taught how to survive by Lee Everett. Across years of heartbreak, collapsing communities, and raising young AJ on the road, she grew from a frightened child into an unbreakable leader.",
    playstyle: "Built around quick-thinking adaptability and environmental awareness. Taught to keep her hair short and always aim for the head, Clementine uses the Knee-Cap technique to stun walkers before executing them, turning her smaller stature y sharp instincts into her greatest survival advantage."
  }
];

function getActiveCharacter() {
  const params = new URLSearchParams(window.location.search);
  const queryId = (params.get("id") || "").trim().toLowerCase();
  
  if (queryId) {
    const found = CHARACTER_DATA.find(c => c.id === queryId);
    if (found) return found;
  }
  return CHARACTER_DATA[0];
}

function renderCharacter(char) {
  document.documentElement.style.setProperty("--theme-color", char.color);
  document.title = `${char.title} — CELONOR`;

  const images = [1, 2, 3, 4, 5].map(idx => `img/gaming/${char.id}/${char.id}-0${idx}.jpg`);
  const el = (id) => document.getElementById(id);
  
  if (el("charGame")) el("charGame").textContent = char.game;
  if (el("charRole")) el("charRole").textContent = char.role;
  if (el("charIndex")) el("charIndex").textContent = `#0${char.number}`;
  if (el("charTitle")) el("charTitle").textContent = char.title;

  const profileList = el("charProfileList");
  if (profileList) {
    profileList.innerHTML = "";
    const specs = [
      { label: "Universe / Game", value: char.game },
      { label: "Class / Role", value: char.role },
      { label: "Signature Weapon", value: char.weapon },
      { label: "Voice Actor", value: char.voice },
      { label: "Release Year", value: char.year }
    ];

    specs.forEach(spec => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "char-profile__item";
      itemDiv.innerHTML = `<dt class="char-profile__dt">${spec.label}</dt><dd class="char-profile__dd">${spec.value}</dd>`;
      profileList.appendChild(itemDiv);
    });
  }

  if (el("charLoreText")) el("charLoreText").textContent = char.lore;
  if (el("charPlaystyleText")) el("charPlaystyleText").textContent = char.playstyle;

  if (el("charCaption2")) el("charCaption2").textContent = `CH—0${char.number} / VISUAL 02`;
  if (el("charWorkCode3")) el("charWorkCode3").textContent = `CH—0${char.number}/03`;
  if (el("charWorkCode4")) el("charWorkCode4").textContent = `CH—0${char.number}/04`;

  if (el("charImg1")) { el("charImg1").src = images[0]; el("charImg1").alt = `${char.title} - Visual 1`; }
  if (el("charImg2")) { el("charImg2").src = images[1]; el("charImg2").alt = `${char.title} - Visual 2`; }
  if (el("charImg3")) { el("charImg3").src = images[2]; el("charImg3").alt = `${char.title} - Visual 3`; }
  if (el("charImg4")) { el("charImg4").src = images[3]; el("charImg4").alt = `${char.title} - Visual 4`; }
  if (el("charImg5")) { el("charImg5").src = images[4]; el("charImg5").alt = `${char.title} - Visual 5`; }
  
  if (el("showcaseThumb1")) { el("showcaseThumb1").src = images[0]; el("showcaseThumb1").alt = `${char.title} - Archive 01`; }
  if (el("showcaseThumb2")) { el("showcaseThumb2").src = images[1]; el("showcaseThumb2").alt = `${char.title} - Visual Identity`; }
  if (el("showcaseThumb3")) { el("showcaseThumb3").src = images[2]; el("showcaseThumb3").alt = `${char.title} - Archive 02`; }

  if (el("showcaseTitle1")) el("showcaseTitle1").textContent = char.title.toUpperCase();
  if (el("showcaseTagGame")) el("showcaseTagGame").textContent = char.game.toUpperCase();
  if (el("showcaseRoleLabel")) el("showcaseRoleLabel").textContent = char.role.toUpperCase();

  // Siguiente personaje: usa la primera imagen (-01.jpg) del personaje que sigue
  const currentIndex = CHARACTER_DATA.findIndex(c => c.id === char.id);
  const nextChar = CHARACTER_DATA[(currentIndex + 1) % CHARACTER_DATA.length];
  const nextCharPreviewImg = `img/gaming/${nextChar.id}/${nextChar.id}-01.jpg`;

  if (el("showcaseThumb4")) {
    el("showcaseThumb4").src = nextCharPreviewImg;
    el("showcaseThumb4").alt = `Next: ${nextChar.title}`;
  }
  if (el("nextCharLink")) el("nextCharLink").href = `character.html?id=${nextChar.id}`;
  if (el("showcaseNextTitle")) el("showcaseNextTitle").textContent = `NEXT: ${nextChar.title.toUpperCase()} →`;
}

function initAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  let heroTitlePlayed = false;
  const heroTitleIn = gsap.from(".char-hero__title", {
    yPercent: 100, duration: 1, ease: "power4.out", paused: true
  });
  const playHeroTitle = () => {
    if (heroTitlePlayed) return;
    heroTitlePlayed = true;
    heroTitleIn.play();
  };
  if (window.CelonorTransitions) window.CelonorTransitions.onReady(playHeroTitle);
  else playHeroTitle();
  setTimeout(playHeroTitle, 4000);

  gsap.to(".char-hero__img", {
    scale: 1, ease: "none",
    scrollTrigger: { trigger: ".char-hero", start: "top top", end: "bottom top", scrub: true }
  });

  const showcaseSection = document.getElementById("charShowcaseSection");
  const showcaseTrack = document.getElementById("charShowcaseTrack");
  if (showcaseSection && showcaseTrack) {
    const getScrollDistance = () => showcaseTrack.scrollWidth - window.innerWidth;
    gsap.to(showcaseTrack, {
      x: () => -Math.max(0, getScrollDistance()),
      ease: "none",
      scrollTrigger: {
        trigger: showcaseSection,
        pin: "#charShowcasePin",
        start: "top top",
        end: () => `+=${Math.max(600, getScrollDistance())}`,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }

  initScrollOutro();
}

function initScrollOutro() {
  const outro = document.getElementById('scrollOutro');
  const bar = document.getElementById('projectsScrollBar');
  const count = document.getElementById('projectsScrollCount');
  if (!outro || !bar || !count) return;

  let finished = false;
  let target = 0;
  let shown = 0;
  let rafId = 0;

  function paint(p) {
    bar.style.setProperty('--cx-progress', p.toFixed(4));
    count.textContent = String(Math.round(p * 100));
  }

  function triggerLeave() {
    if (finished) return;
    finished = true;
    paint(1);

    let leaveTarget = "gaming.html";
    if (document.referrer && document.referrer.includes(window.location.host)) {
      leaveTarget = document.referrer;
    }

    setTimeout(() => {
      if (window.CelonorTransitions && typeof window.CelonorTransitions.leave === 'function') {
        window.CelonorTransitions.leave(leaveTarget);
      } else {
        window.location.href = leaveTarget;
      }
    }, 120);
  }

  function step() {
    rafId = 0;
    shown += (target - shown) * 0.8;

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
    start: "bottom bottom",
    end: "+=200",
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (finished) return;
      target = self.progress;
      kick();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderCharacter(getActiveCharacter());
});

window.addEventListener("load", () => {
  initAnimations();
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});