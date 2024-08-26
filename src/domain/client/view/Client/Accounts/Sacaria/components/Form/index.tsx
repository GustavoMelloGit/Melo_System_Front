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
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import { getColorByValue } from '../../../../../../../../lib/utils/getColorByValue'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import { type SacariaFormValues } from '../../types/sacaria'

const validationSchema = yup.object().shape({
  value: yup
    .number()
    .required(validationErrors.valueIsRequired)
    .typeError(validationErrors.valueIsRequired),
  date: yup.string().required(validationErrors.dateIsRequired),
})

type Props = {
  onSubmit: (values: SacariaFormValues) => void
  initialValues: Partial<SacariaFormValues>
}
const SacariaFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const [isDebit, setIsDebit] = useState<boolean>(true)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SacariaFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit({
          ...values,
          value: isDebit ? -values.value : values.value,
        })
      })}
    >
      <Stack spacing={6}>
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={2}>
          <GridItem colSpan={2}>
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
          </GridItem>
          <GridItem>
            <ControllerField<SacariaFormValues>
              name='date'
              label='Data'
              type='date'
              control={control}
              required
            />
          </GridItem>
          <GridItem>
            <ControllerField<SacariaFormValues>
              name='value'
              label='Número de sacas'
              type='number'
              inputMode='numeric'
              control={control}
              placeholder='Ex.: 10'
              required
              color={getColorByValue(isDebit ? -1 : 1)}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <ControllerField<SacariaFormValues, TextareaProps>
              name='description'
              label='Descrição'
              control={control}
              CustomInput={<Textarea />}
            />
          </GridItem>
        </Grid>

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
export default SacariaFormView
