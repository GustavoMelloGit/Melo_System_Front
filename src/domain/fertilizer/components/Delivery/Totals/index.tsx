import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import Modal from '../../../../../shared/components/Modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type FertilizerDeliveryTotal } from '../../../types/model/Delivery'

type Props = {
  totals: FertilizerDeliveryTotal[] | undefined
}
export default function FertilizerDeliveryTotals({ totals = [] }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <Modal.Content data-cy='fertilizer-delivery-totals-modal'>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Total por Adubo
          </Heading>
        </Modal.Header>
        <Modal.Body pb={8}>
          <Stack>
            {totals.length ? (
              totals.map((total, index) => (
                <Fragment key={total.fertilizerId}>
                  {index > 0 && <Divider />}
                  <Flex gap={2} justify='space-between' px={2}>
                    <Text fontWeight={700}>{total.name}</Text>
                    <Text>{total.amount}</Text>
                  </Flex>
                </Fragment>
              ))
            ) : (
              <Text textAlign='center'>Nenhum adubo a entregar</Text>
            )}
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
