import { Flex, VStack } from '@chakra-ui/react'
import IconButton from '../../../../../shared/components/IconButton'
import SwitchLabeled from '../../../../../shared/components/inputs/SwitchLabeled'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import FertilizerDeliveryPDFDownloadButton from '../../../components/Delivery/PDF/DownloadButton'
import DeliveryTable from '../../../components/Delivery/Table'
import { FertilizerDeliveryStatuses } from '../../../types/model/Delivery'
import useFertilizerDeliveryView from './useView'

export default function FertilizerDeliveryView(): JSX.Element {
  const {
    currentStatus,
    handleChangeStatus,
    data,
    isLoading,
    handleOpenUpdateForm,
    handleCheckPickup,
    handleUncheckPickup,
    handleOpenCreateDeliveryForm,
  } = useFertilizerDeliveryView()

  return (
    <Page title='Produtos - Entrega' data-cy='coffee-fertilizer-delivery-page'>
      <HeaderBreadcrumbs
        heading='Produtos a Entregar'
        links={[
          {
            label: 'Lista de Produtos',
          },
        ]}
        actions={
          <Flex gap={3}>
            <FertilizerDeliveryPDFDownloadButton />
            <IconButton
              aria-label='Adicionar café a buscar'
              icon='add'
              colorScheme='blue'
              variant='outline'
              data-cy='add-fertilizerDelivery-button'
              title='Adicionar café a buscar'
              onClick={handleOpenCreateDeliveryForm}
            />
          </Flex>
        }
      />
      <VStack>
        <Flex justify='center'>
          <SwitchLabeled
            rightValue={FertilizerDeliveryStatuses.COMPLETED}
            leftValue={FertilizerDeliveryStatuses.PENDING}
            onChange={(value) => {
              handleChangeStatus(value as FertilizerDeliveryStatuses)
            }}
            leftLabel='Pendentes'
            rightLabel='Finalizados'
            defaultActive={currentStatus === FertilizerDeliveryStatuses.COMPLETED ? 1 : 0}
            leftButtonProps={{
              'data-cy': 'pending-status-button',
            }}
            rightButtonProps={{
              'data-cy': 'completed-status-button',
            }}
          />
        </Flex>
        <DeliveryTable
          data={data?.data}
          isLoading={isLoading}
          totalPickups={data?.total ?? 0}
          onClickUpdate={handleOpenUpdateForm}
          onClickCheck={handleCheckPickup}
          onClickUncheck={handleUncheckPickup}
          variant={currentStatus === FertilizerDeliveryStatuses.COMPLETED ? 'completed' : 'pending'}
        />
      </VStack>
    </Page>
  )
}
