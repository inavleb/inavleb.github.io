export default contact => {
  if (Object.prototype.toString.call(contact) !== '[object Object]') contact = Object.create(null);

  contact._ = ['BEGIN:VCARD', 'VERSION:4.0'];
  contact.name = typeof contact.name === 'string' && contact.name.trim();
  contact.phone = typeof contact.phone === 'string' && contact.phone.trim();

  if (contact.name) contact._.push(`N:;${contact.name}`);
  if (contact.phone) contact._.push(`TEL:${contact.phone}`);

  return contact._.push('END:VCARD'), contact._.join('\n');
};