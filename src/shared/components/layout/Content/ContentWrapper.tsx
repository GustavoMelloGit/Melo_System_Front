import { Box, Container } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import useLayoutContext from '../../../hooks/useLayoutContext'
import ToggleSidebarButton from '../Sidebar/components/ToggleSidebarButton'

export default function ContentWrapper({ children }: PropsWithChildren): JSX.Element {
  const {
    sidebar: { isOpen },
    layout: { size },
  } = useLayoutContext()
  return (
    <Box display='flex' flexDir='column' w='full' flex={1}>
      <Container
        position='relative'
        maxW={`container.${size}`}
        flex={1}
        display='flex'
        flexDir='column'
        py={10}
        pb={20}
      >
        {!isOpen && <ToggleSidebarButton />}
        {children}
      </Container>
    </Box>
  )
}
