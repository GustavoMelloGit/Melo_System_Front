import { Box, List, VStack } from '@chakra-ui/react'
import { BiUser } from 'react-icons/bi'
import { BsTruck } from 'react-icons/bs'
import { CgArrowsExchange } from 'react-icons/cg'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { MdOutlineMonitorWeight } from 'react-icons/md'
import { TbPlant, TbTruckLoading } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import useAuth from '../../../../../domain/auth/hooks/useAuth'
import { type UserPermission } from '../../../../../domain/auth/types/model/user'
import { Routes } from '../../../../../lib/routes'
import { protectedRoutes } from '../../../../../lib/routes/router'
import SidebarListItem from './SidebarListItem'

const listItem: Record<
  string,
  {
    label: string
    icon?: JSX.Element
    hasPermission: (permission: UserPermission[]) => boolean
  }
> = {
  [Routes.clients]: {
    label: 'Clientes',
    icon: <BiUser />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) => permission.method === 'GET' && permission.route === '/clients',
        ),
      ),
  },
  [Routes.transfer]: {
    label: 'Transferência',
    icon: <CgArrowsExchange size={24} />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) => permission.method === 'POST' && permission.route === '/transfer',
        ),
      ),
  },
  [Routes.coffeePickups]: {
    label: 'Cafés a Buscar',
    icon: <BsTruck size={18} />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) => permission.method === 'GET' && permission.route === '/orders',
        ),
      ),
  },
  [Routes.fertilizersDelivery]: {
    label: 'Adubos a Entregar',
    icon: <TbTruckLoading size={20} />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) =>
            permission.method === 'GET' && permission.route === '/fertilizers/delivery',
        ),
      ),
  },
  [Routes.books]: {
    label: 'Pesagem',
    icon: <MdOutlineMonitorWeight size={20} />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) => permission.method === 'GET' && permission.route === '/books',
        ),
      ),
  },
  [Routes.fertilizers]: {
    label: 'Estoque de Adubos',
    icon: <TbPlant size={18} />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) => permission.method === 'GET' && permission.route === '/fertilizers',
        ),
      ),
  },
  [Routes.metricsHub]: {
    label: 'Relatórios',
    icon: <HiOutlineDocumentReport size={20} />,
    hasPermission: (permissions) =>
      Boolean(
        permissions.find(
          (permission) => permission.method === 'GET' && permission.route.startsWith('/metrics'),
        ),
      ),
  },
}

const customPaths: Record<string, string> = {
  [Routes.books]: `${Routes.books}?latest=true`,
}

export default function SidebarList(): JSX.Element {
  const { user } = useAuth()
  const currentPathname = useLocation().pathname
  const basePath = currentPathname.split('/')[1]

  return (
    <Box as='nav' flexGrow={1}>
      <VStack as={List} align='stretch'>
        {Object.entries(listItem).map(([route, elements]) => {
          const routeFound = protectedRoutes.children?.find(
            (protectedRoute) => protectedRoute.path === route,
          )
          if (!routeFound || (user.role !== 'admin' && !elements.hasPermission(user.permissions)))
            return null

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
