export function configKeySanitize(input: string): string {
  return input
    .trim()
    .replace(/ /g, '-')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9-_]+/g, '');
}
