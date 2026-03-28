import { initTheme } from './modules/theme.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initLanguageSwitcher } from './modules/language-switcher.js';
import { initScrollToTop } from './modules/scroll-to-top.js';
import { initCopyCode } from './modules/copy-code.js';
import { initExternalLinks } from './modules/external-links.js';
import { initKeyboardNavigation } from './modules/keyboard-nav.js';
import { initCodeBlocks } from './modules/code-blocks.js';
import { initShareButton } from './modules/share-button.js';
import { initCitationCopy } from './modules/citation.js';
import { initLightbox } from './modules/lightbox.js';

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initLanguageSwitcher();
  initScrollToTop();
  initCopyCode();
  initExternalLinks();
  initKeyboardNavigation();
  initCodeBlocks();
  initShareButton();
  initCitationCopy();
  initLightbox();
});
