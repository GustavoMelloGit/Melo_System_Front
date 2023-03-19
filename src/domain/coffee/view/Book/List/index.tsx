import { IconButton } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import CoffeeBookTable from '../../../components/Book/List/Table'
import useCoffeeBookView from './useView'

export default function CoffeeBookView(): JSX.Element {
  const { data, isLoading, total, openCreateBookModal } = useCoffeeBookView()
  return (
    <Page title='Criar lançamento' data-cy='coffee-entry-page'>
      <HeaderBreadcrumbs
        heading='Criar lançamento'
        links={[
          {
            label: 'Talões',
          },
        ]}
        actions={
          <IconButton
            aria-label='Criar talão'
            icon={<IoAddOutline size={22} />}
            onClick={openCreateBookModal}
            colorScheme='blue'
            variant='outline'
            data-cy='create-book-button'
          />
        }
      />
      <CoffeeBookTable data={data} isLoading={isLoading} totalBooks={total} />
    </Page>
  )
}
