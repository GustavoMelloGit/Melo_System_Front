import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Skeleton,
} from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { Fragment } from 'react'
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
  const displayData: Record<keyof ClientBalance, string> = {
    currency: 'Conta Corrente',
    bags: 'Sacaria',
    coffee: 'Café',
    escolha: 'Café Escolha',
    details: 'Detalhes',
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
        <ModalBody pb={8}>
          <Stack>
            {data ? (
              <Fragment>
                <Flex gap={2} justify='space-between' px={2}>
                  <Text fontWeight={700}>{displayData.currency}</Text>
                  <Text color={getColorByValue(data.balances?.currency ?? 0)}>
                    {formatCurrency(data.balances.currency)}
                  </Text>
                </Flex>
                <Divider />
                <Accordion allowToggle>
                  <AccordionItem border='none'>
                    <AccordionButton px={2} py={0}>
                      <Flex gap={2} justify='space-between' w='full' mr={2}>
                        <Text as='span' fontWeight={700}>
                          {displayData.coffee}
                        </Text>
                        <Text color={getColorByValue(data.balances?.coffee ?? 0)}>
                          {getNumberOfBags(data.balances?.coffee ?? 0)}
                        </Text>
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pr={7}>
                      {Object.entries(data.balances.details)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => (
                          <Flex gap={2} justify='space-between' px={2} key={key}>
                            <Text fontWeight={700}>{capitalCase(key)}</Text>
                            <Text color={getColorByValue(value)}>{getNumberOfBags(value)}</Text>
                          </Flex>
                        ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Divider />
                <Flex gap={2} justify='space-between' px={2}>
                  <Text fontWeight={700}>{displayData.escolha}</Text>
                  <Text color={getColorByValue(data.balances?.escolha ?? 0)}>
                    {getNumberOfBags(data.balances.escolha ?? 0)}
                  </Text>
                </Flex>
                <Divider />
                <Flex gap={2} justify='space-between' px={2}>
                  <Text fontWeight={700}>{displayData.bags}</Text>
                  <Text color={getColorByValue(data.balances?.bags ?? 0)}>
                    {data.balances?.bags ?? 0} Sacas
                  </Text>
                </Flex>
              </Fragment>
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <Fragment key={index}>
                  <Flex justify='space-between'>
                    <Skeleton h={5} w={32} rounded={5} />
                    <Skeleton h={5} w={32} rounded={5} />
                  </Flex>
                  <Divider />
                </Fragment>
              ))
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default ClientBalancesView
