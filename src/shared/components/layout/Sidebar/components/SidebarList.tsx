import { Box, List, VStack } from '@chakra-ui/react'
import { BiUser } from 'react-icons/bi'
import { BsTruck } from 'react-icons/bs'
import { CgArrowsExchange } from 'react-icons/cg'
import { HiOutlineDocumentReport } from 'react-icons/hi'
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
  [Routes.transfer]: {
    label: 'Transferência',
    icon: <CgArrowsExchange size={24} />,
  },
  [Routes.coffeePickups]: {
    label: 'Cafés a Buscar',
    icon: <BsTruck size={18} />,
  },
  [Routes.fertilizersDelivery]: {
    label: 'Adubos a Entregar',
    icon: <TbTruckLoading size={20} />,
  },
  [Routes.books]: {
    label: 'Pesagem',
    icon: <MdOutlineMonitorWeight size={20} />,
  },
  [Routes.fertilizers]: {
    label: 'Estoque de Adubos',
    icon: <TbPlant size={18} />,
  },
  [Routes.transactionMetrics]: {
    label: 'Relatórios',
    icon: <HiOutlineDocumentReport size={20} />,
  },
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
        {Object.entries(listItem).map(([route, elements]) => {
          const routeFound = protectedRoutes.children?.find(
            (protectedRoute) => protectedRoute.path === route,
          )
          if (!routeFound) return null

          return (
            <SidebarListItem
              key={route}
              to={customPaths[route] ?? route}
              label={elements.label}
              icon={elements.icon}
              isActive={route.split('/')[1] === basePath}
            />
          )
        })}
      </VStack>
    </Box>
  )
}
