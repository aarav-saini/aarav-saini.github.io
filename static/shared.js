const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".navlinksMobile");

function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  if (window.lenis) window.lenis.stop();
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  if (window.lenis) window.lenis.start();
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}
