import { Box, Container, Flex } from '@chakra-ui/react'
import { lazy, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { type LayoutSizes } from '../../contexts/LayoutContext/types'
import useLayoutContext from '../../hooks/useLayoutContext'
import usePageSize from '../../hooks/usePageSize'
import Suspense from '../Suspense'
import Sidebar from './Sidebar'
import ToggleSidebarButton from './Sidebar/components/ToggleSidebarButton'
const BirthdayPopup = lazy(async () => import('../BirthdayPopup'))

const maxW: Record<LayoutSizes, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
}

const sidebarWidth: string = '20rem'
const scrollbarWidth: string = '1rem'

export default function PageLayout(): JSX.Element {
  const { width } = usePageSize()
  const {
    sidebar: { isOpen, close },
    layout: { size },
  } = useLayoutContext()
  const isMobile = width !== 0 && width < 768
  const location = useLocation()

  useEffect(() => {
    if (isMobile) {
      close()
    }
  }, [close, isMobile, location])

  return (
    <Flex minH='100vh' position='relative' overflowX='hidden'>
      {isOpen && (
        <Box
          as='aside'
          position='fixed'
          top={0}
          w={{ base: '100vw', sm: sidebarWidth }}
          h='100svh'
          zIndex={100}
        >
          <Sidebar />
        </Box>
      )}
      <Box
        role='presentation'
        minH='100vh'
        {...(isOpen && {
          minW: {
            base: 0,
            sm: sidebarWidth,
          },
        })}
      />
      <Container
        as='main'
        maxW={maxW[size]}
        pt={10}
        pb={20}
        {...(isOpen && {
          w: {
            base: '100vw',
            sm: `calc(100vw - ${sidebarWidth} - ${scrollbarWidth})`,
          },
        })}
      >
        {!isOpen && <ToggleSidebarButton />}
        <Suspense>
          <Outlet />
        </Suspense>
      </Container>
      <BirthdayPopup />
    </Flex>
  )
}
