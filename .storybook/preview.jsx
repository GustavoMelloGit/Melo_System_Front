import { ChakraProvider } from "@chakra-ui/react";
import { withRouter } from "storybook-addon-react-router-v6";
import theme, { themeManager } from '../src/lib/styles/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
      searchParams: { tab: 'activityLog' },
      routeState: { fromPage: 'homePage' },
    }
  }

}

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme} colorModeManager={themeManager}>
      <Story />
    </ChakraProvider>
  ),
  withRouter
]