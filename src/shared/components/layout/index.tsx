import { Grid, GridItem } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import useLayoutContext from '../../hooks/useLayoutContext'
import ContentWrapper from './Content'
import Sidebar from './Sidebar'

export default function PageLayout({ children }: PropsWithChildren): JSX.Element {
  const {
    sidebar: { isOpen },
  } = useLayoutContext()
  return (
    <Grid
      gridTemplateColumns={isOpen ? '20rem 1fr' : '1fr'}
      minH='100vh'
      minW='100vw'
      position='relative'
    >
      {isOpen && <GridItem>{isOpen && <Sidebar />}</GridItem>}
      <GridItem>
        <ContentWrapper>{children}</ContentWrapper>
      </GridItem>
    </Grid>
  )
}
