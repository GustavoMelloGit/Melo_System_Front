import { Box, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import BuyCoffeeMetricsTableView from '../../components/BuyCoffee/TableView'
import BuyCoffeeMetricsTemplate from '../../components/BuyCoffee/Template/Template'
import MetricsDownloadButton from '../../components/MetricsDownloadButton'
import { type CoffeePriceMetricsFilterOptions } from '../../types/buyCoffeeMetrics'
import useBuyCoffeeMetricsView from './useView'

export default function BuyCoffeeMetricsView(): JSX.Element {
  const { data, isLoading, defaultValues, handleSubmitFilters } = useBuyCoffeeMetricsView()
  const { handleSubmit, control } = useForm<CoffeePriceMetricsFilterOptions>({ defaultValues })

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
        actions={
          <MetricsDownloadButton
            template={<BuyCoffeeMetricsTemplate data={data?.data ?? []} />}
            aria-label='Baixar relatório de compras de café'
            data-cy='download-buy-coffee-metrics'
            title='Baixar relatório de compras de café'
          />
        }
      />
      <Box
        display='grid'
        gridTemplateColumns='repeat(auto-fit, minmax(160px, 1fr))'
        placeItems='end'
        as='form'
        gap={2}
        onSubmit={handleSubmit(handleSubmitFilters)}
        w='full'
      >
        <ControllerField control={control} name='startDate' type='date' label='Data de Início' />
        <ControllerField control={control} name='endDate' type='date' label='Data final' />
        <Button type='submit' w='full' rounded='xl'>
          Filtrar
        </Button>
      </Box>
      <BuyCoffeeMetricsTableView isLoading={isLoading} data={data ?? { data: [] }} />
    </Page>
  )
}
