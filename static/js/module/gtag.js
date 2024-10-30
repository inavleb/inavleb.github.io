const TAG_ID = 'G-4528RJHMH6';

(function(script) {
  if (!script) return;

  script.src = `//www.googletagmanager.com/gtag/js?id=${TAG_ID}`;
  script.async = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { dataLayer.push(arguments); };

  gtag('js', new Date());
  gtag('config', TAG_ID);

  (document.body || document.head).append(script);
})((location.hostname !== 'localhost') && document.createElement('script'));