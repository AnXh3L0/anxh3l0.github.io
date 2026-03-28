export function initLightbox() {
  const content = document.querySelector('.e-content, .prose');
  if (!content) return;

  const images = content.querySelectorAll('img:not(.no-lightbox)');
  if (images.length === 0) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image preview');
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close" type="button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <img class="lightbox-img" src="" alt=""/>
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  images.forEach(img => {
    if (img.naturalWidth < 200 && img.naturalHeight < 200) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const fullSrc = img.dataset.fullSrc || img.src;
      open(fullSrc, img.alt);
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
