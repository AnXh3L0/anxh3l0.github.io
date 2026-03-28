export function initMobileMenu() {
  const menuButton = document.querySelector(".mobile-menu-button");
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  const panel = document.querySelector(".mobile-menu-panel");
  const closeButton = document.querySelector(".mobile-menu-close");

  if (!menuButton || !backdrop || !panel || !closeButton) return;

  let isAnimating = false;
  let isOpen = false;

  const toggleMenu = (show) => {
    if (isAnimating || isOpen === show) return;
    isAnimating = true;
    isOpen = show;

    if (show) {
      backdrop.style.display = "block";
      panel.style.display = "block";
      document.body.style.overflow = "hidden";
    }

    requestAnimationFrame(() => {
      backdrop.style.opacity = show ? "1" : "0";
      panel.style.opacity = show ? "1" : "0";
      panel.style.transform = show ? "scale(1)" : "scale(0.95)";

      setTimeout(() => {
        if (!show) {
          backdrop.style.display = "none";
          panel.style.display = "none";
          document.body.style.overflow = "";
        }
        isAnimating = false;
      }, 150);
    });

    menuButton.setAttribute("aria-expanded", show);
  };

  menuButton.addEventListener("click", (e) => { e.preventDefault(); toggleMenu(true); });
  closeButton.addEventListener("click", (e) => { e.preventDefault(); toggleMenu(false); });
  backdrop.addEventListener("click", () => { toggleMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen) toggleMenu(false); });
}
