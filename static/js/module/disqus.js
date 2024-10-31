window.addEventListener('load', function(evt) {
  const host = location.host;
  const script = document.createElement('script');
  const protocol = location.protocol;
  const pathname = location.pathname;

  const username = 'inavleb';
  const page_url = `${protocol}//${host}${pathname}`;
  const page_identifier = (CRC32.str(page_url) >>> 0).toString(16);

  script.src = `//${username}.disqus.com/embed.js`;
  script.dataset.timestamp = Date.now();
  this.disqus_config = function() {
    this.page.url = page_url;
    this.page.identifier = page_identifier;
  };

  (document.body || document.head).append(script);
}, false);