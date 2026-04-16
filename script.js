const navToggle = document.querySelector(".nav-toggle");
const topnav = document.querySelector(".topnav");
const navLinks = [...document.querySelectorAll(".topnav a")];
const sections = [...document.querySelectorAll("main .section")];

if (navToggle && topnav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    topnav.classList.toggle("open", !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      topnav.classList.remove("open");
    });
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    const currentId = visible.target.id;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0.2, 0.4, 0.6]
  }
);

sections.forEach((section) => sectionObserver.observe(section));
