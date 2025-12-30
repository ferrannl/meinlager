/* =========================
   CONTACT FORM (your existing logic, safe-guarded)
========================= */
(() => {
  const form = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const countdownElement = document.getElementById("countdown");

  if (form && successModal && countdownElement) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      successModal.classList.remove("hidden");

      let countdown = 15;
      countdownElement.textContent = countdown;

      const timer = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
          clearInterval(timer);
          window.location.href = "index.html";
        }
      }, 1000);
    });
  }
})();

/* =========================
   NAV MENU FIXES
   - hamburger toggles open/close
   - submenu toggles by click on mobile
   - clicking a link closes menu
   - prevents horizontal overflow
========================= */
(() => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  if (!toggleBtn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close when clicking any normal link
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  // Submenu toggles (mobile)
  const submenuToggles = menu.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const submenu = btn.parentElement.querySelector(".submenu");
      if (!submenu) return;

      const isOpen = submenu.classList.contains("open");
      submenu.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Close menu when resizing to desktop
  const mq = window.matchMedia("(min-width: 900px)");
  mq.addEventListener("change", () => closeMenu());

  // Click outside closes menu (mobile)
  document.addEventListener("click", (e) => {
    const isOpen = menu.classList.contains("open");
    if (!isOpen) return;

    const clickInsideNav = e.target.closest("header.header");
    if (!clickInsideNav) closeMenu();
  });
})();
