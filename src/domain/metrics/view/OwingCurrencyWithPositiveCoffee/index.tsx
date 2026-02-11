import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import MetricsDownloadButton from '../../components/MetricsDownloadButton'
import OwingCurrencyWithPositiveCoffeeMetricsTableView from '../../components/OwingCurrencyWithPositiveCoffee/TableView'
import OwingCurrencyWithPositiveCoffeeMetricsTemplate from '../../components/OwingCurrencyWithPositiveCoffee/Template/Template'
import useOwingCurrencyWithPositiveCoffeeMetricsView from './useView'

export default function OwingCurrencyWithPositiveCoffeeMetricsView(): JSX.Element {
  const { data, isLoading } = useOwingCurrencyWithPositiveCoffeeMetricsView()

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
            label: 'Devendo na conta corrente com saldo café positivo',
          },
        ]}
        actions={
          <MetricsDownloadButton
            template={<OwingCurrencyWithPositiveCoffeeMetricsTemplate data={data?.data ?? []} />}
            aria-label='Baixar relatório devendo conta corrente com saldo café'
            data-cy='download-owing-currency-with-positive-coffee-metrics'
            title='Baixar relatório devendo conta corrente com saldo café'
          />
        }
      />
      <OwingCurrencyWithPositiveCoffeeMetricsTableView data={data} isLoading={isLoading} />
    </Page>
  )
}
