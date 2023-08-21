import { Button, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Routes } from '../../../../lib/routes'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import CoffeePriceMetricsTableView from '../../components/CoffeePrice/TableView'
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
      </Flex>
      <CoffeePriceMetricsTableView isLoading={isLoading} data={data} />
    </Page>
  )
}
