import { ChakraProvider } from "@chakra-ui/react";
import theme, { themeManager } from '../src/lib/styles/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

}

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme} colorModeManager={themeManager}>
      <Story />
    </ChakraProvider>
  )
]