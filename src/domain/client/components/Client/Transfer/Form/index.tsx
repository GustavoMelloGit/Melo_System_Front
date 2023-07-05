import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Center,
  Flex,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import ControllerField from '../../../../../../shared/components/inputs/ControllerField'
import TransferReferral from './TransferReferral'
import { type ClientTransferFormValues } from './types'

const emptyInitialValues: ClientTransferFormValues = {
  from: {
    clientId: '',
    clientName: '',
    value: 0,
    transferType: 'currency',
  },
  to: {
    clientId: '',
    clientName: '',
    value: 0,
    transferType: 'currency',
  },
  description: '',
}

type Props = {
  onSubmit: (values: ClientTransferFormValues) => Promise<void>
  initialValues?: ClientTransferFormValues
}
export default function ClientTransferForm({
  initialValues = emptyInitialValues,
  onSubmit,
}: Props): JSX.Element {
  const methods = useForm<ClientTransferFormValues>({
    defaultValues: initialValues,
  })
  const { handleSubmit, control, reset } = methods
  const actionButtonBg = useColorModeValue('white', '#1A202C')

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values)
          reset(emptyInitialValues)
        })}
      >
        <Stack spacing={8}>
          <Flex justify='space-between' align='flex-start' flexWrap='wrap' w='full' gap={8}>
            <TransferReferral control={control} referral='from' />
            <TransferReferral control={control} referral='to' />
          </Flex>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton display='flex' gap={4}>
                Adicionar observação <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <ControllerField
                  control={control}
                  name='description'
                  placeholder='Escreva aqui a sua observação'
                  CustomInput={<Textarea />}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Center
            position={{
              base: 'fixed',
              sm: 'unset',
            }}
            left={0}
            bottom={0}
            pb={4}
            pt={2}
            w='full'
            bg={{
              base: `linear-gradient(0deg, ${actionButtonBg} 0%, ${actionButtonBg} 35%, rgba(255,255,255,0) 100%)`,
              sm: 'unset',
            }}
          >
            <Button
              type='submit'
              colorScheme='green'
              w='full'
              maxW={{
                base: '90%',
                sm: 300,
              }}
            >
              Transferir
            </Button>
          </Center>
        </Stack>
      </form>
    </FormProvider>
  )
}
