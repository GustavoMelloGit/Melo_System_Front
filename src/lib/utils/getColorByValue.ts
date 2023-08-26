/**
 * Returns a color based on value of a number.
 * @param {number} value The value to be formatted.
 * @returns {string} a string with the color.
 */
export function getColorByValue(value: number): string {
  if (value > 0) return 'green.500'
  if (value < 0) return 'red.400'
  return 'inherit'
}
