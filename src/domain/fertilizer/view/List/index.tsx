import IconButton from '../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import FertilizerTable from '../../components/List/Table'
import useFertilizerListView from './useView'

const FertilizerListView = (): JSX.Element => {
  const {
    response: { data, isLoading, mutate },
    handleAddFertilizer,
  } = useFertilizerListView()
  return (
    <Page title='Estoque' data-cy='list-clients-page'>
      <HeaderBreadcrumbs
        heading='Estoque'
        links={[
          {
            label: 'Estoque de produtos',
          },
        ]}
        actions={
          <IconButton
            aria-label='Adicionar produto'
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
