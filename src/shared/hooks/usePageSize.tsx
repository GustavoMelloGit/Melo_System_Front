import { useEffect, useState } from 'react'

type UsePageSize = {
  width: number
  height: number
}
export default function usePageSize(): UsePageSize {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    function handleResize(): void {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width, height }
}
