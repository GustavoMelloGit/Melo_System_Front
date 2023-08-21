import { Container, Heading, Stack } from '@chakra-ui/react'
import { BiTransferAlt } from 'react-icons/bi'
import { FaSearchDollar } from 'react-icons/fa'
import { TbShoppingCart } from 'react-icons/tb'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import MetricsHubOption from '../../components/Hub/Option'

export default function MetricsHubView(): JSX.Element {
  return (
    <Page title='Relatórios'>
      <Container
        as='section'
        pt={{
          base: 5,
          sm: 20,
        }}
      >
        <Heading
          as='h1'
          fontSize={{
            base: 'xl',
            sm: '3xl',
          }}
        >
          Escolha o tipo de relatório
        </Heading>
        <Stack
          mt={{
            base: 6,
            sm: 10,
          }}
          spacing={3}
        >
          <MetricsHubOption
            icon={<TbShoppingCart size={37} />}
            title='Compras de café'
            subtitle='Relatório referente as compras de cafés realizadas.'
            url={Routes.buyCoffeeMetrics}
          />
          <MetricsHubOption
            icon={<BiTransferAlt size={40} />}
            title='Transações'
            subtitle='Relatório referente a todas as movimentações do sistema.'
            url={Routes.transactionMetrics}
          />
          <MetricsHubOption
            icon={<FaSearchDollar size={28} />}
            title='Preço de café'
            subtitle='Consultar valor pago por saco e tipo de café'
            url={Routes.coffeePrice}
          />
        </Stack>
      </Container>
    </Page>
  )
}
