import { Routes } from '../../../../lib/routes'
import InDevelopmentTag from '../../../../shared/components/InDevelopmentTag'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import useBuyCoffeeMetricsView from './useView'

export default function BuyCoffeeMetricsView(): JSX.Element {
  useBuyCoffeeMetricsView()
  return (
    <Page title='Relatórios'>
      <HeaderBreadcrumbs
        heading='Relatórios'
        links={[
          {
            label: 'Tipo do relatório',
            to: Routes.metricsHub,
          },
          {
            label: 'Compras de café',
          },
        ]}
      />
      <InDevelopmentTag />
    </Page>
  )
}
