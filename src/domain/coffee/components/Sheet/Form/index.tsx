import { Button, Card, CardBody, CardFooter, Flex, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { Routes } from '../../../../../lib/routes'
import { undraftSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'
import SheetFormCoffeeDetails from './CoffeeDetails'
import SheetFormLines from './Lines'
import SheetFormSheetDetails from './SheetDetails'

type Props = {
  initialValues?: SheetFormValues
  onSubmit: (values: SheetFormValues) => Promise<void>
  variant?: 'create' | 'edit'
}
export default function SheetForm({
  initialValues,
  onSubmit,
  variant = 'create',
}: Props): JSX.Element {
  const navigate = useNavigate()
  const { bookNumber } = useParams<{ bookNumber: string }>()
  const { register, handleSubmit, formState, control, setValue, reset, watch } =
    useForm<SheetFormValues>({
      resolver: yupResolver(validationSchema),
    })

  const handleUndraftSheet = async (): Promise<void> => {
    if (!initialValues || !bookNumber) return
    const { error } = await undraftSheetService(initialValues.number)

    if (error) {
      toast.error(error)
      return
    }
    toast.success('Folha creditada com sucesso')
    navigate(Routes.createSheet(bookNumber))
  }

  const submitFormHandler = handleSubmit(async ({ weighingDate, ...values }) => {
    if (!formState.isDirty && variant === 'edit') {
      await handleUndraftSheet()
      return
    }
    try {
      await onSubmit({
        ...values,
        weighingDate: +weighingDate,
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
            <SheetFormSheetDetails
              variant={variant}
              control={control}
              register={register}
              errors={formState.errors}
            />
            <SheetFormCoffeeDetails watch={watch} register={register} errors={formState.errors} />
            <SheetFormLines control={control} register={register} errors={formState.errors} />
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
  coffeeType: yup.string().required(validationErrors.coffeeTypeIsRequired),
  lines: yup.array().of(
    yup.object().shape({
      weight: yup.number().required(),
      bags: yup.number().required(),
    }),
  ),
  coffeeDetails: yup.object().shape({
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
