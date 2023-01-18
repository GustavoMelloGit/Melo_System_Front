import { Box, Button, useColorMode } from '@chakra-ui/react'

export default function HomePage(): JSX.Element {
  const { toggleColorMode } = useColorMode()
  return (
    <Box>
      <Box>oi</Box>
      <Button onClick={toggleColorMode}>Toggle color</Button>
      <Box />
    </Box>
  )
}
