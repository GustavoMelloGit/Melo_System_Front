import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import useFertilizerListView from './useView'

const FertilizerListView = (): JSX.Element => {
  const { response } = useFertilizerListView()
  console.log(response.data)
  return (
    <Page title='Adubos' data-cy='list-clients-page'>
      <HeaderBreadcrumbs
        heading='Adubos'
        links={[
          {
            label: 'Lista de adubos',
          },
        ]}
      />
    </Page>
  )
}
export default FertilizerListView
