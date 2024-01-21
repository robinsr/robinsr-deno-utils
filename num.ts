/**
 * Returns an array of specified length
 * @param start number to start range
 * @param stop number to end range
 * @param step increment by
 */
export const range = (start: number, stop: number, step = 1): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);