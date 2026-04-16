const navToggle = document.querySelector(".nav-toggle");
const topnav = document.querySelector(".topnav");
const navLinks = Array.from(document.querySelectorAll(".topnav a"));
const sections = Array.from(document.querySelectorAll("main .section"));

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

if (navLinks.length > 0 && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!current) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current.target.id}`);
      });
    },
    {
      rootMargin: "-15% 0px -65% 0px",
      threshold: [0.2, 0.4, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
}
