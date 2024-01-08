import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  isLocked: boolean
  password: string
  delayToLock: number
}
type Action = {
  lock: () => void
  unlock: () => void
  setPassword: (password: string) => void
  setDelayToLock: (milliseconds: number) => void
}

const initialState: State = {
  delayToLock: 10 * 60 * 1000, // 10 minutes
  isLocked: false,
  password: '123456',
}
export const useScreenProtectionStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        lock: () => {
          set({ isLocked: true })
        },
        unlock: () => {
          set({ isLocked: false })
        },
        setPassword: (password) => {
          set({ password })
        },
        setDelayToLock: (delayToLock) => {
          set({ delayToLock })
        },
      }),
      {
        name: 'screen-protection',
      },
    ),
  ),
)
