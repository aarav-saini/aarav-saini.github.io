async function loadQuote() {
  try {
    const res = await fetch("/media/quotes.json");
    const data = await res.json();
    const random = data[Math.floor(Math.random() * data.length)];
    document.getElementById("quote").textContent = random.quote;
    document.getElementById("author").textContent = "— " + random.author;
  } catch (err) {
    console.error("Quote JSON failed, using fallback.", err);
    document.getElementById("quote").textContent = " ";
    document.getElementById("author").textContent = " ";
  }
}
const nameTitle = document.getElementById("nameTitle");
const fonts = [
  "monospace",
  "sans-serif",
  "serif",
  "ultra",
  "pirataone",
  "audiowide",
  "cursive",
  "georgia",
  "amarante",
  "lanord",
];
const finalFont = "lanord";
let startTime = 0;
let fontAnimationComplete = false;
const totalDuration = 2000;
const minInterval = 50;
const maxInterval = 500;
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function changeFont() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / totalDuration, 1);
  nameTitle.style.fontFamily =
    progress >= 1 ? finalFont : fonts[Math.floor(Math.random() * fonts.length)];
  if (progress >= 1) {
    fontAnimationComplete = true;
    return;
  }
  const interval = lerp(minInterval, maxInterval, progress);
  setTimeout(changeFont, interval);
}
const params = new URLSearchParams(window.location.search);
const skipIntro = params.get("skipIntro") === "true";
async function initIntro() {
  const intro = document.querySelector(".intro");
  const hero = document.querySelector(".hero");

  if (skipIntro) {
    revealHeroInstant();
    return;
  }

  hero.style.display = "none";

  gsap.to(["#quote", "#author"], {
    opacity: 1,
    duration: 0.8,
  });

  gsap.to(["#quote", "#author"], {
    opacity: 0,
    duration: 1,
    delay: 1.8,
  });

  gsap.to(intro, {
    opacity: 0,
    duration: 1,
    delay: 3,
    onComplete() {
      intro.style.display = "none";
      hero.style.display = "flex";

      startTime = Date.now();
      changeFont();

      const waitFont = setInterval(() => {
        if (!fontAnimationComplete) return;
        clearInterval(waitFont);

        gsap.fromTo(
          "#nameTitle",
          { y: 0 },
          {
            y: "-3vh",
            scale: 1.3,
            duration: 2,
            ease: "expo.out",
            force3D: true,
            onComplete() {
              ScrollTrigger.refresh();

              const tl = gsap.timeline();

              tl.to(".navbarInner", {
                scaleX: 1,
                duration: 1.2,
                ease: "expo.inOut",
              }).to(
                ".navSide a",
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.06,
                },
                "-=0.1",
              );
            },
          },
        );
      }, 50);
    },
  });
}

const feImage = document.querySelector("feImage");
if (feImage) {
  fetch("https://essykings.github.io/JavaScript/map.png")
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      feImage.setAttribute("href", url);
    });
}
loadQuote().then(() => {
  initIntro();
  const container = document.querySelector(".container");
  gsap.set(container, { visibility: "visible" });
});
window.lenis = new Lenis({
  smoothWheel: true,
  smoothTouch: false,
});
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value);
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
ScrollTrigger.addEventListener("refresh", () => lenis.resize());
ScrollTrigger.refresh();

function revealHeroInstant() {
  const intro = document.querySelector(".intro");
  const hero = document.querySelector(".hero");

  intro.style.display = "none";
  hero.style.display = "flex";

  fontAnimationComplete = true;
  nameTitle.style.fontFamily = finalFont;

  gsap.set("#nameTitle", { y: "-3vh", scale: 1.3 });

  gsap.set(".navbarInner", { scaleX: 1 });
  gsap.set(".navSide a", { opacity: 1, y: 0 });

  ScrollTrigger.refresh();
}
