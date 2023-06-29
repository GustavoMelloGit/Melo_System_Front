import { useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
const oneMinute = 60e3

const useIdle = (
  ms: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents,
): boolean => {
  const [state, setState] = useState<boolean>(initialState)

  useEffect(() => {
    let mounted = true
    let timeout: any
    let localState: boolean = state
    const set = (newState: boolean): void => {
      if (mounted) {
        localState = newState
        setState(newState)
      }
    }

    const onEvent = throttle(50, () => {
      if (localState) {
        set(false)
      }

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        set(true)
      }, ms)
    })
    const onVisibility = (): void => {
      if (!document.hidden) {
        onEvent()
      }
    }

    for (let i = 0; i < events.length; i++) {
      window.addEventListener(events[i], onEvent)
    }
    document.addEventListener('visibilitychange', onVisibility)

    timeout = setTimeout(() => {
      set(true)
    }, ms)

    return () => {
      mounted = false

      for (let i = 0; i < events.length; i++) {
        window.removeEventListener(events[i], onEvent)
      }
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ms, events])

  return state
}

export default useIdle
