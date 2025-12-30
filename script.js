// --- HAMBURGER + SUBMENU FIXES ---

const menuCheckbox = document.getElementById("check");
const menu = document.getElementById("mainMenu");
const toggles = document.querySelectorAll(".menu-toggle");

// Helper: close all submenus
function closeAllSubmenus() {
  document.querySelectorAll(".has-submenu").forEach((li) => {
    li.classList.remove("open");
    const btn = li.querySelector(".menu-toggle");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
}

// Toggle submenu on click (mobile behavior)
toggles.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // On wide screens we let CSS hover handle it
    if (window.matchMedia("(min-width: 700px)").matches) return;

    const parent = btn.closest(".has-submenu");
    const isOpen = parent.classList.contains("open");

    closeAllSubmenus();
    parent.classList.toggle("open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
});

// Close hamburger menu when clicking a link
menu.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  // close mobile menu
  if (!window.matchMedia("(min-width: 700px)").matches) {
    menuCheckbox.checked = false;
    closeAllSubmenus();
  }
});

// Clicking outside menu closes it (mobile)
document.addEventListener("click", (e) => {
  if (window.matchMedia("(min-width: 700px)").matches) return;

  const nav = e.target.closest(".nav");
  if (!nav && menuCheckbox.checked) {
    menuCheckbox.checked = false;
    closeAllSubmenus();
  }
});

// When switching to desktop/tablet, clean mobile states
window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 700px)").matches) {
    // ensure checkbox doesn't keep menu "stuck"
    menuCheckbox.checked = false;
    closeAllSubmenus();
  }
});
