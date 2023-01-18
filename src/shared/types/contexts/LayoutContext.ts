export type LayoutContextType = {
    sidebar: {
        isOpen: boolean
        toggle: () => void
        close: () => void
        open: () => void
    }
}