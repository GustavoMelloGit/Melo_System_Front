import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { useScreenProtectionStore } from '../../lib/stores/ScreenProtectionStore'
import useIdle from './useIdle'

const delayToLock = 10 * 60 * 1000 // 10 minutes
const defaultPassword: string = '123456'

export default function useScreenProtection(): UseScreenProtection {
  const [isLocked, lock, password, setPassword] = useScreenProtectionStore(
    (state) => [state.isLocked, state.lock, state.password, state.setPassword],
    shallow,
  )
  const isIdle = useIdle(delayToLock)

  if (isIdle && !isLocked) {
    lock()
  }

  useEffect(() => {
    if (!password) {
      setPassword(defaultPassword)
    }
  }, [password, setPassword])

  return {
    isLocked,
  }
}

type UseScreenProtection = {
  isLocked: boolean
}
