import { Button, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Routes } from '../../../../lib/routes'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import BuyCoffeeMetricsTableView from '../../components/BuyCoffee/TableView'
import { type BuyCoffeeMetricsFilterOptions } from '../../types/buy-coffee-metrics'
import useBuyCoffeeMetricsView from './useView'

export default function BuyCoffeeMetricsView(): JSX.Element {
  const { data, isLoading, defaultValues, handleSubmitFilters } = useBuyCoffeeMetricsView()
  const { handleSubmit, control } = useForm<BuyCoffeeMetricsFilterOptions>({ defaultValues })

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
      <Flex
        as='form'
        gap={2}
        align='flex-end'
        onSubmit={handleSubmit(handleSubmitFilters)}
        w='full'
      >
        <ControllerField control={control} name='startDate' type='date' label='Data de Início' />
        <ControllerField control={control} name='endDate' type='date' label='Data final' />
        <Button type='submit' w='full' rounded='xl'>
          Filtrar
        </Button>
      </Flex>
      <BuyCoffeeMetricsTableView isLoading={isLoading} data={data} />
    </Page>
  )
}
