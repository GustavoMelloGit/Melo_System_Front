import {
  Button,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  type TextareaProps,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GiChipsBag } from 'react-icons/gi'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFSelectField from '../../../../../../../../shared/components/inputs/RHFSelectField'
import { CoffeeBebidasLabel } from '../../../../../../../coffee/types/model/coffee'
import { CoffeeTypesForm, type CoffeeFormValues } from '../../types/index'

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
  onSubmit: (values: CoffeeFormValues) => void
  initialValues: CoffeeFormValues
}
export default function CoffeeFormView({ onSubmit, initialValues }: Props): JSX.Element {
  const [isDebit, setIsDebit] = useState<boolean>(true)
  const inputColor = getColorByValue(isDebit ? -1 : 1)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    register,
  } = useForm<CoffeeFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit({
          ...values,
          bags: values.bags * (isDebit ? -1 : 1),
          weight: values.weight * (isDebit ? -1 : 1),
        })
      })}
    >
      <Stack spacing={6}>
        <RadioGroup
          value={isDebit ? 'true' : 'false'}
          onChange={(value) => {
            setIsDebit(value === 'true')
          }}
          display='flex'
          gap={4}
          mb={1}
        >
          <Radio value='true'>Débito</Radio>
          <Radio value='false'>Crédito</Radio>
        </RadioGroup>
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={4}>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='date'
              label='Data'
              type='date'
              control={control}
              required
            />
          </GridItem>
          <GridItem>
            <RHFSelectField<CoffeeFormValues>
              name='details.coffeeType'
              register={register}
              label='Tipo de café'
              options={Object.entries(CoffeeTypesForm).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </GridItem>
          <GridItem>
            <RHFSelectField<CoffeeFormValues>
              register={register}
              name='details.bebida'
              label='Bebida'
              options={Object.entries(CoffeeBebidasLabel).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </GridItem>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='bags'
              label='Sacos'
              type='number'
              inputMode='numeric'
              control={control}
              min={0}
              placeholder='Ex.: 10'
              required
              rightIcon={<GiChipsBag />}
              color={inputColor}
            />
          </GridItem>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='weight'
              label='Quilos'
              type='number'
              inputMode='numeric'
              control={control}
              min={0}
              placeholder='Ex.: 10'
              required
              rightIcon='Kg'
              color={inputColor}
            />
          </GridItem>

          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='details.picking'
              control={control}
              label='Cata'
              placeholder='Ex.: 25'
              type='number'
              inputMode='decimal'
              step={0.1}
              min={0}
              rightIcon='%'
            />
          </GridItem>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='details.sieve'
              control={control}
              label='17 / 18'
              placeholder='Ex.: 10'
              type='number'
              inputMode='decimal'
              step={0.1}
              rightIcon='%'
            />
          </GridItem>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='details.moisture'
              control={control}
              label='Umidade'
              placeholder='Ex.: 12'
              type='number'
              inputMode='decimal'
              step={0.1}
              rightIcon='%'
            />
          </GridItem>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='details.drilled'
              control={control}
              label='Broca'
              placeholder='Ex.: 5'
              type='number'
              inputMode='decimal'
              step={0.1}
              rightIcon='%'
            />
          </GridItem>

          <GridItem>
            <ControllerField<CoffeeFormValues>
              name='details.foulness'
              control={control}
              label='Impureza'
              placeholder='Ex.: 5'
              type='number'
              inputMode='decimal'
              step={0.1}
              rightIcon='%'
            />
          </GridItem>
        </Grid>
        <ControllerField<CoffeeFormValues, TextareaProps>
          name='description'
          label='Descrição'
          control={control}
          CustomInput={<Textarea />}
        />

        <Button
          w='full'
          type='submit'
          colorScheme={isDebit ? 'red' : 'green'}
          isLoading={isSubmitting}
        >
          {isDebit ? 'Debitar' : 'Creditar'}
        </Button>
      </Stack>
    </form>
  )
}
