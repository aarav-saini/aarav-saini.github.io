gsap.registerPlugin(ScrollTrigger, SplitText);

const navbar = gsap.timeline({
  scrollTrigger: {
    trigger: ".bg-hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});

navbar.to(".navbar", {
  padding: "1rem",
  top: 0,
  ease: "none",
});

navbar.to(
  "#navbar-title",
  {
    fontSize: "calc(14px + 2vh)",
    ease: "none",
  },
  "<",
);

navbar.eventCallback("onComplete", () => {
  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  gsap.set(".sect", {
    paddingTop: navbarHeight,
  });
});

gsap.registerPlugin(ScrollTrigger, SplitText);

const split = SplitText.create("#about-text", {
  type: "words",
});

const aboutTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "top top",
    end: "+=200%",
    scrub: 1,
    pin: true,
  },
});

aboutTimeline.to(split.words, {
  color: "#fff",
  stagger: 0.1,
  ease: "none",
});

aboutTimeline.to(
  ".about",
  {
    backgroundColor: "#038fda",
    ease: "none",
  },
  "<",
);
