export type LayoutContextType = {
  sidebar: {
    isOpen: boolean
    toggle: () => void
    close: () => void
    open: () => void
  }
  layout: {
    size: LayoutSizes
    setSize: (size: LayoutSizes) => void
  }
}
export type LayoutSizes = 'xl' | 'lg' | 'md'
