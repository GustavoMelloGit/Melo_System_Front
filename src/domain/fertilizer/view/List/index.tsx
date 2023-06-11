import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import TableButton from '../../../../shared/components/table/buttons'
import FertilizerTable from '../../components/List/Table'
import useFertilizerListView from './useView'

const FertilizerListView = (): JSX.Element => {
  const {
    response: { data, isLoading, mutate },
    handleAddFertilizer,
  } = useFertilizerListView()
  return (
    <Page title='Adubos' data-cy='list-clients-page'>
      <HeaderBreadcrumbs
        heading='Adubos'
        links={[
          {
            label: 'Lista de adubos',
          },
        ]}
        actions={
          <TableButton
            aria-label='Adicionar adubo'
            icon='add'
            variant='outline'
            colorScheme='blue'
            onClick={handleAddFertilizer}
          />
        }
      />
      <FertilizerTable
        data={data?.data}
        refetch={mutate}
        isLoading={isLoading}
        totalBooks={data?.total ?? 0}
      />
    </Page>
  )
}
export default FertilizerListView
