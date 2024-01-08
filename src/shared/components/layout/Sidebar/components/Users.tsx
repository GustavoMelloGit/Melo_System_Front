import { Tooltip } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import IconButton from '../../../IconButton'
import Link from '../../../Link'

export default function SidebarUsers(): JSX.Element {
  return (
    <Tooltip label='Usuários do Sistema' hasArrow>
      <Link to={Routes.users}>
        <IconButton as='span' aria-label='usuários do sistema' icon='people' />
      </Link>
    </Tooltip>
  )
}
