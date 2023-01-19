// 1. Import the extendTheme function
import { createLocalStorageManager, extendTheme, ThemeConfig } from '@chakra-ui/react'
import breakpoints from './breakpoints'
import ThemeContainer from './components/Container'

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: false,
}

const theme = extendTheme({
    components: {
        Container: ThemeContainer
    },
    breakpoints,
    config
})

export const themeManager = createLocalStorageManager('@melo-system:theme')

export default theme