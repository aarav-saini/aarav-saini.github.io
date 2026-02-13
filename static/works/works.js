// ==============================
// LENIS
// ==============================
const lenis = new Lenis({
  smoothWheel: true,
  smoothTouch: false,
});

// ==============================
// GSAP
// ==============================
gsap.registerPlugin(ScrollTrigger);

// let ScrollTrigger read Lenis instead of window
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

// update ST when lenis scrolls
lenis.on("scroll", ScrollTrigger.update);

// run lenis on gsap ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.addEventListener("refresh", () => lenis.resize());
ScrollTrigger.refresh();
