import { Box, Container, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { type LayoutSizes } from '../../contexts/LayoutContext/types'
import useLayoutContext from '../../hooks/useLayoutContext'
import usePageSize from '../../hooks/usePageSize'
import Suspense from '../Suspense'
import Sidebar from './Sidebar'
import ToggleSidebarButton from './Sidebar/components/ToggleSidebarButton'

const maxW: Record<LayoutSizes, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
}

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
  }, [location])

  return (
    <Flex minH='100vh' position='relative'>
      {isOpen && (
        <Box
          as='aside'
          position='fixed'
          top={0}
          w={{ base: '100vw', sm: '20rem' }}
          h='100svh'
          zIndex={100}
        >
          <Sidebar />
        </Box>
      )}
      <Container
        as='main'
        maxW={maxW[size]}
        pt={10}
        pb={20}
        {...(isOpen && {
          ml: {
            base: 0,
            sm: '21rem',
          },
        })}
        // w={isOpen ? 'calc(100vw - 20rem)' : 'full'}
        // display={isOpen ? { base: 'none', sm: 'flex' } : 'flex'}
        // overflowY={{ base: 'unset', sm: 'auto' }}
        // position='relative'
        // flex={1}
        // flexDir='column'
      >
        {!isOpen && <ToggleSidebarButton />}
        <Suspense>
          <Outlet />
        </Suspense>
      </Container>
    </Flex>
  )
}
