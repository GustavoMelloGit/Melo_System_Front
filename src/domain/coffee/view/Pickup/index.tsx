import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'

export default function CoffeePickup(): JSX.Element {
  return (
    <Page title='Buscar café' data-cy='coffee-pickup-page'>
      <HeaderBreadcrumbs
        heading='Buscar café'
        links={[
          {
            label: 'Cafés a serem buscados',
          },
        ]}
      />
      <p>Hello World</p>
    </Page>
  )
}
