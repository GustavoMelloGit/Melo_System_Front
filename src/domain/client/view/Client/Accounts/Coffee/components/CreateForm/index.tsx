import {
  Button,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Select,
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
import objectEntries from '../../../../../../../../lib/utils/objectEntries'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import { type DeepPartial } from '../../../../../../../../shared/types/utils/DeepPartial'
import {
  CoffeeBebidasLabel,
  CoffeeTypesLabel,
} from '../../../../../../../coffee/types/model/coffee'
import { type CoffeeFormValues } from '../../types/index'

const { escolha, ...coffeeTypesOptions } = CoffeeTypesLabel

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
  date: yup.string().required(validationErrors.dateIsRequired),
})

type Props = {
  onSubmit: (values: CoffeeFormValues) => void
  initialValues: DeepPartial<CoffeeFormValues>
}
export default function CoffeeFormView({ onSubmit, initialValues }: Props): JSX.Element {
  const [isDebit, setIsDebit] = useState<boolean>(true)
  const inputColor = getColorByValue(isDebit ? -1 : 1)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
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
            <ControllerField<CoffeeFormValues>
              name='details.coffeeType'
              control={control}
              label='Tipo de café'
              required
              CustomInput={
                <Select>
                  {objectEntries(coffeeTypesOptions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              }
            />
          </GridItem>
          <GridItem>
            <ControllerField<CoffeeFormValues>
              control={control}
              name='details.bebida'
              label='Bebida'
              required
              CustomInput={
                <Select>
                  <option disabled selected></option>
                  {objectEntries(CoffeeBebidasLabel).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              }
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
        </Grid>
        <ControllerField<CoffeeFormValues, TextareaProps>
          name='details.description'
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
