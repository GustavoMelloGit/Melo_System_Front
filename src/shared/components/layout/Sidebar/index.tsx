import { Button, Divider, Slide, VStack } from '@chakra-ui/react'
import { RxDoubleArrowLeft } from 'react-icons/rx'
import useLayoutContext from '../../../hooks/useLayoutContext'
import { SidebarHeader, SidebarList } from './components'

export default function Sidebar(): JSX.Element {
  const {
    sidebar: { isOpen, close },
  } = useLayoutContext()
  return (
    <Slide direction={'left'} in={isOpen}>
      <VStack
        shadow='2xl'
        h='full'
        w='full'
        maxW='20rem'
        align='stretch'
        gap={4}
        py={8}
        px={6}
        position='fixed'
      >
        {isOpen && (
          <Button
            onClick={close}
            variant='ghost'
            w='max-content'
            position='absolute'
            top={4}
            right={4}
          >
            <RxDoubleArrowLeft size={22} />
          </Button>
        )}

        <SidebarHeader />
        <Divider />
        <SidebarList />
      </VStack>
    </Slide>
  )
}
