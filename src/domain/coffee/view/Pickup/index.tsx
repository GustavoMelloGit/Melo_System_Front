import { Flex, IconButton, VStack } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import SwitchLabeled from '../../../../shared/components/inputs/SwitchLabeled'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import PickupTable from '../../components/Pickup/Table'
import { PickupCoffeeStatuses } from '../../types/model/pickup'
import usePickupView from './useView'

export default function CoffeePickup(): JSX.Element {
  const {
    order,
    handleOpenForm,
    handleOpenUpdateForm,
    handleCheckPickup,
    handleChangeStatus,
    currentStatus,
  } = usePickupView()
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
      <VStack>
        <Flex justify='center'>
          <SwitchLabeled
            rightValue={PickupCoffeeStatuses.COMPLETED}
            leftValue={PickupCoffeeStatuses.PENDING}
            onChange={(value) => {
              handleChangeStatus(value as PickupCoffeeStatuses)
            }}
            leftLabel='Pendentes'
            rightLabel='Finalizados'
            defaultActive={currentStatus === PickupCoffeeStatuses.COMPLETED ? 1 : 0}
            leftButtonProps={{
              'data-cy': 'pending-status-button',
            }}
            rightButtonProps={{
              'data-cy': 'completed-status-button',
            }}
          />
        </Flex>
        <PickupTable
          data={data}
          isLoading={isLoading}
          totalPickups={total ?? 0}
          onClickUpdate={handleOpenUpdateForm}
          onClickCheck={handleCheckPickup}
        />
      </VStack>
    </Page>
  )
}
