import { differenceInCalendarDays, format, parseISO } from 'date-fns'
import {
  type InterestCalculation,
  type InterestCalculatorFormValues,
} from '../../../lib/stores/InterestCalculatorStore'
import { Currency } from '../../../lib/utils/Currency'
import {
  calculateCompoundInterest,
  convertMonthlyInterestRateToDaily,
} from '../../../lib/utils/math'

export function getTodayDateInput(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export function getEmptyFormValues(): InterestCalculatorFormValues {
  return {
    capital: 0,
    interestRate: 0,
    startDate: getTodayDateInput(),
    endDate: '',
  }
}

export function getDaysBetween(startDate: string, endDate: string): number {
  return differenceInCalendarDays(parseISO(endDate), parseISO(startDate))
}

/**
 * Same formula used in "Calcular juros" (checking account):
 * monthly rate converted to daily rate and compounded by the number of days.
 */
export function calculateInterest(values: InterestCalculatorFormValues): InterestCalculation {
  const capitalInCents = Currency.currencyToCents(values.capital)
  const days = getDaysBetween(values.startDate, values.endDate)
  const dailyInterestRate = convertMonthlyInterestRateToDaily(values.interestRate)
  const amountWithInterest = calculateCompoundInterest(days, capitalInCents, dailyInterestRate)

  const total = Math.floor(amountWithInterest)
  const interest = Math.floor(amountWithInterest - capitalInCents)

  return {
    ...values,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    days,
    capitalInCents,
    interest,
    total,
  }
}

export function formatDateInput(date: string): string {
  return format(parseISO(date), 'dd/MM/yyyy')
}

export function formatInterestRate(rate: number): string {
  return `${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(rate)}%`
}
