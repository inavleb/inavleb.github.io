const qrcode = data => {
  const qr = new QRCodeStyling({
    data,
    width: 512,
    height: 512,
    type: 'svg',
    // image: '/static/img/svg/tel-icon.svg',
    margin: 25,
    qrOptions: {
      errorCorrectionLevel: 'M'
    },

    dotsOptions: {
      type: 'dots',
      color: '#212429'
    },

    /*imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0
    },*/

    cornersDotOptions: {
      type: 'dot'
    },

    backgroundOptions: {},

    cornersSquareOptions: {
      type: 'dot'
    }
  });

  return qr;
};

export default qrcode;