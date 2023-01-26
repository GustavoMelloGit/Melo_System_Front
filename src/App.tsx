import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './domain/auth/context/AuthContext';
import router from './lib/routes/router';
import theme, { themeManager } from './lib/styles/theme';
import ProviderComposer from './shared/components/ProviderComposer';
import Suspense from './shared/components/Suspense';
import LayoutProvider from './shared/contexts/LayoutContext';

function App() {
  return (
    <ChakraProvider theme={theme} colorModeManager={themeManager}>
      <ColorModeScript
        storageKey='@melo-system:theme'
        initialColorMode={theme.config.initialColorMode}
      />
      <ProviderComposer
        contexts={[LayoutProvider, Suspense, HelmetProvider, AuthProvider]}
      >
        <RouterProvider router={router} />
      </ProviderComposer>
      <Toaster />
    </ChakraProvider>
  );
}
export default App;
