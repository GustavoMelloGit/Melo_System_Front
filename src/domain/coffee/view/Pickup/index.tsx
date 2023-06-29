import { Flex, VStack } from '@chakra-ui/react'
import IconButton from '../../../../shared/components/IconButton'
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
    handleUncheckPickup,
    handleDownloadList,
  } = usePickupView()
  const { isLoading, data } = order

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
            <IconButton
              icon='printer'
              aria-label='Baixar lista de cafés a buscar'
              onClick={handleDownloadList}
              colorScheme='blue'
              variant='outline'
              data-cy='download-pickupCoffee-button'
              title='Baixar lista de cafés a buscar'
            />
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
          data={data?.data}
          isLoading={isLoading}
          totalPickups={data?.total ?? 0}
          onClickUpdate={handleOpenUpdateForm}
          onClickCheck={handleCheckPickup}
          onClickUncheck={handleUncheckPickup}
          variant={currentStatus === PickupCoffeeStatuses.COMPLETED ? 'completed' : 'pending'}
        />
      </VStack>
    </Page>
  )
}
