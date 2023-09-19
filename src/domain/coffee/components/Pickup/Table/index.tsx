import { Flex, VStack } from '@chakra-ui/react'
import SwitchLabeled from '../../../../../shared/components/inputs/SwitchLabeled'
import { PickupCoffeeStatuses, type PickupCoffeeModel } from '../../../types/model/pickup'
import usePickupTableView from './useView'
import PickupTableView from './View'

type Props = {
  data: PickupCoffeeModel[] | undefined
  isLoading: boolean
  total: number
}
export default function PickupTable({ data, isLoading, total }: Props): JSX.Element {
  const { onClickCheck, onClickUncheck, onClickUpdate, handleChangeStatus, currentStatus } =
    usePickupTableView()
  return (
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
      <PickupTableView
        data={data}
        isLoading={isLoading}
        totalPickups={total}
        onClickUpdate={onClickUpdate}
        onClickCheck={onClickCheck}
        onClickUncheck={onClickUncheck}
      />
    </VStack>
  )
}
