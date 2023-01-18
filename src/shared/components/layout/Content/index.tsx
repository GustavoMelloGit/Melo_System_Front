import { Box, Button, Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { RxDoubleArrowRight } from 'react-icons/rx'
import useLayoutContext from '../../../hooks/useLayoutContext'

export default function ContentWrapper({ children }: PropsWithChildren): JSX.Element {
  const {
    sidebar: { isOpen, open },
  } = useLayoutContext()
  return (
    <Box as='main' flex={1} display='flex' flexDir='column'>
      <Container
        position='relative'
        maxW='container.lg'
        flex={1}
        display='flex'
        flexDir='column'
        py={4}
      >
        {!isOpen && (
          <Button onClick={open} variant='ghost' w='max-content'>
            <RxDoubleArrowRight size={22} />
          </Button>
        )}
        {children}
      </Container>
    </Box>
  )
}
