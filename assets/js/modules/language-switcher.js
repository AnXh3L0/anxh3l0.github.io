export function initLanguageSwitcher() {
  const switcher = document.querySelector(".language-switcher");
  if (!switcher) return;

  const dropdown = document.getElementById("language-dropdown");
  let isOpen = false;

  const closeDropdown = () => {
    if (!isOpen) return;
    isOpen = false;
    switcher.setAttribute("aria-expanded", "false");
    dropdown.classList.add("hidden", "opacity-0", "scale-95");
    dropdown.classList.remove("opacity-100", "scale-100");
  };

  switcher.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    switcher.setAttribute("aria-expanded", isOpen.toString());
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("opacity-0");
    dropdown.classList.toggle("scale-95");
    dropdown.classList.toggle("opacity-100");
    dropdown.classList.toggle("scale-100");
  });

  document.addEventListener("click", closeDropdown);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDropdown(); });
}
