import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import StorageManager from '../../../lib/utils/StorageManager'
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
  const { getValue: getSize, setValue: setSize } = StorageManager<LayoutSizes>('layout.size')
  const { getValue: getSidebar, setValue: setSidebar } = StorageManager<boolean>('layout.sidebar')
  const [sideBarIsOpen, setSideBarIsOpen] = useState(getSidebar() ?? true)
  const [layoutSize, setLayoutSize] = useState<LayoutSizes>(getSize() ?? 'lg')

  const toggleSideBar = useCallback(() => {
    setSideBarIsOpen((prev) => !prev)
    setSidebar(!sideBarIsOpen)
  }, [setSidebar, sideBarIsOpen])

  const closeSideBar = useCallback(() => {
    setSideBarIsOpen(false)
    setSidebar(false)
  }, [setSidebar])

  const openSideBar = useCallback(() => {
    setSideBarIsOpen(true)
    setSidebar(true)
  }, [setSidebar])

  const changeSize = useCallback(
    (size: LayoutSizes) => {
      setLayoutSize(size)
      setSize(size)
    },
    [setSize],
  )

  const sidebar = useMemo(
    () => ({
      isOpen: sideBarIsOpen,
      toggle: toggleSideBar,
      close: closeSideBar,
      open: openSideBar,
    }),
    [sideBarIsOpen, toggleSideBar, closeSideBar, openSideBar],
  )

  const layout = useMemo(
    () => ({
      size: layoutSize,
      setSize: changeSize,
    }),
    [layoutSize, changeSize],
  )

  const values = useMemo(
    () => ({
      sidebar,
      layout,
    }),
    [sidebar, layout],
  )

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
}
