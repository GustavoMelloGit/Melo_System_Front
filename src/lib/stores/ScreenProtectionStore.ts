import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  isLocked: boolean
}
type Action = {
  lock: () => void
  unlock: () => void
}

export const useScreenProtectionStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        isLocked: false,
        lock: () => {
          set({ isLocked: true })
        },
        unlock: () => {
          set({ isLocked: false })
        },
      }),
      {
        name: 'screen-protection',
      },
    ),
  ),
)
