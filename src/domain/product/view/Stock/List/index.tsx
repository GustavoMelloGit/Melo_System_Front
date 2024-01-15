import IconButton from '../../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import StockTable from '../../../components/Stock/List/Table'
import useStockListView from './useView'

const StockListView = (): JSX.Element => {
  const {
    response: { data, isLoading },
    createProductHandler,
  } = useStockListView()
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
            onClick={createProductHandler}
          />
        }
      />
      <StockTable data={data?.data} isLoading={isLoading} totalBooks={data?.total ?? 0} />
    </Page>
  )
}
export default StockListView
