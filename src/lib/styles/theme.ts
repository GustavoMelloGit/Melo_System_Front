// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import ThemeContainer from './components/Container'



const theme = extendTheme({
    components: {
        Container: ThemeContainer
    }
})

export default theme