export function initCopyCode() {
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (!pre || pre.querySelector(".copy-code-button")) return;

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
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
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
