let idCounter = 0;

/**
 * @deprecated use React.useId() instead
 */
export function generateId() {
  return String(idCounter++);
}
