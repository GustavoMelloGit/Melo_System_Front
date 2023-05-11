import { Button, Grid, GridItem, Stack, Textarea, type TextareaProps } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import { type EscolhaFormValues } from '../../types/esolha'

const validationSchema = yup.object().shape({
  value: yup
    .number()
    .required(validationErrors.valueIsRequired)
    .typeError(validationErrors.valueIsRequired),
  date: yup.string().required(validationErrors.dateIsRequired),
})

type Props = {
  onSubmit: (values: EscolhaFormValues) => void
  initialValues: Partial<EscolhaFormValues>
}
const EscolhaFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EscolhaFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={2}>
          <GridItem>
            <ControllerField<EscolhaFormValues>
              name='date'
              label='Data'
              type='date'
              control={control}
              required
            />
          </GridItem>
          <GridItem>
            <ControllerField<EscolhaFormValues>
              name='value'
              label='Número de sacas'
              type='number'
              inputMode='numeric'
              control={control}
              placeholder='Ex.: 10'
              required
            />
          </GridItem>
          <GridItem colSpan={2}>
            <ControllerField<EscolhaFormValues, TextareaProps>
              name='description'
              label='Descrição'
              control={control}
              CustomInput={<Textarea />}
            />
          </GridItem>
        </Grid>

        <Button w='full' type='submit' colorScheme='green' isLoading={isSubmitting}>
          Creditar
        </Button>
      </Stack>
    </form>
  )
}
export default EscolhaFormView
