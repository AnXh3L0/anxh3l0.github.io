document.addEventListener("DOMContentLoaded", () => {
  // Improved Theme Toggle
  function handleTheme() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return;

    // Get icon elements using explicit classes
    const icons = {
      light: themeToggle.querySelector(".theme-icon-light"),
      dark: themeToggle.querySelector(".theme-icon-dark"),
      system: themeToggle.querySelector(".theme-icon-system"),
    };

    // Add error checking for icons
    if (!icons.light || !icons.dark || !icons.system) {
      console.error("Missing theme icons!");
      return;
    }

    const getSystemTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const getTheme = () => localStorage.getItem("theme") || "system";

    const handleSystemChange = (e) => {
      const currentStoredTheme = localStorage.getItem("theme");
      const systemTheme = e.matches ? "dark" : "light";

      if (currentStoredTheme === "system") {
        document.documentElement.setAttribute("data-theme", systemTheme);
      }
    };

    const updateIcons = (theme) => {
      // Hide all icons
      Object.values(icons).forEach((icon) => (icon.style.display = "none"));

      // Show system icon for system theme
      if (theme === "system") {
        icons.system.style.display = "block";
      }
      // Show light/dark based on effective theme
      else {
        const effectiveTheme = theme === "system" ? getSystemTheme() : theme;
        icons[effectiveTheme].style.display = "block";
      }
    };

    const setTheme = (theme) => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      let effectiveTheme = theme === "system" ? getSystemTheme() : theme;

      // Cleanup previous listeners
      mediaQuery.removeEventListener("change", handleSystemChange);

      if (theme === "system") {
        mediaQuery.addEventListener("change", handleSystemChange);
      }

      document.documentElement.setAttribute("data-theme", effectiveTheme);
      localStorage.setItem("theme", theme);
      updateIcons(theme);

      // Update aria label
      const nextTheme =
        theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
      themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    };

    // Initialize
    const initialTheme = getTheme();
    setTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
      const currentTheme = getTheme();
      const newTheme =
        currentTheme === "light"
          ? "dark"
          : currentTheme === "dark"
            ? "system"
            : "light";
      setTheme(newTheme);
    });
  }

  function initializeHeaderAnimations() {
    const header = document.querySelector("header");
    const avatarLink = document.querySelector('[aria-label="Home"]');
    if (!header) return;

    // Use data attribute for more reliable home page check
    const isHomePage = document.querySelector('[data-homepage]') !== null;

    // Add required CSS variables
    document.documentElement.style.setProperty("--header-position", "sticky");
    document.documentElement.style.setProperty("--avatar-border-opacity", "0");

    let ticking = false;

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const updateStyles = () => {
      if (!header) return;

      const { top, height } = header.getBoundingClientRect();
      const scrollY = clamp(
        window.scrollY,
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      let downDelay = 0;
      if (isHomePage && avatarLink) {
        downDelay = avatarLink.offsetTop;
      }
      const upDelay = 64;

      // Header height calculations
      const headerHeight = isHomePage ? downDelay + height - scrollY : height;

      document.documentElement.style.setProperty(
        "--header-height",
        `${clamp(headerHeight, height, downDelay + height)}px`
      );

      // Avatar transformations
      if (isHomePage && avatarLink) {
        const fromScale = 1;
        const toScale = 36 / 64;
        const fromX = 0;
        const toX = 2 / 16;
        const progress = clamp(scrollY / downDelay, 0, 1);

        const scale = fromScale + (toScale - fromScale) * progress;
        const x = fromX + (toX - fromX) * progress;

        document.documentElement.style.setProperty(
          "--avatar-image-transform",
          `translate3d(${x}rem, 0, 0) scale(${scale})`
        );

        const borderScale = 1 / (toScale / scale);
        const borderX = (-toX + x) * borderScale;
        document.documentElement.style.setProperty(
          "--avatar-border-transform",
          `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`
        );
        document.documentElement.style.setProperty(
          "--avatar-border-opacity",
          scale <= toScale ? "1" : "0"
        );
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateStyles);
        ticking = true;
      }
    };

    updateStyles();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", updateStyles);
  }

  function handleLanguageSwitcher() {
    const switcher = document.querySelector(".language-switcher");
    if (!switcher) return;

    const dropdown = document.getElementById("language-dropdown");
    let isOpen = false;

    const toggleDropdown = () => {
      isOpen = !isOpen;
      switcher.setAttribute("aria-expanded", isOpen.toString());
      dropdown.classList.toggle("hidden");
      dropdown.classList.toggle("opacity-0");
      dropdown.classList.toggle("scale-95");
      dropdown.classList.toggle("opacity-100");
      dropdown.classList.toggle("scale-100");
    };

    const closeDropdown = () => {
      if (isOpen) {
        isOpen = false;
        switcher.setAttribute("aria-expanded", "false");
        dropdown.classList.add("hidden");
        dropdown.classList.remove("opacity-100", "scale-100");
        dropdown.classList.add("opacity-0", "scale-95");
      }
    };

    switcher.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener("click", closeDropdown);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });
  }

  function initializeMobileMenu() {
    const menuButton = document.querySelector(".mobile-menu-button");
    const backdrop = document.querySelector(".mobile-menu-backdrop");
    const panel = document.querySelector(".mobile-menu-panel");
    const closeButton = document.querySelector(".mobile-menu-close");

    if (!menuButton || !backdrop || !panel || !closeButton) {
      console.error("Mobile menu elements not found:", {
        menuButton: !!menuButton,
        backdrop: !!backdrop,
        panel: !!panel,
        closeButton: !!closeButton
      });
      return;
    }

    let isAnimating = false;
    let isOpen = false;

    const toggleMenu = (show) => {
      if (isAnimating || isOpen === show) return;
      isAnimating = true;
      isOpen = show;

      // Toggle visibility
      if (show) {
        backdrop.style.display = "block";
        panel.style.display = "block";
        document.body.style.overflow = "hidden";
      }

      // Animate transitions
      requestAnimationFrame(() => {
        backdrop.style.opacity = show ? "1" : "0";
        panel.style.opacity = show ? "1" : "0";
        panel.style.transform = show ? "scale(1)" : "scale(0.95)";

        // Handle final state after animation
        setTimeout(() => {
          if (!show) {
            backdrop.style.display = "none";
            panel.style.display = "none";
            document.body.style.overflow = "";
          }
          isAnimating = false;
        }, 150); // Match transition duration
      });

      menuButton.setAttribute("aria-expanded", show);
    };

    // Event listeners
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMenu(true);
    });
    
    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMenu(false);
    });
    
    backdrop.addEventListener("click", () => {
      toggleMenu(false);
    });

    // Escape key handler
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) {
        toggleMenu(false);
      }
    });
  }

  // Initialize systems
  handleTheme();
  initializeMobileMenu();
  initializeHeaderAnimations();
  handleLanguageSwitcher();
});
