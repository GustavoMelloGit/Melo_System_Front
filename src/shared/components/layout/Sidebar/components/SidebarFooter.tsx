import { Flex } from '@chakra-ui/react'
import SidebarSettings from './Settings'

export default function SidebarFooter(): JSX.Element {
  return (
    <Flex justify='center' as='footer' pb={4}>
      <SidebarSettings />
    </Flex>
  )
}
