export const capitalize = (s: string) => {
  const firstLetter = s.charAt(0);
  if (firstLetter === undefined) {
    return '';
  }
  return firstLetter.toUpperCase() + s.slice(1);
};

export const splitByCamelCase = (s: string) => {
  return s.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const labelText = (s: string) => {
  return capitalize(splitByCamelCase(s));
};

export function splitNewLine(text: string) {
  return text.split(/\r\n|\r|\n/);
}
