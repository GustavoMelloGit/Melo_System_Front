import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import useLayoutContext from '../../../hooks/useLayoutContext'
import ToggleSidebarButton from '../../buttons/ToggleSidebarButton'

export default function ContentWrapper({ children }: PropsWithChildren): JSX.Element {
  const {
    sidebar: { isOpen },
  } = useLayoutContext()
  return (
    <Box flex={1} display='flex' flexDir='column'>
      <Container
        position='relative'
        maxW='container.lg'
        flex={1}
        display='flex'
        flexDir='column'
        py={4}
      >
        {!isOpen && <ToggleSidebarButton />}
        {children}
      </Container>
    </Box>
  )
}
