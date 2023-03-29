import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SheetForm from '../../../components/Sheet/Form'
import useUpdateSheetView from './useView'

export default function UpdateSheetView(): JSX.Element {
  const { bookNumber, sheetNumber } = useParams<{ bookNumber: string; sheetNumber: string }>()
  const { updateSheet, initialValues } = useUpdateSheetView({ bookNumber, sheetNumber })
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
      <SheetForm onSubmit={updateSheet} initialValues={initialValues} />
    </Page>
  )
}
