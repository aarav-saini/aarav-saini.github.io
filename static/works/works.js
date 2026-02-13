const lenis = new Lenis({
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
const marquee = document.querySelector(".marquee");
const track = document.querySelector(".marqueeTrack");
track.innerHTML += track.innerHTML;
const half = track.scrollWidth / 2;
const marqueeTween = gsap.to(track, {
  x: -half,
  ease: "none",
  duration: 25,
  repeat: -1,
});
marquee.addEventListener("mouseenter", () => marqueeTween.pause());
marquee.addEventListener("mouseleave", () => marqueeTween.resume());
const modal = document.createElement("div");
modal.className = "workModal";
modal.innerHTML = `
  <div class="workModalBackdrop"></div>
  <div class="workModalContent">
    <div class="workModalInner"></div>
  </div>
`;
document.body.appendChild(modal);
const backdrop = modal.querySelector(".workModalBackdrop");
const content = modal.querySelector(".workModalContent");
const inner = modal.querySelector(".workModalInner");
let activeCard = null;
function openModal(card) {
  activeCard = card;
  gsap.set(modal, { autoAlpha: 1 });
  modal.style.pointerEvents = "auto";
  marqueeTween.pause();
  marquee.style.pointerEvents = "none";
  lenis.stop();
  document.documentElement.style.overflow = "hidden";
  const id = card.dataset.modal;
  const template = document.querySelector(`.modalItem[data-modal="${id}"]`);
  inner.innerHTML = template.innerHTML;
  const rect = card.getBoundingClientRect();
  gsap.set(content, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  });
  const tl = gsap.timeline();
  tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  tl.to(
    content,
    {
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
      xPercent: -50,
      yPercent: -50,
      width: Math.min(1000, window.innerWidth * 0.9),
      height: Math.min(800, window.innerHeight * 0.3),
      duration: 0.7,
      ease: "power4.inOut",
    },
    0,
  );
  tl.fromTo(inner, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.2");
}
function closeModal() {
  if (!activeCard) return;
  const rect = activeCard.getBoundingClientRect();
  const tl = gsap.timeline({
    onComplete: () => {
      modal.style.pointerEvents = "none";
      gsap.set(content, { clearProps: "all" });
      gsap.set(inner, { clearProps: "all" });
      gsap.set(backdrop, { clearProps: "all" });
      inner.innerHTML = "";
      lenis.start();
      document.documentElement.style.overflow = "";
      marquee.style.pointerEvents = "";
      marqueeTween.resume();
      activeCard = null;
    },
  });
  tl.to(inner, { opacity: 0, duration: 0.2 });
  tl.to(
    content,
    {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      xPercent: 0,
      yPercent: 0,
      duration: 0.6,
      ease: "power4.inOut",
    },
    0,
  );
  tl.to(backdrop, { opacity: 0, duration: 0.3 }, 0);
  tl.to(
    modal,
    {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.out",
    },
    "-=0.15",
  );
}
document.querySelectorAll(".workCard").forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});
backdrop.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
