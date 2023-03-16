import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'

export default function CoffeeEntry(): JSX.Element {
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
      <p>Hello World</p>
    </Page>
  )
}
