import { Button, Flex, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Routes } from '../../../../lib/routes'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { type ExtendedRecord } from '../../../../shared/types/utils/ExtendedRecord'
import { type TransactionTypeName } from '../../../client/types/model/Transaction'
import TransactionMetricsTableView from '../../components/Transaction/TableView'
import { type TransactionMetricsFilterOptions } from '../../types/transactionMetrics'
import useTransactionMetricsView, { undefinedFilterType } from './useView'

export default function TransactionMetricsView(): JSX.Element | null {
  const { data, isLoading, defaultValues, handleSubmitFilters } = useTransactionMetricsView()
  const { handleSubmit, control } = useForm<TransactionMetricsFilterOptions>({
    defaultValues,
  })

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
            label: 'Transações',
          },
        ]}
      />
      <Flex
        as='form'
        gap={2}
        align='flex-end'
        onSubmit={handleSubmit(handleSubmitFilters)}
        w='full'
      >
        <ControllerField
          control={control}
          name='type'
          CustomInput={
            <Select>
              {Object.entries(metricsOptions).map(([metricType, label]) => (
                <option value={metricType} key={metricType}>
                  {label}
                </option>
              ))}
            </Select>
          }
          label='Filtrar por conta'
        />
        <ControllerField control={control} name='startDate' type='date' label='Data de Início' />
        <ControllerField control={control} name='endDate' type='date' label='Data final' />
        <Button type='submit' w='full' rounded='xl'>
          Filtrar
        </Button>
      </Flex>

      <TransactionMetricsTableView isLoading={isLoading} data={data} />
    </Page>
  )
}

const metricsOptions: ExtendedRecord<TransactionTypeName, string> = {
  [undefinedFilterType]: 'Sem filtro',
  currency: 'Corrente',
  bags: 'Sacaria',
  escolha: 'Escolha',
  fertilizer: 'Adubo',
  duro: 'Café duro',
  duro_riado: 'Café duro riado',
  rio: 'Café rio',
  rio_velho: 'Café rio velho',
  rio_zona: 'Café rio zona',
  riado: 'Café riado',
  riado_rio: 'Café riado rio',
  duro_riado_rio: 'Café duro riado rio',
}
