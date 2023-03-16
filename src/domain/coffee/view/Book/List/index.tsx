import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import CoffeeBookTable from '../../../components/Book/List/Table'
import useCoffeeBookView from './useView'

export default function CoffeeBookView(): JSX.Element {
  const { data, isLoading, total } = useCoffeeBookView()
  return (
    <Page title='Criar lançamento' data-cy='coffee-entry-page'>
      <HeaderBreadcrumbs
        heading='Criar lançamento'
        links={[
          {
            label: 'Talões',
          },
        ]}
      />
      <CoffeeBookTable data={data} isLoading={isLoading} totalBooks={total} />
    </Page>
  )
}
