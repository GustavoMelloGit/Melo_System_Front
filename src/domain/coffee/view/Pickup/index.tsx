import { IconButton } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import PickupTable from '../../components/Pickup/Table'
import usePickupView from './useView'

export default function CoffeePickup(): JSX.Element {
  const { order, handleOpenForm, handleOpenUpdateForm, handleCheckPickup } = usePickupView()
  const { isLoading, data, total } = order

  return (
    <Page title='Buscar café' data-cy='coffee-pickup-page'>
      <HeaderBreadcrumbs
        heading='Cafés a buscar'
        links={[
          {
            label: 'Lista de cafés',
          },
        ]}
        actions={
          <IconButton
            aria-label='Adicionar café a buscar'
            icon={<IoAddOutline size={22} />}
            colorScheme='blue'
            variant='outline'
            onClick={handleOpenForm}
            data-cy='add-pickupCoffee-button'
          />
        }
      />
      <PickupTable
        data={data}
        isLoading={isLoading}
        totalPickups={total ?? 0}
        onClickUpdate={handleOpenUpdateForm}
        onClickCheck={handleCheckPickup}
      />
    </Page>
  )
}
