import { Divider, VStack } from '@chakra-ui/react'
import { SidebarHeader, SidebarList } from './components'

export default function Sidebar(): JSX.Element {
  return (
    <VStack w='full' align='stretch' gap={4} py={8} px={6}>
      <SidebarHeader />
      <Divider />
      <SidebarList />
    </VStack>
  )
}
