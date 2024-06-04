import { Flex } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import SwitchLabeled from '../../../../shared/components/inputs/SwitchLabeled'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import useTabs from '../../../../shared/hooks/useTabs'
import GraphView from '../../components/CredoresDevedoresCafe/GraphView'
import CredoresDevedoresCafeMetricsTableView from '../../components/CredoresDevedoresCafe/TableView'
import CredoresDevedoresCafeMetricsTemplate from '../../components/CredoresDevedoresCafe/Template/Template'
import MetricsDownloadButton from '../../components/MetricsDownloadButton'
import useCredoresDevedoresCafeMetricsView from './useView'

export default function CredoresDevedoresCafeMetricsView(): JSX.Element {
  const { onChangeTab, currentTab } = useTabs({ queryName: 'showOnly' })
  const { data, isLoading } = useCredoresDevedoresCafeMetricsView()
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
            template={<CredoresDevedoresCafeMetricsTemplate data={data} />}
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
      {!isLoading && <GraphView data={data} isLoading={isLoading} />}
      <CredoresDevedoresCafeMetricsTableView data={data} isLoading={isLoading} />
    </Page>
  )
}
