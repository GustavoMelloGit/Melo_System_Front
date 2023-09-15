import { Box, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useLayoutContext from '../../hooks/useLayoutContext'
import usePageSize from '../../hooks/usePageSize'
import Suspense from '../Suspense'
import ContentWrapper from './Content/ContentWrapper'
import Sidebar from './Sidebar'

export default function PageLayout(): JSX.Element {
  const { width } = usePageSize()
  const {
    sidebar: { isOpen, close },
  } = useLayoutContext()
  const isMobile = width !== 0 && width < 768
  const location = useLocation()

  useEffect(() => {
    if (isMobile) {
      close()
    }
  }, [location])

  return (
    <Flex h='100vh' position='relative'>
      {isOpen && (
        <Box
          as='aside'
          position={['fixed', 'unset']}
          top={0}
          w={['100vw', '20rem']}
          h='100vh'
          bottom={0}
          zIndex={100}
        >
          <Sidebar />
        </Box>
      )}
      <Box
        as='main'
        w={isOpen ? 'calc(100vw - 20rem)' : 'full'}
        display={isOpen ? ['none', 'flex'] : 'flex'}
        overflowY={['unset', 'auto']}
      >
        <ContentWrapper>
          <Suspense>
            <Outlet />
          </Suspense>
        </ContentWrapper>
      </Box>
    </Flex>
  )
}
