import { Box, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import CoffeePriceMetricsTableView from '../../components/CoffeePrice/TableView'
import CoffeePriceMetricsTemplate from '../../components/CoffeePrice/Template/Template'
import MetricsDownloadButton from '../../components/MetricsDownloadButton'
import { type CoffeePriceMetricsFilterOptions } from '../../types/buyCoffeeMetrics'
import useCoffeePriceMetricsView from './useView'

export default function CoffeePriceMetricsView(): JSX.Element {
  const { data, isLoading, defaultValues, handleSubmitFilters } = useCoffeePriceMetricsView()
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
            label: 'Preço de café',
          },
        ]}
        actions={
          <MetricsDownloadButton
            template={<CoffeePriceMetricsTemplate data={data?.data ?? []} />}
            aria-label='Baixar relatório de preço de café'
            data-cy='download-coffee-price-metrics'
            title='Baixar relatório de preço de café'
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
        {/* <ControllerField
          control={control}
          name='bebida'
          label='Bebida'
          CustomInput={
            <Select>
              {objectEntries(CoffeeBebidasLabel).map(([type, label]) => (
                <option key={type} value={type}>
                  {label}
                </option>
              ))}
            </Select>
          }
        /> */}
        <ControllerField control={control} name='startDate' type='date' label='Data de Início' />
        <ControllerField control={control} name='endDate' type='date' label='Data final' />
        <Button type='submit' w='full' rounded='xl'>
          Filtrar
        </Button>
      </Box>
      <CoffeePriceMetricsTableView isLoading={isLoading} data={data} />
    </Page>
  )
}
