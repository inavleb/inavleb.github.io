import './swr.js';
import './gtag.js';
import './disqus.js';

import vcard from "./vcard.js";
import qrcode from "./qrcode.js";

function dialogTel(evt) {
  evt.preventDefault();
  location.assign(`tel:${vcard.tel}`);
}

function dialogChat(evt) {
  evt.preventDefault();

  if (this.id === 'btnSignalChat') location.assign('https://signal.me/#eu/JxNPlMl9PayTPSGVFeLg8bsCkhsuTH9Whom2DK7_Jm7lNsiufgdAx7xo6aY0C8W1');
  else if (this.id === 'btnTelegramChat') location.assign('https://t.me/deletric');
  else if (this.id === 'btnWhatsAppChat') location.assign('https://wa.me/message/NJFMCEDAZEMTN1');
}

$(window).on('load', () => {
  vcard.fn = document.title;
  vcard.tel = $('a[href="dialog:tel"]').attr('title', function() { return `Fazer chamada para ${$(this).text().trim()}`; }).attr('aria-label', function() { return $(this).attr('title'); }).text().replace(/\D+/g, '');
  qrcode.instance = qrcode(vcard({ fn: vcard.fn, tel: vcard.tel }));

  $('a[href="dialog:tel"]').click(dialogTel);
  $('a[href="dialog:chat"]').click(dialogChat).attr('title', function() { return `Conversar com ${vcard.fn} no ${$(this).text().trim()}`; }).attr('aria-label', function() { return $(this).attr('title'); });
  $('[ data-btn-download="qr-code"]').click(() => {
    qrcode.instance.download({
      name: `${vcard.fn} — ${$('a[href="dialog:tel"]').text()}.qr_code`
    });
  });

  qrcode.instance.getRawData().then(blob => {
    qrcode.blob = blob;
    qrcode.style = document.createElement('style');
    qrcode.blobURL = URL.createObjectURL(blob);
    qrcode.style.innerHTML = `.qr-code { background-image: url("${qrcode.blobURL}"); }`;

    $(document.head).append(qrcode.style);
    $(document.body).waitForImages(function() {
      $(splashScreen).fadeOut(() => $(this).removeClass('overflow-hidden'));
    });
  });
});