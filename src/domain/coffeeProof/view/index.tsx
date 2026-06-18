import HeaderBreadcrumbs from '../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../shared/components/Page'

export default function CoffeeProofView(): JSX.Element {
  return (
    <Page title='Prova de Café' data-cy='coffee-proof-page'>
      <HeaderBreadcrumbs
        heading='Prova de Café'
        links={[
          {
            label: 'Prova de Café',
          },
        ]}
      />
    </Page>
  )
}
