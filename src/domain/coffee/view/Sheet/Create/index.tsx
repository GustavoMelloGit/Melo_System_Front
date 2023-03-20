import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SheetForm from '../../../components/Sheet/Form'
import { type SheetFormValues } from '../../../types/model/sheet'

export default function CreateSheetView(): JSX.Element {
  const { bookNumber } = useParams<{ bookNumber: string }>()
  if (!bookNumber) return <Navigate to={Routes.books} />

  async function handleCreateSheet(values: SheetFormValues): Promise<void> {
    console.log(values)
  }
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
      <SheetForm onSubmit={handleCreateSheet} />
    </Page>
  )
}
