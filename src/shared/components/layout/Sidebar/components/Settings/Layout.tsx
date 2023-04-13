import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { IoIosArrowForward } from 'react-icons/io'
import { type LayoutSizes } from '../../../../../contexts/LayoutContext/types'
import useLayoutContext from '../../../../../hooks/useLayoutContext'

export default function SettingsLayoutMenuItem(): JSX.Element {
  const {
    layout: { setSize },
  } = useLayoutContext()

  function handleSetSize(size: LayoutSizes): void {
    setSize(size)
  }
  return (
    <MenuItem>
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
          Layout
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              handleSetSize('xl')
            }}
          >
            Largo
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSetSize('lg')
            }}
          >
            Compacto
          </MenuItem>
        </MenuList>
      </Menu>
    </MenuItem>
  )
}
