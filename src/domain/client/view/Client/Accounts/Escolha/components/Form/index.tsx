import { Button, Grid, GridItem, Stack, Textarea, type TextareaProps } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { GiChipsBag } from 'react-icons/gi'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import { type EscolhaFormValues } from '../../types/esolha'

const validationSchema = yup.object().shape({
  bags: yup
    .number()
    .defined(validationErrors.bagsIsRequired)
    .typeError(validationErrors.bagsIsInvalid)
    .min(0, validationErrors.bagsIsInvalid),
  weight: yup
    .number()
    .defined(validationErrors.weightIsRequired)
    .typeError(validationErrors.weightIsInvalid)
    .min(0, validationErrors.weightIsInvalid),
  details: yup.object().shape({
    utilization: yup
      .number()
      .typeError(validationErrors.utilizationIsInvalid)
      .min(0, validationErrors.utilizationIsInvalid),
    foulness: yup
      .number()
      .typeError(validationErrors.foulnessIsInvalid)
      .min(0, validationErrors.foulnessIsInvalid),
  }),
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
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={4}>
          <GridItem colSpan={2}>
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
              name='bags'
              label='Sacos'
              type='number'
              inputMode='numeric'
              control={control}
              min={0}
              placeholder='Ex.: 10'
              required
              rightIcon={<GiChipsBag />}
            />
          </GridItem>
          <GridItem>
            <ControllerField<EscolhaFormValues>
              name='weight'
              label='Quilos'
              type='number'
              inputMode='numeric'
              control={control}
              min={0}
              placeholder='Ex.: 10'
              required
              rightIcon='Kg'
            />
          </GridItem>
          <GridItem>
            <ControllerField<EscolhaFormValues>
              name='details.utilization'
              label='Aproveitamento'
              type='number'
              inputMode='decimal'
              step={0.1}
              min={0}
              control={control}
              placeholder='Ex.: 10'
              rightIcon='%'
            />
          </GridItem>
          <GridItem>
            <ControllerField<EscolhaFormValues>
              name='details.foulness'
              label='Impureza'
              type='number'
              inputMode='decimal'
              control={control}
              step={0.1}
              min={0}
              placeholder='Ex.: 10'
              rightIcon='%'
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
