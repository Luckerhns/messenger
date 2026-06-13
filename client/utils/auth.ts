export const phoneMask = (value: string): string => {
  // Remove all non-digits
  const cleanValue = value.replace(/[^\d]/g, '');
  
  // Match Russian phone: +7 (999) 999-99-99
  const match = cleanValue.match(/^7?(\d{0,10})$/);
  
  if (!match) return value;
  
  const digits = match[1];
  if (digits.length === 0) return '';
  if (digits.length <= 1) return '+7 ' + digits;
  if (digits.length <= 3) return '+7 (' + digits;
  if (digits.length <= 5) return '+7 (' + digits.substring(0,3) + ') ' + digits.substring(3);
  if (digits.length <= 6) return '+7 (' + digits.substring(0,3) + ') ' + digits.substring(3);
  if (digits.length <= 8) return '+7 (' + digits.substring(0,3) + ') ' + digits.substring(3,6) + '-' + digits.substring(6);
  if (digits.length <= 10) return '+7 (' + digits.substring(0,3) + ') ' + digits.substring(3,6) + '-' + digits.substring(6,8) + '-' + digits.substring(8);
  
  // Full format
  return '+7 (' + digits.substring(0,3) + ') ' + digits.substring(3,6) + '-' + digits.substring(6,8) + '-' + digits.substring(8,10);
};
