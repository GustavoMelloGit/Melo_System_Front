import { useEffect, useState } from 'react'

type UsePageSize = {
  width: number
  height: number
}
export default function usePageSize(): UsePageSize {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [height, setHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  )

  useEffect(() => {
    function handleResize(): void {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width, height }
}
