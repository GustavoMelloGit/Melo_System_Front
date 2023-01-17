import { Box } from '@chakra-ui/react'
import useAuth from './domain/auth/hooks/useAuth'

function App(): JSX.Element {
  const { signOut } = useAuth()
  return (
    <Box>
      <button onClick={signOut}>Sign out</button>
    </Box>
  )
}

export default App
