// --- NAV / HAMBURGER (fixed toggle + no offscreen + close on click) ---
(function () {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const toggleBtn = nav.querySelector(".nav-toggle");
  const panel = nav.querySelector(".nav-panel");
  const backdrop = nav.querySelector(".nav-backdrop");
  const submenuToggles = nav.querySelectorAll(".submenu-toggle");
  const desktopMQ = window.matchMedia("(min-width: 900px)");

  function setOpen(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    toggleBtn?.setAttribute("aria-expanded", String(isOpen));
    if (backdrop) {
      backdrop.hidden = !isOpen;
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  // toggle open/close
  toggleBtn?.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    setOpen(!isOpen);
  });

  // click backdrop closes
  backdrop?.addEventListener("click", () => setOpen(false));

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // mobile submenu toggle (tap-to-open)
  submenuToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Desktop uses hover dropdown: do nothing special
      if (desktopMQ.matches) return;

      const li = btn.closest(".menu-item");
      const isOpen = li.classList.contains("is-open");

      // close other submenus
      nav.querySelectorAll(".menu-item.has-submenu").forEach((x) => {
        if (x !== li) {
          x.classList.remove("is-open");
          const b = x.querySelector(".submenu-toggle");
          b?.setAttribute("aria-expanded", "false");
        }
      });

      li.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // close menu when clicking a link (mobile)
  nav.querySelectorAll('a[href]').forEach((a) => {
    a.addEventListener("click", () => {
      if (!desktopMQ.matches) setOpen(false);
    });
  });

  // If resizing to desktop, reset mobile state
  function syncToViewport() {
    if (desktopMQ.matches) {
      setOpen(false);
      nav.querySelectorAll(".menu-item.has-submenu").forEach((x) => {
        x.classList.remove("is-open");
        const b = x.querySelector(".submenu-toggle");
        b?.setAttribute("aria-expanded", "false");
      });
    }
  }
  desktopMQ.addEventListener?.("change", syncToViewport);
  window.addEventListener("resize", syncToViewport);
  syncToViewport();
})();


// --- CONTACT FORM SCRIPT (keep, but safe if not on contact page) ---
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
