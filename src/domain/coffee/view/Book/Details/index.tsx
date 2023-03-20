import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'

export default function BookDetailsView(): JSX.Element {
  const { number } = useParams<{ number: string }>()
  if (!number) return <Navigate to={Routes.books} />

  return (
    <Page title={`Talão ${number}`} data-cy='coffee-entry-page'>
      <HeaderBreadcrumbs
        heading='Criar lançamento'
        links={[
          {
            label: 'Talões',
            to: Routes.books,
          },
          {
            label: `Talão ${number}`,
          },
        ]}
      />
    </Page>
  )
}
