import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function PageLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <Box as='main' minW='100vw' minH='100vh' display='flex' flexDir='column' position='relative'>
      <Container maxW='container.lg' flex={1} display='flex' flexDir='column'>
        {children}
      </Container>
    </Box>
  )
}
