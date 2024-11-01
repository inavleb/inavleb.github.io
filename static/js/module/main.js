import './swr.js';
import './disqus.js';

import vcard from "./vcard.js";
import qrcode from "./qrcode.js";

function animate() {
  $('[data-business="chat"]').parent().addClass('animate__animated animate__heartBeat');
}

$(window).on('load', () => {
  vcard.fn = document.title;
  vcard.phone = $('[data-business="phone"]').text().trim();
  vcard.tel = vcard.phone.replace(/\D+/g, '');
  qrcode.instance = qrcode(vcard({ name: vcard.fn, phone: vcard.tel }));
  document.title = `${vcard.fn} ${$('[data-business="phone"]').text().trim()}`;

  $('.image-gallery').attr('title', function() { return $(this).attr('alt') }).attr('aria-label', function() { return $(this).attr('alt') }).attr('data-glightbox', function() { return `description: ${$(this).attr('alt')}`; });
  $('[data-business="phone"]').attr('href', `tel:${vcard.tel}`).attr('title', `Ligar para ${vcard.phone}`).attr('aria-label', function() { return $(this).attr('title'); });
  $('[data-business="chat"]').attr('title', function() { return `Conversar com ${vcard.fn} no ${$(this).text().trim()}`; }).attr('aria-label', function() { return $(this).attr('title'); });

  $('[data-business="chat"]').parent().on('animationend', function() {
    $(this).removeClass('animate__animated animate__heartBeat');
    $('[data-business="phone"]').addClass('animate__animated animate__shakeX');
  });

  $('[data-business="phone"]').on('animationend', function() {
    $(this).removeClass('animate__animated animate__shakeX');
    setTimeout(animate, 10000);
  });

  $('[data-btn-download="qr-code"]').click(() => {
    return setTimeout(() => qrcode.instance.download({ name: `QR code de ${vcard.fn}` }), 0), false;
  });

  qrcode.instance.getRawData().then(blob => {
    qrcode.blob = blob;
    qrcode.style = document.createElement('style');
    qrcode.blobURL = URL.createObjectURL(blob);
    qrcode.style.type = 'text/css';
    qrcode.style.innerHTML = `.qr-code { background-image: url("${qrcode.blobURL}"); }`;

    $(document.head).append(qrcode.style);
    $(document.body).waitForImages(function() {
      $(SPLASH_SCREEN).fadeOut(() => {
        $(this).removeClass('overflow-hidden');
        setTimeout(() => {
          $(myTab).animate({ scrollLeft: $('#qr-code-tab').position().left });
          setTimeout(() => {
            $(myTab).animate({ scrollLeft: 0 });
            setTimeout(animate, 500);
          }, 500);
        }, 250);
      });
    });

    GLightbox({ selector: '.map-gallery' });
    GLightbox({ selector: '.image-gallery' });
  });

  return false;
});