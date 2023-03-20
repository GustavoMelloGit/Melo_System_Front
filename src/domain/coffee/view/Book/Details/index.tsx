import { IconButton } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SheetsTable from '../../../components/Sheet/List'

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
        actions={
          <Link to={Routes.createSheet(number)} data-cy='create-sheet-link'>
            <IconButton
              as='span'
              aria-label='Criar talão'
              icon={<IoAddOutline size={22} />}
              colorScheme='blue'
              variant='outline'
              data-cy='create-book-button'
            />
          </Link>
        }
      />
      <SheetsTable data={[]} isLoading={false} totalBooks={0} />
    </Page>
  )
}
