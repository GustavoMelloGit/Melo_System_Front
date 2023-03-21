import { toast } from 'react-hot-toast'
import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SheetForm from '../../../components/Sheet/Form'
import { createSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'

export default function CreateSheetView(): JSX.Element {
  const { bookNumber } = useParams<{ bookNumber: string }>()
  if (!bookNumber) return <Navigate to={Routes.books} />

  async function handleCreateSheet({ clientId, ...values }: SheetFormValues): Promise<void> {
    if (!bookNumber) return
    const { error } = await createSheetService(values, clientId, bookNumber)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Folha criada com sucesso')
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
