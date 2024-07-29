import { Flex } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import SwitchLabeled from '../../../../shared/components/inputs/SwitchLabeled'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import useTabs from '../../../../shared/hooks/useTabs'
import GraphView from '../../components/CredoresDevedoresBebida/GraphView'
import CredoresDevedoresBebidaMetricsTableView from '../../components/CredoresDevedoresBebida/TableView'
import CredoresDevedoresBebidaMetricsTemplate from '../../components/CredoresDevedoresBebida/Template/Template'
import MetricsDownloadButton from '../../components/MetricsDownloadButton'
import useCredoresDevedoresBebidaMetricsView from './useView'

export default function CredoresDevedoresBebidaMetricsView(): JSX.Element {
  const { onChangeTab, currentTab } = useTabs({ queryName: 'showOnly' })
  const { data, isLoading } = useCredoresDevedoresBebidaMetricsView()
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
            label: 'Credores e Devedores de Café',
          },
        ]}
        actions={
          <MetricsDownloadButton
            template={<CredoresDevedoresBebidaMetricsTemplate data={data} />}
            aria-label='Baixar relatório credores e devedores de café'
            data-cy='download-credores-devedores-coffee-metrics'
            title='Baixar relatório credores e devedores de café'
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
      {!isLoading && <GraphView data={data} />}
      <CredoresDevedoresBebidaMetricsTableView data={data} isLoading={isLoading} />
    </Page>
  )
}
