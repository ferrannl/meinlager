// ==========================
// NAV (hamburger + submenus)
// ==========================
(function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleNav);

    // Close when clicking any normal link (mobile UX)
    navMenu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) closeNav();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close if you click outside the menu (mobile)
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("nav-open")) return;
      const clickedInsideNav = e.target.closest(".nav") || e.target.closest(".menu");
      if (!clickedInsideNav && !e.target.closest("#navToggle")) closeNav();
    });
  }

  // Submenu toggles for mobile (and also works on desktop click)
  const submenuButtons = document.querySelectorAll(".submenu-toggle");
  submenuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const li = btn.closest(".has-submenu");
      if (!li) return;

      const isOpen = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));

      // Optional: close other submenus on mobile for neatness
      submenuButtons.forEach((otherBtn) => {
        if (otherBtn === btn) return;
        const otherLi = otherBtn.closest(".has-submenu");
        if (otherLi) {
          otherLi.classList.remove("open");
          otherBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  // If window is resized to desktop, ensure menu panel isn't stuck "open"
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      // Keep body.nav-open harmless, but you can close it:
      closeNav();
    }
  });
})();


// ===================================
// CONTACT FORM SUCCESS MODAL (yours)
// (runs only if the elements exist)
// ===================================
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
