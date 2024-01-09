import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  dialog: {
    rounded: 20,
  },
  dialogContainer: {
    p: 4,
  },
  body: {
    maxH: '70vh',
    overflowY: 'auto',
    pos: 'relative',
    pb: 8,
  },
})

const ThemeModal = defineMultiStyleConfig({
  baseStyle,
})

export default ThemeModal
