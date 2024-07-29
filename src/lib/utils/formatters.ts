import currency from 'currency.js'
import { format } from 'date-fns'
import { type Address, type ClientModel } from '../../domain/client/types/model/Client'
import GlobalConfig from '../constants/config'
import { ClientNameParser } from './ClientNameParser'

/**
 * Format date values from yyyy-MM-dd to dd/mm/yyyy or dd/mm/yyyy hh:mm format.
 * @param {string} unformattedDate The date to be formatted.
 * @returns {string} a string with the date formatted.
 * @example
 * formatDate('2021-01-01') // '01/01/2021'
 * formatDate('2021-01-01T12:00:00') // '01/01/2021 12:00'
 */
export function formatDate(unformattedDate: string, showTime: boolean = true): string {
  const [date, time] = unformattedDate.split('T')
  const [year, month, day] = date.split('-')
  const dateString = `${day}/${month}/${year}`
  if (time && showTime) {
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
    value ? centsToCurrency(value) : 0,
  )
}

/**
 * Format ISO date string to desired format.
 * @param {string | number} date The date to be formatted.
 * @param {string} outFormat The desired format.
 */
export function dateToFormat(date: string | number, outFormat: string = 'dd/MM/yyyy'): string {
  return format(new Date(date), outFormat)
}

/**
 * Format client address to a single string.
 * @param {Address} address The address to be formatted.
 * @returns {string} a string with the address formatted.
 */
export function formatAddress(address: Address): string {
  const addressFieldOrder: Array<keyof Address> = [
    'street',
    'number',
    'neighborhood',
    'brook',
    'complement',
  ]
  const addressFields = addressFieldOrder.map((field) => address[field])
  return addressFields.filter(Boolean).join(', ')
}

export function formatBagsIntoWeight(bags: number, weight?: number): number {
  return Number(bags * GlobalConfig.weightPerBag + (weight ?? 0))
}

/**
 * The function `centsToCurrency` converts a value in cents to a currency value.
 * @param {number} valueInCents - The `valueInCents` parameter represents an amount of money in cents
 * that you want to convert to a currency value. The `centsToCurrency` function takes this value in
 * cents and converts it to a currency value by dividing it by 100. The result is then returned as the
 * correct currency
 * @returns The function `centsToCurrency` is returning the value of `correctValueInCents`, which is
 * the input `valueInCents` converted to a currency value.
 */
export function centsToCurrency(valueInCents: number): number {
  const correctValueInCents = currency(valueInCents).divide(100).value
  return correctValueInCents
}

/**
 * The function `currencyToCents` converts a currency value to cents by multiplying it by 100.
 * @param {number} valueInCurrency - The `valueInCurrency` parameter represents a monetary value in a
 * specific currency format. The `currencyToCents` function takes this value and converts it into cents
 * by multiplying it by 100. The result is then returned as an integer representing the value in cents.
 * @returns The function `currencyToCents` takes a value in currency as input, converts it to cents,
 * and returns the value in cents.
 */
export function currencyToCents(valueInCurrency: number): number {
  const correctValueInCurrency = currency(valueInCurrency).multiply(100).value
  return correctValueInCurrency
}

export function formatRequestParams(
  obj: Record<string, string | number | undefined | null>,
): string {
  return Object.entries(obj).reduce((acc, curr) => {
    const key = curr[0]
    const value = curr[1]
    if (value === undefined || value === null || value === '') {
      return acc
    } else {
      return acc + `&${key}=${value}`
    }
  }, '')
}

export function formatClientName(client: ClientModel): string {
  return ClientNameParser.addCode(client.name, client.code)
}
