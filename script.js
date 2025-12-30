// NAV: hamburger + submenu toggle (no horizontal scroll, closes properly)
(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mainMenu");
  const submenuParents = document.querySelectorAll(".has-submenu");

  function closeAllSubmenus(except = null) {
    submenuParents.forEach((li) => {
      if (except && li === except) return;
      li.classList.remove("is-open");
      const btn = li.querySelector(".submenu-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    closeAllSubmenus();
  }

  function toggleMenu() {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) closeAllSubmenus();
  }

  // Main hamburger toggle
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Submenu toggle (click again closes)
  submenuParents.forEach((li) => {
    const btn = li.querySelector(".submenu-toggle");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = li.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));

      // close other submenus
      if (isOpen) closeAllSubmenus(li);
    });
  });

  // Close menu when clicking a normal link (mobile UX)
  document.querySelectorAll(".menu a").forEach((a) => {
    a.addEventListener("click", () => {
      // only auto-close if hamburger exists (mobile)
      if (window.matchMedia("(max-width: 767px)").matches) closeMenu();
    });
  });

  // Click outside closes menu (mobile)
  document.addEventListener("click", (e) => {
    if (!menu || !menuToggle) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle) closeMenu();
  });

  // ESC closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Desktop: open dropdown on hover as well (nice UX)
  submenuParents.forEach((li) => {
    li.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        li.classList.add("is-open");
        const btn = li.querySelector(".submenu-toggle");
        if (btn) btn.setAttribute("aria-expanded", "true");
      }
    });

    li.addEventListener("mouseleave", () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        li.classList.remove("is-open");
        const btn = li.querySelector(".submenu-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // When resizing to desktop, ensure menu is visible and not stuck in mobile-open state
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      menu.classList.remove("is-open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      closeAllSubmenus();
    }
  });
})();

// Your contact form script can stay separate on contact.html,
// but if you include it here too, it won't break anything if the elements don't exist.
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
