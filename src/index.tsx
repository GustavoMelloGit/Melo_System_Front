import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './domain/auth/context/AuthContext'
import './lib/config/firebase'
import router from './lib/routes/router'
import theme from './lib/styles/theme'
import reportWebVitals from './reportWebVitals'
import ProviderComposer from './shared/components/ProviderComposer'
import Suspense from './shared/components/Suspense'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ProviderComposer contexts={[AuthProvider, Suspense]}>
        <RouterProvider router={router} />
      </ProviderComposer>
    </ChakraProvider>
    <Toaster />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
