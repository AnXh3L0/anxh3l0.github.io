export function initExternalLinks() {
  const currentHost = window.location.hostname;

  document.querySelectorAll('a[href^="http"]').forEach((link) => {
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
