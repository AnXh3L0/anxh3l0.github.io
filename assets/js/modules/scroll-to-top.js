export function initScrollToTop() {
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
