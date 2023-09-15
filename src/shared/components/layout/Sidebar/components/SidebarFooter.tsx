import { Flex } from '@chakra-ui/react'
import LockScreenButton from './LockScreenButton'
import SidebarSettings from './Settings'
import SidebarUsers from './Users'

export default function SidebarFooter(): JSX.Element {
  return (
    <Flex
      justify='center'
      align='center'
      as='footer'
      pb={{
        base: 0,
        sm: 4,
      }}
      gap={2}
    >
      <SidebarUsers />
      <SidebarSettings />
      <LockScreenButton />
    </Flex>
  )
}
