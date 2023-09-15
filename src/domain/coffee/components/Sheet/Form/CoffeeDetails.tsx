import { Divider, Grid, GridItem, Heading, Select, Stack } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { useWatch, type Control, type Path, type UseFormRegister } from 'react-hook-form'
import { CoffeeTypeHasBebida, hasUtilizationType } from '../../../../../lib/constants/coffee'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFTextField from '../../../../../shared/components/inputs/RHFTextField'
import { CoffeeBebidasLabel, CoffeeTypesLabel } from '../../../types/model/coffee'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  register: UseFormRegister<SheetFormValues>
  control: Control<SheetFormValues>
  errors: unknown
  isDisabled: (fieldName: Path<SheetFormValues>) => boolean
}
export default function SheetFormCoffeeDetails({
  register,
  errors,
  isDisabled,
  control,
}: Props): JSX.Element {
  const currentCoffeeType = useWatch({
    control,
    name: 'coffeeDetails.coffeeType',
  })

  return (
    <Stack spacing={4}>
      <Heading as='h2' size='lg'>
        Resultado de prova
      </Heading>
      <Divider />
      <Grid templateColumns='repeat(auto-fit, minmax(160px, 1fr))' gap={4} mb={4}>
        <GridItem>
          <ControllerField<SheetFormValues>
            control={control}
            name='coffeeDetails.coffeeType'
            label='Tipo de café'
            required
            isDisabled={isDisabled('coffeeDetails.coffeeType')}
            CustomInput={
              <Select>
                {Object.keys(CoffeeTypesLabel).map((value) => (
                  <option key={value} value={value}>
                    {capitalCase(value)}
                  </option>
                ))}
              </Select>
            }
          />
        </GridItem>
        {currentCoffeeType && CoffeeTypeHasBebida.includes(currentCoffeeType) && (
          <GridItem>
            <ControllerField<SheetFormValues>
              control={control}
              name='coffeeDetails.bebida'
              label='Bebida'
              required
              isDisabled={isDisabled('coffeeDetails.bebida')}
              CustomInput={
                <Select>
                  <option disabled selected></option>
                  {Object.entries(CoffeeBebidasLabel).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              }
            />
          </GridItem>
        )}
        {currentCoffeeType && hasUtilizationType.includes(currentCoffeeType) && (
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
