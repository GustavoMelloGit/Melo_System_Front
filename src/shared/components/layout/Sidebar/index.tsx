import { Divider, useColorModeValue, VStack } from '@chakra-ui/react'
import { SidebarFooter, SidebarHeader, SidebarList } from './components'

export default function Sidebar(): JSX.Element {
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <VStack shadow='2xl' bg={bg} align='stretch' gap={4} py={3} px={6} h='100svh'>
      <SidebarHeader />
      <Divider />
      <SidebarList />
      <Divider />
      <SidebarFooter />
    </VStack>
  )
}
