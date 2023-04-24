import { Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { type Path, type UseFormRegister, type UseFormWatch } from 'react-hook-form'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFSelectField from '../../../../../shared/components/inputs/RHFSelectField'
import RHFTextField from '../../../../../shared/components/inputs/RHFTextField'
import {
  CoffeeDetailsTypesEnum,
  CoffeeTypesEnum,
  type CoffeeTypes,
} from '../../../types/model/coffee'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  register: UseFormRegister<SheetFormValues>
  errors: unknown
  watch: UseFormWatch<SheetFormValues>
  isDisabled: (fieldName: Path<SheetFormValues>) => boolean
}
export default function SheetFormCoffeeDetails({
  register,
  errors,
  watch,
  isDisabled,
}: Props): JSX.Element {
  const hasCoffeeDetailsType: CoffeeTypes[] = ['bica_corrida', 'conilon']
  const hasUtilizationType: CoffeeTypes[] = ['escolha']
  return (
    <Stack spacing={4}>
      <Heading as='h2' size='lg'>
        Resultado de prova
      </Heading>
      <Divider />
      <Grid templateColumns='repeat(auto-fit, minmax(160px, 1fr))' gap={4} mb={4}>
        <GridItem>
          <RHFSelectField<SheetFormValues>
            name='coffeeType'
            register={register}
            label='Tipo de café'
            options={Object.keys(CoffeeTypesEnum).map((value) => ({
              value,
              label: capitalCase(value),
            }))}
            isDisabled={isDisabled('coffeeType')}
          />
        </GridItem>
        {hasCoffeeDetailsType.includes(watch('coffeeType')) && (
          <GridItem>
            <RHFSelectField<SheetFormValues>
              register={register}
              name='coffeeDetails.type'
              label='Bebida'
              options={Object.entries(CoffeeDetailsTypesEnum).map(([value, label]) => ({
                value,
                label,
              }))}
              isDisabled={isDisabled('coffeeDetails.type')}
            />
          </GridItem>
        )}
        {hasUtilizationType.includes(watch('coffeeType')) && (
          <GridItem>
            <RHFField<SheetFormValues>
              name='coffeeDetails.utilization'
              register={register}
              label='Aproveitamento'
              placeholder='Ex.: 12'
              type='number'
              inputMode='decimal'
              step={0.1}
              errors={errors}
              rules={{
                valueAsNumber: true,
              }}
              rightIcon='%'
              isDisabled={isDisabled('coffeeDetails.utilization')}
            />
          </GridItem>
        )}
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.picking'
            register={register}
            label='Cata'
            placeholder='Ex.: 25'
            type='number'
            inputMode='decimal'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
            isDisabled={isDisabled('coffeeDetails.picking')}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.sieve'
            register={register}
            label='17 / 18'
            placeholder='Ex.: 10'
            type='number'
            inputMode='decimal'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
            isDisabled={isDisabled('coffeeDetails.sieve')}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.moisture'
            register={register}
            label='Umidade'
            placeholder='Ex.: 12'
            type='number'
            inputMode='decimal'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
            isDisabled={isDisabled('coffeeDetails.moisture')}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.drilled'
            register={register}
            label='Broca'
            placeholder='Ex.: 5'
            type='number'
            inputMode='decimal'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
            isDisabled={isDisabled('coffeeDetails.drilled')}
          />
        </GridItem>

        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.foulness'
            register={register}
            label='Impureza'
            placeholder='Ex.: 5'
            type='number'
            inputMode='decimal'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
            isDisabled={isDisabled('coffeeDetails.foulness')}
          />
        </GridItem>
      </Grid>

      <RHFTextField<SheetFormValues>
        name='coffeeDetails.description'
        register={register}
        label='Descrição'
        placeholder='Ex.: Café de excelente qualidade'
        errors={errors}
        isDisabled={isDisabled('coffeeDetails.description')}
      />
    </Stack>
  )
}
