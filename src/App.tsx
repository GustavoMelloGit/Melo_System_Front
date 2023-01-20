import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './domain/auth/context/AuthContext'
import './lib/config/firebase'
import router from './lib/routes/router'
import theme, { themeManager } from './lib/styles/theme'
import ProviderComposer from './shared/components/ProviderComposer'
import Suspense from './shared/components/Suspense'
import LayoutProvider from './shared/contexts/LayoutContext'
function App(): JSX.Element {
  return (
    <>
      <ChakraProvider theme={theme} colorModeManager={themeManager}>
        <ColorModeScript
          storageKey='@melo-system:theme'
          initialColorMode={theme.config.initialColorMode}
        />
        <ProviderComposer contexts={[AuthProvider, LayoutProvider, Suspense]}>
          <RouterProvider router={router} />
        </ProviderComposer>
      </ChakraProvider>
      <Toaster />
    </>
  )
}

export default App
