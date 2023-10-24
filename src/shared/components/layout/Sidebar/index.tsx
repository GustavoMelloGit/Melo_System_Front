import { useColorModeValue, VStack } from '@chakra-ui/react'
import { SidebarFooter, SidebarHeader, SidebarList } from './components'

export default function Sidebar(): JSX.Element {
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <VStack shadow='2xl' bg={bg} h='full' align='stretch' spacing={4} py={3} px={6}>
      <SidebarHeader />
      <SidebarList />
      <SidebarFooter />
    </VStack>
  )
}
