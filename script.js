document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // close menu when clicking a link
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
    }
  });

  // mobile submenu toggles
  document.querySelectorAll(".submenu-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;
      submenu.classList.toggle("open");
    });
  });

  // close menu on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      menu.classList.remove("open");
    }
  });
});
