// ==========================
// NAV (hamburger + submenu)
// ==========================
(function () {
  const check = document.getElementById("check");
  const menu = document.getElementById("mainMenu");

  if (!check || !menu) return;

  const isDesktop = () => window.matchMedia("(min-width: 480px)").matches;

  const closeAllSubmenus = () => {
    menu.querySelectorAll(".has-submenu").forEach((li) => {
      li.classList.remove("open");
      const btn = li.querySelector(".menu-btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  };

  const closeMenu = () => {
    check.checked = false;
    closeAllSubmenus();
  };

  // Toggle submenu on click (mobile + desktop)
  menu.querySelectorAll(".has-submenu > .menu-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const li = btn.closest(".has-submenu");
      const isOpen = li.classList.contains("open");

      // close others first
      closeAllSubmenus();

      // toggle this one
      if (!isOpen) {
        li.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        li.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close menu when clicking any normal link (mobile)
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!isDesktop()) closeMenu();
    });
  });

  // Clicking outside closes menu (mobile)
  document.addEventListener("click", (e) => {
    if (isDesktop()) return;
    if (!check.checked) return;

    const nav = menu.closest("nav");
    if (nav && !nav.contains(e.target)) closeMenu();
  });

  // Esc closes menu (mobile)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && check.checked) closeMenu();
  });

  // When switching to desktop, clean state
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      check.checked = false;
      closeAllSubmenus();
    }
  });
})();

// ==========================
// CONTACT FORM MODAL (safe)
// ==========================
(function () {
  const form = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const countdownElement = document.getElementById("countdown");

  if (!form || !successModal || !countdownElement) return;

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
})();
