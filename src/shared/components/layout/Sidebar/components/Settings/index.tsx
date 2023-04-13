import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { AiOutlineSetting } from 'react-icons/ai'
import SettingsLayoutMenuItem from './Layout'
import SettingsThemeMenuItem from './Theme'

export default function SidebarSettings(): JSX.Element {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<AiOutlineSetting size={22} />}
        variant='ghost'
        aria-label='Configurações'
      />
      <MenuList>
        <SettingsThemeMenuItem />
        <SettingsLayoutMenuItem />
      </MenuList>
    </Menu>
  )
}
