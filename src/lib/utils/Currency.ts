import currency from 'currency.js'

export const Currency = {
  centsToCurrency(valueInCents: number): number {
    const correctValueInCents = currency(valueInCents).divide(100).value
    return correctValueInCents
  },
  currencyToCents(valueInCurrency: number): number {
    const correctValueInCurrency = currency(valueInCurrency).multiply(100).value
    return correctValueInCurrency
  },
}
