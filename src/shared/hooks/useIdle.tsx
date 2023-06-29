import { useEffect, useRef, useState } from 'react'

export default function useIdle(delay: number = 10000): UseIdle {
  const [isIdle, setIsIdle] = useState<boolean>(false)
  // create a new reference to track timer
  const timeoutId = useRef<NodeJS.Timeout>()

  // assign and remove the listeners
  useEffect(() => {
    setup()

    return () => {
      cleanUp()
    }
  })

  const startTimer = (): void => {
    timeoutId.current = setTimeout(goInactive, delay)
  }

  const resetTimer = (): void => {
    clearTimeout(timeoutId.current)
    goActive()
  }

  const goInactive = (): void => {
    setIsIdle(true)
  }

  const goActive = (): void => {
    setIsIdle(false)
    startTimer()
  }

  const setup = (): void => {
    document.addEventListener('mousemove', resetTimer, false)
    document.addEventListener('mousedown', resetTimer, false)
    document.addEventListener('keypress', resetTimer, false)
    document.addEventListener('DOMMouseScroll', resetTimer, false)
    document.addEventListener('mousewheel', resetTimer, false)
    document.addEventListener('touchmove', resetTimer, false)
    document.addEventListener('MSPointerMove', resetTimer, false)
  }

  const cleanUp = (): void => {
    document.removeEventListener('mousemove', resetTimer)
    document.removeEventListener('mousedown', resetTimer)
    document.removeEventListener('keypress', resetTimer)
    document.removeEventListener('DOMMouseScroll', resetTimer)
    document.removeEventListener('mousewheel', resetTimer)
    document.removeEventListener('touchmove', resetTimer)
    document.removeEventListener('MSPointerMove', resetTimer)

    clearTimeout(timeoutId.current)
  }

  return {
    isIdle,
  }
}

type UseIdle = {
  isIdle: boolean
}
