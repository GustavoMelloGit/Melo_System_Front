import { Button, Card, CardBody, CardFooter, Flex, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm, type Path } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { formatInputDateString } from '../../../../../lib/utils/date'
import { type SheetFormValues } from '../../../types/model/sheet'
import SheetFormCoffeeDetails from './CoffeeDetails'
import SheetFormLines from './Lines'
import SheetFormSheetDetails from './SheetDetails'

type Props = {
  initialValues?: SheetFormValues
  onSubmit?: (values: SheetFormValues) => Promise<void>
  variant?: 'create' | 'edit' | 'view'
}
export default function SheetForm({
  initialValues,
  onSubmit,
  variant = 'create',
}: Props): JSX.Element {
  const { register, handleSubmit, formState, control, setValue, reset, watch } =
    useForm<SheetFormValues>({
      resolver: yupResolver(validationSchema),
    })

  function isDisabled(fieldName: Path<SheetFormValues>): boolean {
    let disabledFields: Array<Path<SheetFormValues>>
    if (variant === 'edit') {
      disabledFields = ['clientId']
      return disabledFields.includes(fieldName)
    }
    if (variant === 'view') {
      return true
    }
    return false
  }

  const submitFormHandler = handleSubmit(async ({ weighingDate, ...values }) => {
    try {
      await onSubmit?.({
        ...values,
        weighingDate: formatInputDateString(weighingDate),
      })
      reset()
    } catch {}
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues])

  return (
    <form onSubmit={submitFormHandler}>
      <Card>
        <CardBody>
          <Stack spacing={5}>
            <SheetFormSheetDetails isDisabled={isDisabled} control={control} />
            <SheetFormCoffeeDetails
              isDisabled={isDisabled}
              watch={watch}
              register={register}
              errors={formState.errors}
              control={control}
            />
            <SheetFormLines
              isDisabled={isDisabled}
              control={control}
              register={register}
              errors={formState.errors}
            />
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex w='full' gap={6}>
            <Button
              colorScheme='blue'
              flex={1}
              type='submit'
              onClick={() => {
                setValue('isDraft', true)
              }}
              isLoading={formState.isSubmitting}
              isDisabled={variant === 'view'}
            >
              Salvar rascunho
            </Button>
            <Button
              colorScheme='green'
              onClick={() => {
                setValue('isDraft', false)
              }}
              type='submit'
              flex={1}
              isLoading={formState.isSubmitting}
              isDisabled={variant === 'view'}
            >
              Salvar e Creditar
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </form>
  )
}

const validationSchema = yup.object().shape({
  number: yup
    .number()
    .typeError(validationErrors.sheetNumberIsInvalid)
    .required(validationErrors.sheetNumberIsRequired),
  weighingDate: yup.string().required(validationErrors.dateIsRequired),
  courier: yup.string().required(validationErrors.courierIsRequired),
  clientId: yup.string().required(validationErrors.clientIsRequired),
  lines: yup.array().of(
    yup.object().shape({
      weight: yup.number().required(),
      bags: yup.number().required(),
    }),
  ),
  coffeeDetails: yup.object().shape({
    coffeeType: yup.string().required(validationErrors.coffeeTypeIsRequired),
    moisture: yup
      .string()
      .min(0, validationErrors.minIsInvalid(0))
      .max(100, validationErrors.maxIsInvalid(100)),
    foulness: yup
      .string()
      .min(0, validationErrors.minIsInvalid(0))
      .max(100, validationErrors.maxIsInvalid(100)),
    sieve: yup
      .string()
      .min(0, validationErrors.minIsInvalid(0))
      .max(100, validationErrors.maxIsInvalid(100)),
    picking: yup
      .string()
      .min(0, validationErrors.minIsInvalid(0))
      .max(100, validationErrors.maxIsInvalid(100)),
    drilled: yup
      .string()
      .min(0, validationErrors.minIsInvalid(0))
      .max(100, validationErrors.maxIsInvalid(100)),
    description: yup.string(),
  }),
})
