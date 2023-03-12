import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Fragment } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './domain/auth/context/AuthContext'
import './lib/config/firebase'
import router from './lib/routes/router'
import theme, { themeManager } from './lib/styles/theme'
import ModalManager from './shared/components/ModalManager'
import ProviderComposer from './shared/components/ProviderComposer'
import Suspense from './shared/components/Suspense'
import LayoutProvider from './shared/contexts/LayoutContext'

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme} colorModeManager={themeManager}>
      <ColorModeScript
        storageKey='@melo-system:theme'
        initialColorMode={theme.config.initialColorMode}
      />
      <ProviderComposer contexts={[LayoutProvider, Suspense, HelmetProvider, AuthProvider]}>
        <Fragment>
          <RouterProvider router={router} />
          <ModalManager />
        </Fragment>
      </ProviderComposer>
      <Toaster
        toastOptions={{
          className: 'toaster',
          success: {
            className: 'toaster-success',
          },
          error: {
            className: 'toaster-error',
          },
        }}
      />
    </ChakraProvider>
  )
}
export default App
