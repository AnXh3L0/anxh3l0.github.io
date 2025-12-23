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

  // Scroll to Top Button
  function initializeScrollToTop() {
    const scrollButton = document.getElementById("scroll-to-top");
    if (!scrollButton) return;

    let isVisible = false;
    const threshold = 400;

    const toggleVisibility = () => {
      const shouldShow = window.scrollY > threshold;
      if (shouldShow !== isVisible) {
        isVisible = shouldShow;
        scrollButton.classList.toggle("opacity-0", !isVisible);
        scrollButton.classList.toggle("pointer-events-none", !isVisible);
        scrollButton.classList.toggle("translate-y-2", !isVisible);
      }
    };

    scrollButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
  }

  // Copy Code Button
  function initializeCopyCode() {
    const codeBlocks = document.querySelectorAll("pre > code");
    
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre || pre.querySelector(".copy-code-button")) return;

      // Create wrapper if needed
      pre.style.position = "relative";

      const button = document.createElement("button");
      button.className = "copy-code-button";
      button.setAttribute("aria-label", "Copy code to clipboard");
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;

      button.addEventListener("click", async () => {
        const code = codeBlock.textContent;
        try {
          await navigator.clipboard.writeText(code);
          
          // Show success state
          const copyIcon = button.querySelector(".copy-icon");
          const checkIcon = button.querySelector(".check-icon");
          copyIcon.style.display = "none";
          checkIcon.style.display = "block";
          button.classList.add("copied");

          setTimeout(() => {
            copyIcon.style.display = "block";
            checkIcon.style.display = "none";
            button.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });

      pre.appendChild(button);
    });
  }

  // External Link Handler - open in new tab with security attributes
  function initializeExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    const currentHost = window.location.hostname;

    links.forEach((link) => {
      try {
        const url = new URL(link.href);
        if (url.hostname !== currentHost) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      } catch (e) {
        // Invalid URL, skip
      }
    });
  }

  // Keyboard Navigation - Feature 8
  function initializeKeyboardNavigation() {
    // Only enable on post pages
    const article = document.querySelector("article[data-post-url]");
    if (!article) return;

    const prevLink = document.querySelector('[data-post-nav="prev"]');
    const nextLink = document.querySelector('[data-post-nav="next"]');

    // Create keyboard hint element
    const hint = document.createElement("div");
    hint.className = "keyboard-hint";
    hint.innerHTML = `<kbd>J</kbd>/<kbd>K</kbd> navigate posts · <kbd>↑</kbd> scroll to top`;
    document.body.appendChild(hint);

    let hintTimeout;
    let hasShownHint = sessionStorage.getItem("keyboardHintShown");

    // Show hint once per session
    if (!hasShownHint) {
      setTimeout(() => {
        hint.classList.add("visible");
        sessionStorage.setItem("keyboardHintShown", "true");
        
        hintTimeout = setTimeout(() => {
          hint.classList.remove("visible");
        }, 5000);
      }, 2000);
    }

    document.addEventListener("keydown", (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "j":
          // Next post (older)
          if (nextLink) {
            e.preventDefault();
            nextLink.click();
          }
          break;
        case "k":
          // Previous post (newer)
          if (prevLink) {
            e.preventDefault();
            prevLink.click();
          }
          break;
        case "home":
          // Scroll to top
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "end":
          // Scroll to bottom
          e.preventDefault();
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          break;
        case "t":
          // Toggle theme with 't' key
          const themeToggle = document.querySelector(".theme-toggle");
          if (themeToggle && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            themeToggle.click();
          }
          break;
      }
    });

    // Show hint briefly when user focuses on navigation
    [prevLink, nextLink].forEach(link => {
      if (link) {
        link.addEventListener("focus", () => {
          clearTimeout(hintTimeout);
          hint.classList.add("visible");
          hintTimeout = setTimeout(() => {
            hint.classList.remove("visible");
          }, 3000);
        });
      }
    });
  }

  // Code block enhancements - language badges
  function initializeCodeBlocks() {
    document.querySelectorAll('.prose pre code').forEach(codeBlock => {
      // Skip if already processed
      if (codeBlock.dataset.enhanced) return;
      codeBlock.dataset.enhanced = 'true';
      
      const pre = codeBlock.parentElement;
      
      // Try to detect language from class
      const langMatch = codeBlock.className.match(/language-(\w+)/);
      if (langMatch && langMatch[1] !== 'plaintext' && langMatch[1] !== 'text') {
        const lang = langMatch[1];
        const badge = document.createElement('span');
        badge.className = 'code-language';
        badge.textContent = lang;
        pre.appendChild(badge);
        pre.classList.add('has-language-badge');
      }
    });
  }

  // Initialize systems
  handleTheme();
  initializeMobileMenu();
  initializeHeaderAnimations();
  handleLanguageSwitcher();
  initializeScrollToTop();
  initializeCopyCode();
  initializeExternalLinks();
  initializeKeyboardNavigation();
  initializeCodeBlocks();
});
