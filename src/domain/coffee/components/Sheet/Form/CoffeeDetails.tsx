import { Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { type UseFormRegister, type UseFormWatch } from 'react-hook-form'
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
}
export default function SheetFormCoffeeDetails({ register, errors, watch }: Props): JSX.Element {
  const hasCoffeeDetailsType: CoffeeTypes[] = ['bica_corrida', 'conilon']
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
          />
        </GridItem>
        {hasCoffeeDetailsType.includes(watch('coffeeType') as CoffeeTypes) && (
          <GridItem>
            <RHFSelectField<SheetFormValues>
              register={register}
              name='coffeeDetails.type'
              label='Bebida'
              options={Object.entries(CoffeeDetailsTypesEnum).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </GridItem>
        )}
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.moisture'
            register={register}
            label='Umidade'
            placeholder='Ex.: 12'
            type='number'
            inputMode='numeric'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.sieve'
            register={register}
            label='Peneira 17 / 18'
            placeholder='Ex.: 10'
            type='number'
            inputMode='numeric'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.picking'
            register={register}
            label='Cata'
            placeholder='Ex.: 25'
            type='number'
            inputMode='numeric'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.foulness'
            register={register}
            label='Impureza'
            placeholder='Ex.: 5'
            type='number'
            inputMode='numeric'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='coffeeDetails.drilled'
            register={register}
            label='Broca'
            placeholder='Ex.: 5'
            type='number'
            inputMode='numeric'
            step={0.1}
            errors={errors}
            rules={{
              valueAsNumber: true,
            }}
            rightIcon='%'
          />
        </GridItem>
      </Grid>

      <RHFTextField<SheetFormValues>
        name='coffeeDetails.description'
        register={register}
        label='Descrição'
        placeholder='Ex.: Café de excelente qualidade'
        errors={errors}
      />
    </Stack>
  )
}
