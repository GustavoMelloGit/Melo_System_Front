export function calculateMonthlyCompoundInterest(
  months: number,
  amount: number,
  interestRate: number,
): number {
  if (!interestRate) return amount
  return amount * (1 + interestRate / 100) ** months
}
