import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import './config/firebase'
import { AuthProvider } from './domain/auth/context/AuthContext'
import ProviderComposer from './lib/components/ProviderComposer'
import theme from './lib/styles/theme'
import reportWebVitals from './reportWebVitals'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ProviderComposer contexts={[<AuthProvider />]}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ProviderComposer>
    <Toaster />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
