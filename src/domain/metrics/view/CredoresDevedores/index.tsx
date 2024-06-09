import { Flex } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import SwitchLabeled from '../../../../shared/components/inputs/SwitchLabeled'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import useTabs from '../../../../shared/hooks/useTabs'
import CredoresDevedoresMetricsTableView from '../../components/CredoresDevedores/TableView'
import CredoresDevedoresMetricsTemplate from '../../components/CredoresDevedores/Template/Template'
import MetricsDownloadButton from '../../components/MetricsDownloadButton'
import useCredoresDevedoresMetricsView from './useView'

export default function CredoresDevedoresMetricsView(): JSX.Element {
  const { onChangeTab, currentTab } = useTabs({ queryName: 'showOnly' })
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
        actions={
          <MetricsDownloadButton
            template={<CredoresDevedoresMetricsTemplate data={data} />}
            aria-label='Baixar relatório credores e devedores'
            data-cy='download-credores-devedores-metrics'
            title='Baixar relatório credores e devedores'
          />
        }
      />
      <Flex justify='center'>
        <SwitchLabeled
          rightValue={'debit'}
          leftValue={'credit'}
          onChange={(value) => {
            onChangeTab(value)
          }}
          leftLabel='Credores'
          rightLabel='Devedores'
          defaultActive={currentTab === 'debit' ? 1 : 0}
        />
      </Flex>
      <CredoresDevedoresMetricsTableView data={data} isLoading={isLoading} />
    </Page>
  )
}
