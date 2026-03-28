export function initShareButton() {
  const nativeShareBtn = document.querySelector('.native-share-btn');

  if (nativeShareBtn && navigator.share) {
    nativeShareBtn.classList.remove('hidden');
    nativeShareBtn.classList.add('flex');

    nativeShareBtn.addEventListener('click', async () => {
      try {
        await navigator.share({
          title: nativeShareBtn.dataset.title,
          text: nativeShareBtn.dataset.text,
          url: nativeShareBtn.dataset.url
        });
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Share failed:', err);
      }
    });
  }

  const copyLinkBtn = document.querySelector('.copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      const copyIcon = copyLinkBtn.querySelector('.copy-icon');
      const checkIcon = copyLinkBtn.querySelector('.check-icon');

      try {
        await navigator.clipboard.writeText(copyLinkBtn.dataset.url);
        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');
        copyLinkBtn.classList.add('bg-teal-500', 'text-white');

        setTimeout(() => {
          copyIcon.classList.remove('hidden');
          checkIcon.classList.add('hidden');
          copyLinkBtn.classList.remove('bg-teal-500', 'text-white');
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }
}
