import { format } from 'date-fns'

/**
 * Format date values from yyyy-MM-dd to dd/mm/yyyy or dd/mm/yyyy hh:mm format.
 * @param {string} unformattedDate The date to be formatted.
 * @returns {string} a string with the date formatted.
 * @example
 * formatDate('2021-01-01') // '01/01/2021'
 * formatDate('2021-01-01T12:00:00') // '01/01/2021 12:00'
 */
export function formatDate(unformattedDate: string): string {
  const [date, time] = unformattedDate.split('T')
  const [year, month, day] = date.split('-')
  const dateString = `${day}/${month}/${year}`
  if (time) {
    const [hour, minute] = time.split(':').map(Number)
    return `${dateString} ${hour}:${minute}`
  }

  return dateString
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

/**
 * Format ISO date string to desired format.
 * @param {string} date The date to be formatted.
 * @param {string} outFormat The desired format.
 */
export function dateToFormat(date: string, outFormat: string): string {
  return format(new Date(date), outFormat)
}
