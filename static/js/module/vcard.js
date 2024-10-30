const vcard = data => {
  if (Object.prototype.toString.call(data) !== '[object Object]') data = Object.create(null);

  data.$ = ['BEGIN:VCARD', 'VERSION:3.0'];
  data.fn = typeof data.fn === 'string' && data.fn.trim();
  data.tel = typeof data.tel === 'string' && data.tel.trim();

  if (data.fn) data.$.push(`N:;${data.fn}`, `FN:${data.fn}`);
  if (data.tel) data.$.push(`TEL:${data.tel}`);

  return data.$.push('END:VCARD'), data.$.join('\n');
};

export default vcard;