import { Container, Heading, Stack } from '@chakra-ui/react'
import { BiTransferAlt } from 'react-icons/bi'
import { TbShoppingCart } from 'react-icons/tb'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import MetricsHubOption from '../../components/Hub/Option'

export default function MetricsHubView(): JSX.Element {
  return (
    <Page title='Relatórios'>
      <Container as='section' pt={20}>
        <Heading as='h1'>Escolha o tipo de relatório</Heading>
        <Stack mt={10} spacing={3}>
          <MetricsHubOption
            icon={<TbShoppingCart size={40} />}
            title='Compras de café'
            subtitle='Relatórios referentes as compras de cafés realizadas'
            url={Routes.buyCoffeeMetrics}
          />
          <MetricsHubOption
            icon={<BiTransferAlt size={40} />}
            title='Transações'
            subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            url={Routes.transactionMetrics}
          />
        </Stack>
      </Container>
    </Page>
  )
}
