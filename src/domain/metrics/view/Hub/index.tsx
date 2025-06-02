import { Container, Heading, Stack } from '@chakra-ui/react'
import { BiTransferAlt } from 'react-icons/bi'
import { CiCoffeeBean } from 'react-icons/ci'
import { FaSearchDollar } from 'react-icons/fa'
import { GiCoffeeBeans } from 'react-icons/gi'
import { MdMoneyOff } from 'react-icons/md'
import { TbDatabaseDollar, TbShoppingCart } from 'react-icons/tb'
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
            icon={<FaSearchDollar size={28} />}
            title='Preço de café'
            subtitle='Consultar valor pago por saco e tipo de café'
            url={Routes.coffeePrice}
          />
          <MetricsHubOption
            icon={<BiTransferAlt size={40} />}
            title='Transações'
            subtitle='Relatório referente a todas as movimentações do sistema.'
            url={Routes.transactionMetrics}
          />
          <MetricsHubOption
            icon={<TbDatabaseDollar size={32} />}
            title='Credores e Devedores'
            subtitle='Consulte os saldos dos clientes.'
            url={Routes.credoresDevedoresMetrics}
          />
          <MetricsHubOption
            icon={<GiCoffeeBeans size={30} />}
            title='Credores e Devedores de Café - Bebida'
            subtitle='Consulte o saldo das bebidas de café dos clientes.'
            url={Routes.credoresDevedoresBebidaMetrics}
          />
          <MetricsHubOption
            icon={<CiCoffeeBean size={34} />}
            title='Credores e Devedores de Café - Saldo'
            subtitle='Consulte o saldo de café dos clientes.'
            url={Routes.credoresDevedoresCafeMetrics}
          />
          <MetricsHubOption
            icon={<MdMoneyOff size={34} />}
            title='Lista de Inadimplentes'
            subtitle='Consulte os clientes inadimplentes.'
            url={Routes.inadimplentesMetrics}
          />
        </Stack>
      </Container>
    </Page>
  )
}
