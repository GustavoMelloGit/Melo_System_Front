import { Box, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Routes } from '../../../../lib/routes'
import Page from '../../../../shared/components/Page'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import InadimplentesMetricsTableView from '../../components/Inadimplentes/TableView'
import useInadimplentesMetricsView from './useView'

export default function InadimplentesMetricsView(): JSX.Element {
  const { data, isLoading, defaultValues, handleSubmitFilters } = useInadimplentesMetricsView()
  const { handleSubmit, control } = useForm<{ startDate: string }>({
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
            label: 'Lista de inadimplentes',
          },
        ]}
      />
      <Box
        display='flex'
        placeItems='end'
        as='form'
        gap={2}
        onSubmit={handleSubmit(handleSubmitFilters)}
        w='full'
      >
        <ControllerField
          control={control}
          name='startDate'
          type='date'
          label='Inadimplente desde'
        />
        <Button type='submit' w='10rem' rounded='xl'>
          Filtrar
        </Button>
      </Box>
      <InadimplentesMetricsTableView data={data.data} isLoading={isLoading} />
    </Page>
  )
}
