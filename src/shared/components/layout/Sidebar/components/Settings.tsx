import { IconButton, Tooltip } from '@chakra-ui/react'
import { AiOutlineSetting } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'

export default function SidebarSettings(): JSX.Element {
  return (
    <Tooltip label='Configurações' hasArrow>
      <IconButton
        icon={<AiOutlineSetting size={21} />}
        aria-label='configurações do sistema'
        variant='ghost'
        as={Link}
        to={Routes.config}
      />
    </Tooltip>
  )
}
