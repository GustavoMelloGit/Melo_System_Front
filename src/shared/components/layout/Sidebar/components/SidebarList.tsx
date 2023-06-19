import { Box, List, VStack } from '@chakra-ui/react'
import { BiUser } from 'react-icons/bi'
import { BsTruck } from 'react-icons/bs'
import { MdOutlineMonitorWeight } from 'react-icons/md'
import { TbPlant, TbTruckLoading } from 'react-icons/tb'
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
  [Routes.clients]: {
    label: 'Clientes',
    icon: <BiUser />,
  },
  [Routes.fertilizers]: {
    label: 'Adubos',
    icon: <TbPlant />,
  },
  [Routes.books]: {
    label: 'Pesagem',
    icon: <MdOutlineMonitorWeight size={20} />,
  },
  [Routes.fertilizersDelivery]: {
    label: 'Adubos a Entregar',
    icon: <TbTruckLoading />,
  },
  [Routes.coffeePickups]: {
    label: 'Cafés a Buscar',
    icon: <BsTruck />,
  },
  // [Routes.transfer]: {
  //   label: 'Transferência',
  //   icon: <CgArrowsExchange size={24} />,
  // },
}

const customPaths: Record<string, string> = {
  [Routes.books]: `${Routes.books}?latest=true`,
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
    <Box as='nav' flexGrow={1}>
      <VStack as={List} align='stretch' onClick={handleCloseSideBar}>
        {protectedRoutes.children?.map(
          (route) =>
            route.path &&
            listItem[route.path] && (
              <SidebarListItem
                key={route.path}
                to={customPaths[route.path] || route.path}
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
