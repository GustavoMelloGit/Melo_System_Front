import { IconButton } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import FertilizersTable from '../../components/FertilizersTable'

export default function FertilizerListView(): JSX.Element {
  return (
    <Page title='Adubos'>
      <HeaderBreadcrumbs
        heading='Adubos'
        actions={
          <IconButton
            aria-label='Criar cliente'
            icon={<IoAddOutline size={22} />}
            colorScheme='blue'
            variant='outline'
          />
        }
      />
      <FertilizersTable data={[]} isLoading={false} onUpdateAction={() => {}} />
    </Page>
  )
}
