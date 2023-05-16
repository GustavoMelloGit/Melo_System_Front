import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Skeleton } from '@chakra-ui/react'
import { Fragment, type ReactNode } from 'react'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../lib/utils/styles'
import { useModal } from '../../../../../shared/hooks/useModal'
import { getNumberOfBags } from '../../../../coffee/utils/Coffee'
import { getClientBalancesService } from '../../../service'
import { type ClientBalance } from '../../../types/model/Client'

type Props = {
  clientUuid: string | undefined
}
const ClientBalancesView = ({ clientUuid }: Props): JSX.Element => {
  const { data } = getClientBalancesService(clientUuid)
  const closeModal = useModal((state) => state.closeModal)
  const displayData: Record<
    ClientBalance['type'],
    {
      label: string
      displayType: 'currency' | 'weight' | 'bag'
    }
  > = {
    currency: {
      label: 'Conta Corrente',
      displayType: 'currency',
    },
    bags: {
      label: 'Sacaria',
      displayType: 'bag',
    },
    duro: {
      label: 'Café Duro',
      displayType: `weight`,
    },
    duro_riado: {
      label: 'Café Duro Riado',
      displayType: 'weight',
    },
    duro_riado_rio: {
      label: 'Café Duro Riado Rio',
      displayType: 'weight',
    },
    riado: {
      label: 'Café Riado',
      displayType: 'weight',
    },
    riado_rio: {
      label: 'Café Riado Rio',
      displayType: 'weight',
    },
    rio: {
      label: 'Café Rio',
      displayType: 'weight',
    },
    rio_velho: {
      label: 'Café Rio Velho',
      displayType: 'weight',
    },
    rio_zona: {
      label: 'Café Rio Zona',
      displayType: 'weight',
    },
    escolha: {
      label: 'Café Escolha',
      displayType: 'weight',
    },
  }

  return (
    <Modal isOpen={true} isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Saldos
          </Heading>
        </ModalHeader>
        <ModalBody pb={4}>
          <Stack>
            {data
              ? data.balances.map((balance) => {
                  const { type, value } = balance
                  const { label, displayType } = displayData[type]
                  let formattedValue: ReactNode = value
                  switch (displayType) {
                    case 'currency':
                      formattedValue = formatCurrency(value)
                      break
                    case 'weight':
                      formattedValue = getNumberOfBags(value)
                      break
                    case 'bag':
                      formattedValue = `${value} Sacas`
                      break
                  }

                  return (
                    <Fragment key={label}>
                      <Flex gap={2} justify='space-between' px={2}>
                        <Text fontWeight={700}>{label}</Text>
                        <Text color={getColorByValue(value)}>{formattedValue}</Text>
                      </Flex>
                      <Divider />
                    </Fragment>
                  )
                })
              : Array.from({ length: 5 }).map((_, index) => (
                  <Fragment key={index}>
                    <Flex justify='space-between'>
                      <Skeleton h={5} w={32} rounded={5} />
                      <Skeleton h={5} w={32} rounded={5} />
                    </Flex>
                    <Divider />
                  </Fragment>
                ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default ClientBalancesView
