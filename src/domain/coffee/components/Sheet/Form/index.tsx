import { Button, Card, CardBody, CardFooter, Flex, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { type SheetFormValues } from '../../../types/model/sheet'
import SheetFormCoffeeDetails from './CoffeeDetails'
import SheetFormLines from './Lines'
import SheetFormSheetDetails from './SheetDetails'

type Props = {
  initialValues?: SheetFormValues
  onSubmit: (values: SheetFormValues) => Promise<void>
}
export default function SheetForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { register, handleSubmit, formState, control, setValue } = useForm<SheetFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody>
          <Stack spacing={12}>
            <SheetFormSheetDetails
              control={control}
              register={register}
              errors={formState.errors}
            />
            <SheetFormCoffeeDetails register={register} errors={formState.errors} />
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
              Criar e creditar
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
  // coffeeDetails: yup.object().shape({
  //   moisture: yup.number(),
  //   sieve: yup.number(),
  //   picking: yup.number(),
  //   foulness: yup.number(),
  //   drilled: yup.number(),
  //   description: yup.string(),
  //   weight: yup.number(),
  // }),
  lines: yup.array().of(
    yup.object().shape({
      weight: yup.number().required(),
      bags: yup.number().required(),
    }),
  ),
})
