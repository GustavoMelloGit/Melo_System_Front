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
  return amount * (1 + interestRate / 100) ** time
}
