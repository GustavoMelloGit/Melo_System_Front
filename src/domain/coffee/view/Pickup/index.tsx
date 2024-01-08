import { Flex } from '@chakra-ui/react'
import IconButton from '../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import PickupPDFDownloadButton from '../../components/Pickup/Pdf/DownloadButton'
import PickupTable from '../../components/Pickup/Table'
import usePickupView from './useView'

export default function CoffeePickup(): JSX.Element {
  const { handleOpenForm, order } = usePickupView()

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
          <Flex gap={3}>
            <PickupPDFDownloadButton />
            <IconButton
              aria-label='Adicionar café a buscar'
              icon='add'
              colorScheme='blue'
              variant='outline'
              onClick={handleOpenForm}
              data-cy='add-pickupCoffee-button'
              title='Adicionar café a buscar'
            />
          </Flex>
        }
      />
      <PickupTable
        data={order.data?.data}
        isLoading={order.isLoading}
        total={order.data?.total ?? 0}
      />
    </Page>
  )
}
