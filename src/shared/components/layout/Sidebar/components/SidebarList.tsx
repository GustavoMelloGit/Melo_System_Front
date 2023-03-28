import { Box, List, VStack } from '@chakra-ui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BsCoin, BsTruck } from 'react-icons/bs'
import { TbPlant } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { protectedRoutes } from '../../../../../lib/routes/router'
import useLayoutContext from '../../../../hooks/useLayoutContext'
import usePageSize from '../../../../hooks/usePageSize'
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
  [Routes.fertilizers]: {
    label: 'Adubos',
    icon: <TbPlant />,
  },
  [Routes.coffeePickups]: {
    label: 'Cafés a buscar',
    icon: <BsTruck />,
  },
  [Routes.books]: {
    label: 'Lançamento',
    icon: <BsCoin />,
  },
}

export default function SidebarList(): JSX.Element {
  const currentPathname = useLocation().pathname
  const basePath = currentPathname.split('/')[1]

  const {
    sidebar: { close },
  } = useLayoutContext()
  const { width } = usePageSize()
  const isMobile = width < 768

  const handleCloseSideBar = (): void => {
    if (isMobile) {
      close()
    }
  }
  return (
    <Box flex={1}>
      <VStack as={List} align='stretch' onClick={handleCloseSideBar}>
        {protectedRoutes.children?.map(
          (route) =>
            route.path &&
            listItem[route.path] && (
              <SidebarListItem
                key={route.path}
                to={route.path}
                label={listItem[route.path].label}
                icon={listItem[route.path].icon}
                isActive={route.path.split('/')[1] === basePath}
              />
            ),
        )}
      </VStack>
    </Box>
  )
}
