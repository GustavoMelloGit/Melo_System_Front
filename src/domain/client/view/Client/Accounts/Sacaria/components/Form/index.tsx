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
import { useForm } from 'react-hook-form'
import RHFDateInput from '../../../../../../../../shared/components/inputs/RHFDateInput'
import RHFField from '../../../../../../../../shared/components/inputs/RHFField'
import { useModal } from '../../../../../../../../shared/hooks/useModal'

type SacariaFormValues = {
  value: number
  date: string
}
type Props = {
  onSubmit: (values: any) => void
}
const SacariaFormView = ({ onSubmit }: Props): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm<SacariaFormValues>()
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
                  <RHFField
                    name='value'
                    label='Número de sacas'
                    type='number'
                    register={register}
                    placeholder='Ex.: 10'
                  />
                </GridItem>
                <GridItem>
                  <RHFDateInput control={control} name='date' label='Data' />
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
