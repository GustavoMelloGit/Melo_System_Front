import { Grid, GridItem } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import ContentWrapper from './Content'
import Sidebar from './Sidebar'

export default function PageLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <Grid
      gridTemplateColumns={{
        md: '20rem 1fr',
        base: '1fr',
      }}
      minH='100vh'
      minW='100vw'
    >
      <GridItem
        display={{
          md: 'block',
          base: 'none',
        }}
        shadow='2xl'
      >
        <Sidebar />
      </GridItem>
      <GridItem>
        <ContentWrapper>{children}</ContentWrapper>
      </GridItem>
    </Grid>
  )
}
