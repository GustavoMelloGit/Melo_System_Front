import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import CredoresDevedoresMetricsTableView from '../../components/CredoresDevedores/TableView'
import useCredoresDevedoresMetricsView from './useView'

export default function CredoresDevedoresMetricsView(): JSX.Element {
  const { data, isLoading } = useCredoresDevedoresMetricsView()
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
            label: 'Credores e Devedores',
          },
        ]}
      />
      <CredoresDevedoresMetricsTableView data={data} isLoading={isLoading} />
    </Page>
  )
}
