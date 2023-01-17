// 1. Import the extendTheme function
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import ThemeContainer from './components/Container'

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: false,
}

const theme = extendTheme({
    components: {
        Container: ThemeContainer
    },
    config
})

export default theme