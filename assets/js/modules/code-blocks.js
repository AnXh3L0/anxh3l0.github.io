export function initCodeBlocks() {
  document.querySelectorAll('.prose pre code').forEach(codeBlock => {
    if (codeBlock.dataset.enhanced) return;
    codeBlock.dataset.enhanced = 'true';

    const pre = codeBlock.parentElement;
    const langMatch = codeBlock.className.match(/language-(\w+)/);
    if (langMatch && langMatch[1] !== 'plaintext' && langMatch[1] !== 'text') {
      const badge = document.createElement('span');
      badge.className = 'code-language';
      badge.textContent = langMatch[1];
      pre.appendChild(badge);
      pre.classList.add('has-language-badge');
    }
  });
}
