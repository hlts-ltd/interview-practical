export function listItems(length: number): number[] {
  return Array.from({ length }, (_, i) => i + 1);
}
