import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import useLayoutContext from '../../hooks/useLayoutContext'
import ContentWrapper from './Content'
import Sidebar from './Sidebar'

export default function PageLayout(): JSX.Element {
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
      {isOpen && <GridItem as='aside'>{isOpen && <Sidebar />}</GridItem>}
      <GridItem as='main'>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </GridItem>
    </Grid>
  )
}
