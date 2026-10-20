// Runs while the HTML is parsed, before React or the first site paint.
// No cover is installed when JavaScript is disabled.
export const introBootstrap = `(() => {
  const root = document.documentElement;
  if (location.pathname !== '/' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { if (sessionStorage.getItem('barber-studio:intro:v2') === 'seen') return; } catch {}
  root.dataset.introPending = 'true';
  setTimeout(() => {
    if (root.dataset.introPending === 'true') {
      delete root.dataset.introPending;
      root.dataset.introExpired = 'true';
    }
  }, 5000);
})();`;
