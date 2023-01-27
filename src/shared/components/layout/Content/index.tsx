import { Box, Container } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import useLayoutContext from '../../../hooks/useLayoutContext'
import ToggleSidebarButton from '../../buttons/ToggleSidebarButton'

export default function ContentWrapper({ children }: PropsWithChildren): JSX.Element {
  const {
    sidebar: { isOpen },
  } = useLayoutContext()
  return (
    <Box display='flex' flexDir='column' maxW='full' flex={1}>
      <Container
        position='relative'
        maxW='container.lg'
        flex={1}
        display='flex'
        flexDir='column'
        py={10}
      >
        {!isOpen && <ToggleSidebarButton />}
        {children}
      </Container>
    </Box>
  )
}
