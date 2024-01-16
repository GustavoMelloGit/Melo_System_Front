import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import Page from '../../../../../shared/components/Page'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import SheetForm from '../../../components/Sheet/Form'
import useCreateSheetView from './useView'

export default function CreateSheetView(): JSX.Element {
  const { bookNumber } = useParams<{ bookNumber: string }>()
  const { createSheet, initialValues } = useCreateSheetView({ bookNumber })
  if (!bookNumber) return <Navigate to={Routes.books} />

  return (
    <Page title='Adicionar Folha' data-cy='create-sheet-page'>
      <HeaderBreadcrumbs
        heading='Crie uma nova folha'
        links={[
          {
            label: 'Talões',
            to: Routes.books,
          },
          {
            label: `Talão ${bookNumber}`,
            to: Routes.bookPage(bookNumber),
          },
          {
            label: 'Adicionar Folha',
          },
        ]}
      />
      <SheetForm variant='create' onSubmit={createSheet} initialValues={initialValues} />
    </Page>
  )
}
