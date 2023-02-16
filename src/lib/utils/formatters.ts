import { format } from 'date-fns'

/**
 * Format date formatted as 'ISO' to a pattern.
 * @param {string} unformattedDate The date to be formatted.
 * @param {string} pattern The pattern to format the date.
 * @returns {string} a string with the date formatted.
 * @example
 * formatISODate('2021-01-01T00:00:00.000Z', 'dd/MM/yyyy') // '01/01/2021'
 */
export function formatDate(unformattedDate: string, pattern: string): string {
  const [date] = unformattedDate.split('T')
  const [year, month, day] = date.split('-').map(Number)
  const dateObject = new Date(year, month, day)
  return format(dateObject, pattern)
}

/**
 * Format number values to BRL currency.
 * @param {number} value The value to be formatted.
 * @returns {string} a string with the value formatted to BRL currency.
 */
export function formatCurrency(value: number | undefined): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value ? value / 100 : 0,
  )
}
