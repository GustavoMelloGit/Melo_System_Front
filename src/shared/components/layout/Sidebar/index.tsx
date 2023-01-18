import { Divider, Slide, VStack } from '@chakra-ui/react'
import useLayoutContext from '../../../hooks/useLayoutContext'
import { SidebarFooter, SidebarHeader, SidebarList } from './components'

export default function Sidebar(): JSX.Element {
  const {
    sidebar: { isOpen },
  } = useLayoutContext()
  return (
    <Slide direction={'left'} in={isOpen}>
      <VStack
        shadow='2xl'
        h='full'
        w='full'
        maxW='20rem'
        align='stretch'
        gap={4}
        py={3}
        px={6}
        position='fixed'
      >
        <SidebarHeader />
        <Divider />
        <SidebarList />
        <Divider />
        <SidebarFooter />
      </VStack>
    </Slide>
  )
}
