import { createContext, type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import usePageSize from '../hooks/usePageSize'
import { type LayoutContextType } from '../types/contexts/LayoutContext'

export const LayoutContext = createContext<LayoutContextType>({
  sidebar: {
    isOpen: false,
    toggle: () => {},
    close: () => {},
    open: () => {},
  },
})

export default function LayoutProvider({ children }: PropsWithChildren): JSX.Element {
  const { width } = usePageSize()
  const [sideBarIsOpen, setSideBarIsOpen] = useState(width > 768)

  const toggleSideBar = useCallback(() => {
    setSideBarIsOpen((prev) => !prev)
  }, [sideBarIsOpen])

  const closeSideBar = useCallback(() => {
    setSideBarIsOpen(false)
  }, [sideBarIsOpen])

  const openSideBar = useCallback(() => {
    setSideBarIsOpen(true)
  }, [sideBarIsOpen])

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
    }),
    [sideBarIsOpen, toggleSideBar],
  )

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
}
