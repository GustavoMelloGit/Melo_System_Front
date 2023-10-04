import { Flex } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import SwitchLabeled from '../../../../shared/components/inputs/SwitchLabeled'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import useTabs from '../../../../shared/hooks/useTabs'
import CredoresDevedoresMetricsTableView from '../../components/CredoresDevedores/TableView'
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
      />
      <Flex justify='center'>
        <SwitchLabeled
          rightValue={'debit'}
          leftValue={'credit'}
          onChange={(value) => {
            onChangeTab(value)
            console.log(value)
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
