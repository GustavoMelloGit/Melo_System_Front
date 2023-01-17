import { Box, Button, useColorMode } from '@chakra-ui/react'
import PageLayout from '../../shared/components/layout'

export default function HomePage(): JSX.Element {
  const { toggleColorMode } = useColorMode()
  return (
    <PageLayout>
      <Box>oi</Box>
      <Button onClick={toggleColorMode}>Toggle color</Button>
    </PageLayout>
  )
}
