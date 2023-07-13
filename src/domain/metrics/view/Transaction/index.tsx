import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { type ExtendedRecord } from '../../../../shared/types/utils/ExtendedRecord'
import { type TransactionTypeName } from '../../../client/types/model/Transaction'
import TransactionMetricsTableView from '../../components/Transaction/TableView'
import { getTransactionMetrics } from '../../services/get'

const metricsOptions: ExtendedRecord<TransactionTypeName, string> = {
  undefined: 'Sem filtro',
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

type TransactionMetricsFilterOptions = {
  type: keyof typeof metricsOptions
  startDate: string
  endDate: string
}
export default function TransactionMetricsView(): JSX.Element | null {
  const [filterParams, setFilterParams] = useState<TransactionMetricsFilterOptions | undefined>(
    undefined,
  )
  const { handleSubmit, control } = useForm<TransactionMetricsFilterOptions>({
    defaultValues: {
      endDate: '',
      startDate: '',
      type: 'undefined',
    },
  })
  const { data, isLoading } = getTransactionMetrics(filterParams)

  return (
    <Page title='Relatórios'>
      <HeaderBreadcrumbs
        heading='Relatórios'
        links={[
          {
            label: 'Relatórios do sistema',
          },
        ]}
      />
      <VStack as='ul'>
        {/* <Flex as='form' gap={1} align='flex-end' onSubmit={handleSubmit(setFilterParams)} w='full'>
          <ControllerField
            control={control}
            name='metricsType'
            CustomInput={<Select />}
            label='Filtrar por conta'
          >
            {Object.entries(metricsOptions).map(([metricType, label]) => (
              <option value={metricType} key={metricType}>
                {label}
              </option>
            ))}
          </ControllerField>
          <ControllerField control={control} name='startDate' type='date' label='Data de Início' />
          <ControllerField control={control} name='endDate' type='date' label='Data final' />
          <Button type='submit'>Filtrar</Button>
        </Flex> */}

        <TransactionMetricsTableView isLoading={isLoading} data={data} />
      </VStack>
    </Page>
  )
}
