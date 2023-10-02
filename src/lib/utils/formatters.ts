import currency from 'currency.js'
import { format } from 'date-fns'
import { type Address, type ClientModel } from '../../domain/client/types/model/Client'
import GlobalConfig from '../constants/config'

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
    value ? value / 100 : 0,
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

export function currencyValueCorrection(valueInCents: number): number {
  const correctValueInCents = currency(valueInCents).divide(100).intValue
  return correctValueInCents
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
  return `${client.code} - ${client.name}`
}
