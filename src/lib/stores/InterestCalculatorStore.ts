import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const HISTORY_LIMIT = 20

export type InterestCalculatorFormValues = {
  /** Value in currency (R$), not in cents */
  capital: number
  /** Monthly interest rate in percentage */
  interestRate: number
  /** yyyy-MM-dd */
  startDate: string
  /** yyyy-MM-dd */
  endDate: string
}

export type InterestCalculation = InterestCalculatorFormValues & {
  id: string
  createdAt: number
  days: number
  /** Values in cents */
  capitalInCents: number
  interest: number
  total: number
}

type State = {
  values: InterestCalculatorFormValues | null
  result: InterestCalculation | null
  history: InterestCalculation[]
}
type Action = {
  saveCalculation: (calculation: InterestCalculation) => void
  restoreCalculation: (calculation: InterestCalculation) => void
  clear: () => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
}

const initialState: State = {
  values: null,
  result: null,
  history: [],
}

function toFormValues({
  capital,
  interestRate,
  startDate,
  endDate,
}: InterestCalculation): InterestCalculatorFormValues {
  return { capital, interestRate, startDate, endDate }
}

export const useInterestCalculatorStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        saveCalculation: (calculation) => {
          set((state) => ({
            values: toFormValues(calculation),
            result: calculation,
            history: [calculation, ...state.history].slice(0, HISTORY_LIMIT),
          }))
        },
        restoreCalculation: (calculation) => {
          set({ values: toFormValues(calculation), result: calculation })
        },
        clear: () => {
          set({ values: null, result: null })
        },
        removeFromHistory: (id) => {
          set((state) => ({ history: state.history.filter((item) => item.id !== id) }))
        },
        clearHistory: () => {
          set({ history: [] })
        },
      }),
      {
        name: 'interest-calculator',
      },
    ),
  ),
)
