import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  isLocked: boolean
  password: string
}
type Action = {
  lock: () => void
  unlock: () => void
  setPassword: (password: string) => void
}

export const useScreenProtectionStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        isLocked: false,
        password: '123456',
        lock: () => {
          set({ isLocked: true })
        },
        unlock: () => {
          set({ isLocked: false })
        },
        setPassword: (password) => {
          set({ password })
        },
      }),
      {
        name: 'screen-protection',
      },
    ),
  ),
)
