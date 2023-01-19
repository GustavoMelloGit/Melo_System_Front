import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import useLayoutContext from '../../hooks/useLayoutContext'
import Suspense from '../Suspense'
import ContentWrapper from './Content'
import Sidebar from './Sidebar'

export default function PageLayout(): JSX.Element {
  const {
    sidebar: { isOpen },
  } = useLayoutContext()
  return (
    <Flex minH='100vh' minW='100vw' position='relative'>
      {isOpen && (
        <Box as='aside' position='fixed' top={0} w={['100vw', 80]} bottom={0} zIndex={10000}>
          <Sidebar />
        </Box>
      )}
      <Box
        as='main'
        ml={isOpen ? 80 : 0}
        w={isOpen ? 'calc(100vw - 20rem)' : 'full'}
        display={isOpen ? ['none', 'flex'] : 'flex'}
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
