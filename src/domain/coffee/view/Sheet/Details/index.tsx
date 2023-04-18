import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SheetForm from '../../../components/Sheet/Form'
import useSheetDetailsView from './useView'

export default function SheetDetailsView(): JSX.Element {
  const { bookNumber, sheetNumber } = useParams<{ bookNumber: string; sheetNumber: string }>()
  const { initialValues } = useSheetDetailsView({ sheetNumber })
  if (!bookNumber || !sheetNumber) return <Navigate to={Routes.books} />

  return (
    <Page title={`Folha ${sheetNumber}`} data-cy='create-sheet-page'>
      <HeaderBreadcrumbs
        heading={`Folha ${sheetNumber}`}
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
            label: 'Visualizar folha',
          },
        ]}
      />
      <SheetForm variant='view' initialValues={initialValues} />
    </Page>
  )
}
