import { useContext } from 'react'
import { LayoutContext } from '../contexts/LayoutContext'
import { type LayoutContextType } from '../contexts/LayoutContext/types'

export default function useLayoutContext(): LayoutContextType {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }

  return context
}
