import { Flex } from '@chakra-ui/react'
import IconButton from '../../../IconButton'
import SidebarSettings from './Settings'

export default function SidebarFooter(): JSX.Element {
  return (
    <Flex justify='center' align='center' as='footer' pb={4} gap={2}>
      <SidebarSettings />
      <IconButton
        icon='lock'
        iconSize={22}
        aria-label='Proteção de tela'
        title='Ativar proteção de tela'
      />
    </Flex>
  )
}
