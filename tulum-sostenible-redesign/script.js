const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll("[data-menu] a");
const cursorLight = document.querySelector(".cursor-light");

menuButton?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 65, 420)}ms`;
  revealObserver.observe(element);
});

const metricObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      const duration = 1300;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(eased * target).toLocaleString("es-MX");
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      metricObserver.unobserve(element);
    });
  },
  { threshold: 0.55 }
);

document.querySelectorAll("[data-count]").forEach((metric) => {
  metricObserver.observe(metric);
});

let lightX = window.innerWidth * 0.5;
let lightY = window.innerHeight * 0.35;
let targetX = lightX;
let targetY = lightY;

window.addEventListener("pointermove", (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

const moveLight = () => {
  lightX += (targetX - lightX) * 0.08;
  lightY += (targetY - lightY) * 0.08;
  if (cursorLight) {
    cursorLight.style.left = `${lightX}px`;
    cursorLight.style.top = `${lightY}px`;
  }
  requestAnimationFrame(moveLight);
};

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  moveLight();
}
