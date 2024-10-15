import { Button, Checkbox, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { formatEndDate, formatStartDate } from '../../../../../lib/utils/date'
import Modal from '../../../../../shared/components/Modal'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import { useModal } from '../../../../../shared/hooks/useModal'

const PickDateModalSchema = yup.object().shape({
  hasDateRange: yup.boolean(),
  startDate: yup.string().when('hasDateRange', {
    is: true,
    then: (schema) => schema.required(validationErrors.fieldIsRequired),
    otherwise: (schema) => schema.notRequired(),
  }),
  endDate: yup
    .string()
    .when('hasDateRange', {
      is: true,
      then: (schema) => schema.required(validationErrors.fieldIsRequired),
      otherwise: (schema) => schema.notRequired(),
    })
    .when('startDate', (_, schema) => {
      return schema.test('is-greater', validationErrors.endDateShouldBeAfterStartDate, function () {
        const { startDate, endDate, hasDateRange } = this.parent
        if (!hasDateRange) return true
        if (!startDate || !endDate)
          return this.createError({
            message: validationErrors.endDateShouldBeAfterStartDate,
          })
        return new Date(String(startDate)) <= new Date(String(endDate))
      })
    }),
})
export type PickDateFormValues = {
  startDate: string
  endDate: string
  hasDateRange: boolean
}

const defaultInitialValues: PickDateFormValues = {
  endDate: '',
  startDate: '',
  hasDateRange: false,
}

type Props = {
  onSubmit: (values: PickDateFormValues) => Promise<void>
  initialValues?: Partial<PickDateFormValues>
}
export default function PickDateModal({ onSubmit, initialValues }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(PickDateModalSchema),
    defaultValues: {
      ...defaultInitialValues,
      ...initialValues,
    },
  })

  const hasDateRange = watch('hasDateRange')

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
                hasDateRange: values.hasDateRange,
              })
            })}
          >
            <Stack spacing={6}>
              <Controller
                control={control}
                name='hasDateRange'
                render={({ field: { onChange, value, ...field } }) => {
                  return (
                    <Checkbox
                      onChange={(e) => {
                        onChange(!e.target.checked)
                      }}
                      isChecked={!value}
                      {...field}
                    >
                      Imprimir toda a movimentação
                    </Checkbox>
                  )
                }}
              />
              <Grid templateColumns='repeat(auto-fit, minmax(170px, 1fr))' gap={4}>
                <GridItem>
                  <ControllerField
                    control={control}
                    name='startDate'
                    type='date'
                    label='Data de início'
                    required
                    isDisabled={!hasDateRange}
                  />
                </GridItem>
                <GridItem>
                  <ControllerField
                    control={control}
                    name='endDate'
                    type='date'
                    label='Data final'
                    required
                    isDisabled={!hasDateRange}
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
