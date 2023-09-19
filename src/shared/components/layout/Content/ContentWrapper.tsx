import { Container } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import { type LayoutSizes } from '../../../contexts/LayoutContext/types'
import useLayoutContext from '../../../hooks/useLayoutContext'
import ToggleSidebarButton from '../Sidebar/components/ToggleSidebarButton'

const maxW: Record<LayoutSizes, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
}
export default function ContentWrapper({ children }: PropsWithChildren): JSX.Element {
  const {
    sidebar: { isOpen },
    layout: { size },
  } = useLayoutContext()

  return (
    <Container
      position='relative'
      maxW={maxW[size]}
      flex={1}
      display='flex'
      flexDir='column'
      py={10}
      pb={20}
    >
      {!isOpen && <ToggleSidebarButton />}
      {children}
    </Container>
  )
}
