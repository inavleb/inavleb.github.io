import './swr.js';
import './disqus.js';

import vcard from "./vcard.js";
import qrcode from "./qrcode.js";

function animate() {
  $('[data-business="chat"]').parent().addClass('animate__animated animate__heartBeat');
}

$(document).on('DOMContentLoaded', () => {
  vcard.$name = document.title;
  vcard.$phone = $('[data-business="phone"]').text().trim();
  vcard.$tel = vcard.$phone.replace(/\D+/g, '');
  qrcode.style = document.createElement('style');
  qrcode.style.type = 'text/css';
  qrcode.instance = qrcode(vcard({ name: vcard.$name, phone: vcard.$tel }));
  document.title = `${vcard.$name} ${$('[data-business="phone"]').text().trim()}`;

  $('.image-gallery').attr('title', function() { return $(this).attr('alt') }).attr('aria-label', function() { return $(this).attr('alt') }).attr('data-glightbox', function() { return `description: ${$(this).attr('alt')}`; });
  $('[data-business="phone"]').attr('href', `tel:${vcard.$tel}`).attr('title', `Ligar para ${vcard.$phone}`).attr('aria-label', function() { return $(this).attr('title'); });
  $('[data-business="chat"]').attr('title', function() { return `Conversar com ${vcard.$name} no ${$(this).text().trim()}`; }).attr('aria-label', function() { return $(this).attr('title'); });

  $('[data-business="chat"]').parent().on('animationend', function() {
    $(this).removeClass('animate__animated animate__heartBeat');
    $('[data-business="phone"]').addClass('animate__animated animate__shakeX');
  });

  $('[data-business="phone"]').on('animationend', function() {
    $(this).removeClass('animate__animated animate__shakeX');
    setTimeout(animate, 10000);
  });

  $('[data-btn-download="qr-code"]').click(() => {
    return setTimeout(() => qrcode.instance.download({ name: `QR code de ${vcard.$name}` }), 0), false;
  });
});

$(window).on('load', () => {
  qrcode.instance.getRawData().then(blob => {
    qrcode.blob = blob;
    qrcode.blobURL = URL.createObjectURL(blob);
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