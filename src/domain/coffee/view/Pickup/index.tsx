import { Flex, IconButton, VStack } from '@chakra-ui/react'
import { AiOutlinePrinter } from 'react-icons/ai'
import { IoAddOutline } from 'react-icons/io5'
import PromiseIconButton from '../../../../shared/components/buttons/PromiseIconButton'
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
            <PromiseIconButton
              icon={<AiOutlinePrinter size={22} />}
              aria-label='Baixar lista de cafés a buscar'
              service={handleDownloadList}
              colorScheme='blue'
              variant='outline'
              data-cy='download-pickupCoffee-button'
              title='Baixar lista de cafés a buscar'
            />
            <IconButton
              aria-label='Adicionar café a buscar'
              icon={<IoAddOutline size={22} />}
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
