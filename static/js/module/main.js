import './swr.js';
import './disqus.js';

import vcard from "./vcard.js";
import qrcode from "./qrcode.js";

$(window).on('load', () => {
  vcard.fn = document.title;
  vcard.tel = $('[data-business="phone"]').attr('title', function() { return `Fazer chamada para ${$(this).text().trim()}`; }).attr('aria-label', function() { return $(this).attr('title'); }).text().replace(/\D+/g, '');
  qrcode.instance = qrcode(vcard({ fn: vcard.fn, tel: vcard.tel }));
  document.title = `${vcard.fn} ${$('[data-business="phone"]').text().trim()}`;

  $('[data-business="phone"]').attr('href', `tel:${vcard.tel}`);
  $('[data-business="chat"]').attr('title', function() { return `Conversar com ${vcard.fn} no ${$(this).text().trim()}`; }).attr('aria-label', function() { return $(this).attr('title'); });

  $('[ data-btn-download="qr-code"]').click(() => {
    qrcode.instance.download({
      name: `${vcard.fn} — ${$('a[href="dialog:tel"]').text().trim()}.qr_code`
    });

    return false;
  });

  qrcode.instance.getRawData().then(blob => {
    qrcode.blob = blob;
    qrcode.style = document.createElement('style');
    qrcode.blobURL = URL.createObjectURL(blob);
    qrcode.style.type = 'text/css';
    qrcode.style.innerHTML = `.qr-code { background-image: url("${qrcode.blobURL}"); }`;

    $(document.head).append(qrcode.style);
    $(document.body).waitForImages(function() {
      $(splashScreen).fadeOut(() => {
        $(this).removeClass('overflow-hidden');
        setTimeout(() => {
          $(myTab).animate({ scrollLeft: $('#disabled-tab').position().left });
          setTimeout(() => $(myTab).animate({ scrollLeft: 0 }), 350);
        }, 250);
      });
    });
  });

  return false;
});