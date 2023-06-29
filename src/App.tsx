import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Fragment, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { AuthProvider } from './domain/auth/context/AuthContext'
import './lib/config/firebase'
import router from './lib/routes/router'
import { useScreenProtectionStore } from './lib/stores/ScreenProtectionStore'
import theme, { themeManager } from './lib/styles/theme'
import ModalManager from './shared/components/ModalManager'
import ProviderComposer from './shared/components/ProviderComposer'
import Suspense from './shared/components/Suspense'
import LayoutProvider from './shared/contexts/LayoutContext'
import useIdle from './shared/hooks/useIdle'
const LockScreenView = lazy(async () => import('./shared/components/layout/Content/LockScreenView'))

const delayToLock = 10 * 60 * 1000 // 10 minutes

function App(): JSX.Element {
  const [isLocked, lock] = useScreenProtectionStore(
    (state) => [state.isLocked, state.lock],
    shallow,
  )
  const { isIdle } = useIdle(delayToLock)

  if (isIdle && !isLocked) {
    lock()
  }

  return (
    <ChakraProvider theme={theme} colorModeManager={themeManager}>
      <ColorModeScript
        storageKey='@melo-system:theme'
        initialColorMode={theme.config.initialColorMode}
      />
      <ProviderComposer contexts={[LayoutProvider, Suspense, HelmetProvider, AuthProvider]}>
        <Fragment>
          {isLocked ? <LockScreenView /> : <RouterProvider router={router} />}
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
