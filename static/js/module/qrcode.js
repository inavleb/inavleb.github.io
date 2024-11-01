export default data => {
  return new QRCodeStyling({
    data,
    width: 1024,
    height: 1024,
    type: 'svg',
    margin: 25,
    qrOptions: { errorCorrectionLevel: 'M' },
    dotsOptions: { type: 'dots', color: '#212429' },
    cornersDotOptions: { type: 'dot' },
    cornersSquareOptions: { type: 'dot' }
  });
};