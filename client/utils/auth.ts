export const phoneMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  let formatted = '';
  if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
    formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  } else if (cleaned.startsWith('9')) {
    formatted = `+7 (9${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  } else {
    formatted = `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
  }
  return formatted.slice(0, 18);
};


