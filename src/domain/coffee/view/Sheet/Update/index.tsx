import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SheetForm from '../../../components/Sheet/Form'
import useUpdateSheetView from './useView'

export default function UpdateSheetView(): JSX.Element {
  const { bookNumber, sheetNumber } = useParams<{ bookNumber: string; sheetNumber: string }>()
  const { updateSheet, initialValues } = useUpdateSheetView({ sheetNumber, bookNumber })
  if (!bookNumber || !sheetNumber) return <Navigate to={Routes.books} />
  return (
    <Page title='Adicionar Folha' data-cy='create-sheet-page'>
      <HeaderBreadcrumbs
        heading={`Editar folha ${sheetNumber}`}
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
            label: 'Editar folha',
          },
        ]}
      />
      <SheetForm onSubmit={updateSheet} variant='edit' initialValues={initialValues} />
    </Page>
  )
}
