import { List } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import SidebarListItem from './SidebarListItem'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { protectedRoutes } from '../../../../../lib/routes/router'

const listItem: Record<
  string,
  {
    label: string
    icon?: JSX.Element
  }
> = {
  [Routes.home]: {
    label: 'Home',
    icon: <AiOutlineHome />,
  },
  [Routes.clients]: {
    label: 'Clientes',
    icon: <BiUser />,
  },
}

export default function SidebarList(): JSX.Element {
  return (
    <List>
      {protectedRoutes.map(
        (route) =>
          route.path && (
            <SidebarListItem
              key={route.path}
              to={route.path}
              label={listItem[route.path].label}
              icon={listItem[route.path].icon}
            />
          ),
      )}
    </List>
  )
}
