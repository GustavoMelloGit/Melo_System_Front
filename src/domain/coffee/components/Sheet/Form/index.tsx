import { Button, Card, CardBody, CardFooter, Flex, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm, type Path } from 'react-hook-form'
import * as yup from 'yup'
import { CoffeeTypeHasBebida } from '../../../../../lib/constants/coffee'
import { validationErrors } from '../../../../../lib/errors'
import { dateInputToApiDate } from '../../../../../lib/utils/date'
import { type CoffeeTypes } from '../../../types/model/coffee'
import { type SheetFormValues } from '../../../types/model/sheet'
import SheetFormCoffeeDetails from './CoffeeDetails'
import SheetFormLines from './Lines'
import SheetFormSheetDetails from './SheetDetails'

const emptyInitialValues: SheetFormValues = {
  courier: '',
  clientId: '',
  clientName: '',
  number: 0,
  isDraft: false,
  lines: [{ bags: 0, weight: 0 }],
  weighingDate: new Date().toISOString().split('T')[0],
  coffeeDetails: {
    coffeeType: 'bica_corrida',
    bebida: 'duro',
    description: '',
    drilled: 0,
    foulness: 0,
    moisture: 0,
    picking: 0,
    sieve: 0,
    utilization: 0,
  },
}

type Props =
  | {
      variant: 'create' | 'edit'
      initialValues?: SheetFormValues
      onSubmit: (values: SheetFormValues) => Promise<void>
    }
  | {
      variant: 'view'
      initialValues: SheetFormValues
      onSubmit?: never
    }

export default function SheetForm({ initialValues, onSubmit, variant }: Props): JSX.Element {
  const { register, handleSubmit, formState, control, setValue, reset } = useForm<SheetFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues ?? emptyInitialValues,
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

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  return (
    <form
      onSubmit={handleSubmit(async ({ weighingDate, ...values }) => {
        await onSubmit?.({
          ...values,
          weighingDate: dateInputToApiDate(weighingDate),
        })

        reset({ ...emptyInitialValues, number: values.number + 1 })
      })}
    >
      <Card>
        <CardBody>
          <Stack spacing={5}>
            <SheetFormSheetDetails isDisabled={isDisabled} control={control} />
            <SheetFormCoffeeDetails
              isDisabled={isDisabled}
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
    bebida: yup.string().when('coffeeType', ([coffeeType], schema) => {
      const hasBebida = CoffeeTypeHasBebida.includes(coffeeType as CoffeeTypes)
      return hasBebida ? schema.required(validationErrors.bebidaIsRequired) : schema.notRequired()
    }),
    moisture: yup
      .number()
      .min(0, validationErrors.minValueIsInvalid(0))
      .max(100, validationErrors.maxValueIsInvalid(100)),
    foulness: yup
      .number()
      .min(0, validationErrors.minValueIsInvalid(0))
      .max(100, validationErrors.maxValueIsInvalid(100)),
    sieve: yup
      .number()
      .min(0, validationErrors.minValueIsInvalid(0))
      .max(100, validationErrors.maxValueIsInvalid(100)),
    picking: yup
      .number()
      .min(0, validationErrors.minValueIsInvalid(0))
      .max(100, validationErrors.maxValueIsInvalid(100)),
    drilled: yup
      .number()
      .min(0, validationErrors.minValueIsInvalid(0))
      .max(100, validationErrors.maxValueIsInvalid(100)),
    description: yup.string(),
  }),
})
