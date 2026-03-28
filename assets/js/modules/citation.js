export function initCitationCopy() {
  document.querySelectorAll('.copy-citation-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const format = btn.dataset.format;
      const codeEl = btn.closest('.citation-format').querySelector(`code[data-format="${format}"]`);
      if (!codeEl) return;

      try {
        await navigator.clipboard.writeText(codeEl.textContent.trim());
        const originalText = btn.textContent;
        btn.textContent = '\u2713';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  });
}
