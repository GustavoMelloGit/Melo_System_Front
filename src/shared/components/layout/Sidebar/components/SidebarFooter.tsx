import { Flex } from '@chakra-ui/react'
import useLayoutContext from '../../../../hooks/useLayoutContext'
import usePageSize from '../../../../hooks/usePageSize'
import LockScreenButton from './LockScreenButton'
import SidebarSettings from './Settings'
import SidebarUsers from './Users'

export default function SidebarFooter(): JSX.Element {
  const {
    sidebar: { close },
  } = useLayoutContext()
  const { width } = usePageSize()
  const isMobile = width < 768

  function handleCloseSideBar(): void {
    if (isMobile) {
      close()
    }
  }
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
      onClick={handleCloseSideBar}
    >
      <SidebarUsers />
      <SidebarSettings />
      <LockScreenButton />
    </Flex>
  )
}
