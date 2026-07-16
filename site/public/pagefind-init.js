/* Pagefind search UI init — external (not inline) so a strict Content-Security
   -Policy (script-src 'self', no unsafe-inline) covers it. Loaded after
   pagefind-ui.js, which defines window.PagefindUI. */
window.addEventListener('DOMContentLoaded', () => {
  if (!window.PagefindUI) return;
  new window.PagefindUI({
    element: '#search',
    showSubResults: true,
    showImages: false,
    resetStyles: false,
  });

  // Support ?q= from the header search field.
  const q = new URLSearchParams(window.location.search).get('q');
  if (q) {
    const input = document.querySelector('#search input');
    if (input) {
      input.value = q;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
});
