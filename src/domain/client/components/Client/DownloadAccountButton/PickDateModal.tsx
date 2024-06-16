import { Button, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { formatEndDate, formatStartDate } from '../../../../../lib/utils/date'
import Modal from '../../../../../shared/components/Modal'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import { useModal } from '../../../../../shared/hooks/useModal'

const PickDateModalSchema = yup.object().shape({
  startDate: yup.string().required(validationErrors.fieldIsRequired),
  endDate: yup
    .string()
    .required(validationErrors.fieldIsRequired)
    .when('startDate', (_, schema) => {
      return schema.test('is-greater', validationErrors.endDateShouldBeAfterStartDate, function () {
        const { startDate, endDate } = this.parent
        if (!startDate || !endDate)
          return this.createError({
            message: validationErrors.endDateShouldBeAfterStartDate,
          })
        return new Date(String(startDate)) < new Date(String(endDate))
      })
    }),
})

export type PickDateValues = {
  startDate: string
  endDate: string
}

const defaultInitialValues: PickDateValues = {
  endDate: '',
  startDate: '',
}

type Props = {
  onSubmit: (values: PickDateValues) => Promise<void>
  initialValues?: Partial<PickDateValues>
}
export default function PickDateModal({ onSubmit, initialValues }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(PickDateModalSchema),
    defaultValues: {
      ...defaultInitialValues,
      ...initialValues,
    },
  })

  return (
    <Modal isOpen onClose={closeModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading fontSize='3xl'>Escolha o período</Heading>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(async (values) => {
              await onSubmit({
                startDate: formatStartDate(values.startDate),
                endDate: formatEndDate(values.endDate),
              })
            })}
          >
            <Stack spacing={6}>
              <Grid templateColumns='repeat(auto-fit, minmax(170px, 1fr))' gap={4}>
                <GridItem>
                  <ControllerField
                    control={control}
                    name='startDate'
                    type='date'
                    label='Data de início'
                    required
                  />
                </GridItem>
                <GridItem>
                  <ControllerField
                    control={control}
                    name='endDate'
                    type='date'
                    label='Data final'
                    required
                  />
                </GridItem>
              </Grid>
              <Button type='submit' isLoading={isSubmitting} colorScheme='blue'>
                Escolher
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
