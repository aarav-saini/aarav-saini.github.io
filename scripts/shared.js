console.log("JS loaded");
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

gsap.fromTo(
  ".marquee-vertical-track",
  {
    y: 0,
  },
  {
    y: "-100%",
    duration: 5,
    ease: "none",
    repeat: -1,
  },
);

document
  .querySelectorAll(".navbar-modal-panel1 > *")
  .forEach((child, index) => {
    child.style.marginLeft = `${(index + 1) * 100}px`;
  });

const menu = document.querySelector(".navbar-modal");
const menuToggle = document.querySelector("#navbar-btn");

gsap.set(menu, {
  display: "none",
  opacity: 0,
  yPercent: -100,
  transformOrigin: "top right",
});

const menuTimeline = gsap.timeline({
  paused: true,
  reversed: true,
  onReverseComplete: () => {
    gsap.set(menu, { display: "none" });
  },
});

menuTimeline.set(menu, { display: "grid" }).to(menu, {
  opacity: 1,
  yPercent: 0,
  rotation: 0,
  duration: 1,
  ease: "expo.out",
});

menuToggle.addEventListener("click", () => {
  if (menuTimeline.reversed()) {
    menuTimeline.play();
  } else {
    menuTimeline.reverse();
  }
});

function closeMenu() {
  if (!menuTimeline.reversed()) {
    menuTimeline.reverse();
  }
}

function goto(section) {
  const targetSection = document.getElementById(section);

  if (targetSection) {
    closeMenu();

    menuTimeline.eventCallback("onReverseComplete", () => {
      gsap.set(menu, { display: "none" });
      lenis.scrollTo(targetSection);
    });
  }
}