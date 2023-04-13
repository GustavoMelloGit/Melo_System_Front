import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import StorageManager from '../../../lib/utils/StorageManager'
import usePageSize from '../../hooks/usePageSize'
import { type LayoutContextType, type LayoutSizes } from './types'

export const LayoutContext = createContext<LayoutContextType>({
  sidebar: {
    isOpen: false,
    toggle: () => {},
    close: () => {},
    open: () => {},
  },
  layout: {
    size: 'lg',
    setSize: () => {},
  },
})

export default function LayoutProvider({ children }: PropsWithChildren): JSX.Element {
  const { width } = usePageSize()
  const { getValue, setValue } = StorageManager('layout.size')
  const [sideBarIsOpen, setSideBarIsOpen] = useState(width > 768)
  const [layoutSize, setLayoutSize] = useState<LayoutSizes>(getValue() ?? 'lg')

  const toggleSideBar = useCallback(() => {
    setSideBarIsOpen((prev) => !prev)
  }, [sideBarIsOpen])

  const closeSideBar = useCallback(() => {
    setSideBarIsOpen(false)
  }, [sideBarIsOpen])

  const openSideBar = useCallback(() => {
    setSideBarIsOpen(true)
  }, [sideBarIsOpen])

  const setSize = useCallback((size: LayoutSizes) => {
    setLayoutSize(size)
    setValue(size)
  }, [])

  useEffect(() => {
    if (width > 768) {
      setSideBarIsOpen(true)
    } else {
      setSideBarIsOpen(false)
    }
  }, [width])

  const values = useMemo(
    () => ({
      sidebar: {
        isOpen: sideBarIsOpen,
        toggle: toggleSideBar,
        close: closeSideBar,
        open: openSideBar,
      },
      layout: {
        size: layoutSize,
        setSize,
      },
    }),
    [sideBarIsOpen, toggleSideBar, closeSideBar, openSideBar, layoutSize, setSize],
  )

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
}
