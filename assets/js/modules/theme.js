export function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  const icons = {
    light: themeToggle.querySelector(".theme-icon-light"),
    dark: themeToggle.querySelector(".theme-icon-dark"),
    system: themeToggle.querySelector(".theme-icon-system"),
  };

  if (!icons.light || !icons.dark || !icons.system) return;

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const getTheme = () => localStorage.getItem("theme") || "system";

  const handleSystemChange = (e) => {
    if (localStorage.getItem("theme") === "system") {
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    }
  };

  const updateIcons = (theme) => {
    Object.values(icons).forEach((icon) => (icon.style.display = "none"));
    if (theme === "system") {
      icons.system.style.display = "block";
    } else {
      icons[theme === "system" ? getSystemTheme() : theme].style.display = "block";
    }
  };

  const setTheme = (theme) => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const effectiveTheme = theme === "system" ? getSystemTheme() : theme;

    mediaQuery.removeEventListener("change", handleSystemChange);
    if (theme === "system") {
      mediaQuery.addEventListener("change", handleSystemChange);
    }

    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem("theme", theme);
    updateIcons(theme);

    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  };

  setTheme(getTheme());

  themeToggle.addEventListener("click", () => {
    const current = getTheme();
    setTheme(current === "light" ? "dark" : current === "dark" ? "system" : "light");
  });
}
