import { Button, Menu, MenuButton, MenuItem, MenuList, useColorMode } from '@chakra-ui/react'
import { IoIosArrowForward } from 'react-icons/io'

export default function SettingsThemeMenuItem(): JSX.Element {
  const { setColorMode } = useColorMode()
  return (
    <MenuItem as='span'>
      <Menu placement='right'>
        <MenuButton
          as={Button}
          variant='unstyled'
          w='full'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          textAlign='left'
          rightIcon={<IoIosArrowForward />}
        >
          Tema
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              setColorMode('light')
            }}
          >
            Light
          </MenuItem>
          <MenuItem
            onClick={() => {
              setColorMode('dark')
            }}
          >
            Dark
          </MenuItem>
        </MenuList>
      </Menu>
    </MenuItem>
  )
}
