import GlobalConfig from '../constants/config'

/**
 * Converts monthly interest rate to daily interest rate
 * @param monthlyInterestRate Monthly interest rate
 * @returns Daily interest rate
 */
export function convertMonthlyInterestRateToDaily(monthlyInterestRate: number): number {
  return (1 + monthlyInterestRate / 100) ** (1 / 30) - 1
}

/**
 * Calculates compound interest
 * @param time time applied
 * @param amount amount to apply interest
 * @param interestRate interest rate
 * @returns amount with interest applied
 */
export function calculateCompoundInterest(
  time: number,
  amount: number,
  interestRate: number,
): number {
  if (!interestRate) return amount
  return amount * (1 + interestRate) ** time
}

/**
 * Get random integer number between range
 * @param min Minimum number
 * @param max Maximum number
 * @returns Random number between range
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Calculates total value of a coffee based on bags, weight and valuePerBag
 * @param bags Number of bags
 * @param weight Weight of each bag
 * @param valuePerBag Value of each bag
 * @returns Total value of coffee
 * @example
 * calculateTotalValue(2, 60, 10) // 1200
 */
export function calculateCoffeeTotalValue(
  bags: number,
  weight: number,
  valuePerBag: number,
): number {
  const valueOnWeight = Number(((weight * valuePerBag) / GlobalConfig.weightPerBag).toFixed(2))
  const valueOnBags = bags * valuePerBag
  return valueOnWeight + valueOnBags
}
