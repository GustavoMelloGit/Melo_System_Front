import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function ContentWrapper({ children }: PropsWithChildren): JSX.Element {
  return (
    <Box as='main' flex={1} display='flex' flexDir='column'>
      <Container position='relative' maxW='container.lg' flex={1} display='flex' flexDir='column'>
        {children}
      </Container>
    </Box>
  )
}
