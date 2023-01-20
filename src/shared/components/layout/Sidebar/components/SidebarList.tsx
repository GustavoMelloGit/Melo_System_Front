import { Box, List } from '@chakra-ui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
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
  const currentPathname = useLocation().pathname

  return (
    <Box flex={1}>
      <List>
        {protectedRoutes.children?.map(
          (route) =>
            route.path &&
            listItem[route.path] && (
              <SidebarListItem
                key={route.path}
                to={route.path}
                label={listItem[route.path].label}
                icon={listItem[route.path].icon}
                isActive={currentPathname === route.path}
              />
            ),
        )}
      </List>
    </Box>
  )
}
