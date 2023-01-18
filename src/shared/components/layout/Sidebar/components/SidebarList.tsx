import { Box, List } from '@chakra-ui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { Routes } from '../../../../../lib/routes'
import { protectedRoutes } from '../../../../../lib/routes/router'
import SidebarListItem from './SidebarListItem'

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
    <Box as='body' minH={0} flex={1}>
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
    </Box>
  )
}
