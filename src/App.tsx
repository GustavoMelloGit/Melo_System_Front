import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { lazy } from 'react'
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
import useScreenProtection from './shared/hooks/useScreenProtection'
const LockScreenView = lazy(async () => import('./shared/components/layout/Content/LockScreenView'))

// Bug: https://github.com/vitejs/vite/issues/11804
// Solution: https://vitejs.dev/guide/build#load-error-handling
window.addEventListener('vite:preloadError', () => {
  window.location.reload() // for example, refresh the page
})

function App(): JSX.Element {
  const { isLocked } = useScreenProtection()
  return (
    <ChakraProvider theme={theme} colorModeManager={themeManager}>
      <ColorModeScript
        storageKey='@melo-system:theme'
        initialColorMode={theme.config.initialColorMode}
      />
      <ProviderComposer contexts={[LayoutProvider, Suspense, HelmetProvider, AuthProvider]}>
        {isLocked ? <LockScreenView /> : <RouterProvider router={router} />}
        <ModalManager />
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
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        }}
      />
    </ChakraProvider>
  )
}
export default App
