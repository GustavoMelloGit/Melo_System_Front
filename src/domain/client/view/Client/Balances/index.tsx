import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Fragment, type ReactNode } from 'react'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { randomBetween } from '../../../../../lib/utils/math'
import { getColorByValue } from '../../../../../lib/utils/styles'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type ClientBalanceModel } from '../../../types/model/Client'

const ClientBalancesView = (): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  const data: ClientBalanceModel = {
    bags: randomBetween(-100, 200),
    checkingAccount: randomBetween(-12000, 200),
    duro: randomBetween(-100, 200),
    duro_riado: randomBetween(-100, 200),
    duro_riado_rio: randomBetween(-100, 200),
    riado: randomBetween(-100, 200),
    riado_rio: randomBetween(-100, 200),
    rio: randomBetween(-100, 200),
    rio_velho: randomBetween(-100, 200),
    rio_zona: randomBetween(-100, 200),
  }

  const displayData: {
    [key in keyof ClientBalanceModel]?: {
      label: string
      displayType: 'currency' | 'weight' | 'bag'
    }
  } = {
    checkingAccount: {
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
  }

  return (
    <Modal isOpen={true} isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading
            as='h1'
            fontSize={{
              base: 'xl',
              md: '4xl',
            }}
          >
            Saldos
          </Heading>
        </ModalHeader>
        <ModalBody pb={4}>
          <Stack>
            {Object.entries(displayData).map(([key, { label, displayType }]) => {
              const value = data[key as keyof ClientBalanceModel]
              let formattedValue: ReactNode = value
              switch (displayType) {
                case 'currency':
                  formattedValue = formatCurrency(value)
                  break
                case 'weight':
                  formattedValue = `${value} Kgs`
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
            })}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default ClientBalancesView
