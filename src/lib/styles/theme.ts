// 1. Import the extendTheme function
import { createLocalStorageManager, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import breakpoints from './breakpoints'
import ThemeContainer from './components/Container'
import ThemeModal from './components/Modal'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
}

const theme = extendTheme({
  components: {
    Container: ThemeContainer,
    Modal: ThemeModal,
  },
  breakpoints,
  config,
})

export const themeManager = createLocalStorageManager('@melo-system:theme')

export default theme
