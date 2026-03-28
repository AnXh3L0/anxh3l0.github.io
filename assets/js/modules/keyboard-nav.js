export function initKeyboardNavigation() {
  const article = document.querySelector("article[data-post-url]");
  if (!article) return;

  const prevLink = document.querySelector('[data-post-nav="prev"]');
  const nextLink = document.querySelector('[data-post-nav="next"]');

  const hint = document.createElement("div");
  hint.className = "keyboard-hint";
  hint.innerHTML = `<kbd>J</kbd>/<kbd>K</kbd> navigate posts · <kbd>↑</kbd> scroll to top`;
  document.body.appendChild(hint);

  let hintTimeout;
  const hasShownHint = sessionStorage.getItem("keyboardHintShown");

  if (!hasShownHint) {
    setTimeout(() => {
      hint.classList.add("visible");
      sessionStorage.setItem("keyboardHintShown", "true");
      hintTimeout = setTimeout(() => { hint.classList.remove("visible"); }, 5000);
    }, 2000);
  }

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;

    switch (e.key.toLowerCase()) {
      case "j":
        if (nextLink) { e.preventDefault(); nextLink.click(); }
        break;
      case "k":
        if (prevLink) { e.preventDefault(); prevLink.click(); }
        break;
      case "home":
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "end":
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        break;
      case "t":
        if (!e.ctrlKey && !e.metaKey) {
          const toggle = document.querySelector(".theme-toggle");
          if (toggle) { e.preventDefault(); toggle.click(); }
        }
        break;
    }
  });

  [prevLink, nextLink].forEach(link => {
    if (link) {
      link.addEventListener("focus", () => {
        clearTimeout(hintTimeout);
        hint.classList.add("visible");
        hintTimeout = setTimeout(() => { hint.classList.remove("visible"); }, 3000);
      });
    }
  });
}
