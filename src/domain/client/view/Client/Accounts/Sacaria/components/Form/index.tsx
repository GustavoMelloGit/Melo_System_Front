import {
  Button,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { type SacariaFormValues } from '../../types/sacaria'

const validationSchema = yup.object().shape({
  value: yup
    .number()
    .required(validationErrors.valueIsRequired)
    .typeError(validationErrors.valueIsRequired)
    .min(1, validationErrors.valueIsInvalid),
  date: yup.string().required(validationErrors.dateIsRequired),
})

type Props = {
  onSubmit: (values: SacariaFormValues) => void
  initialValues: Partial<SacariaFormValues>
}
const SacariaFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SacariaFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })
  return (
    <Modal isCentered onClose={closeModal} isOpen>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1'>Creditar sacaria</Heading>
        </ModalHeader>
        <ModalBody pb={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={2}>
                <GridItem>
                  <ControllerField<SacariaFormValues>
                    name='value'
                    label='Número de sacas'
                    type='number'
                    inputMode='numeric'
                    control={control}
                    placeholder='Ex.: 10'
                  />
                </GridItem>
                <GridItem>
                  <ControllerField<SacariaFormValues>
                    name='date'
                    label='Data'
                    type='date'
                    control={control}
                  />
                </GridItem>
              </Grid>

              <Button w='full' type='submit' colorScheme='green' isLoading={isSubmitting}>
                Creditar
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default SacariaFormView
