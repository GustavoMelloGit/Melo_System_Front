import { type CoffeeDetails } from '../../types/model/coffee'

export function formatCoffeeDetails(values: CoffeeDetails): CoffeeDetails {
  const { description, type, ...rest } = values
  const formattedRest = Object.keys(rest).reduce((acc, key) => {
    return {
      ...acc,
      [key]: Number(rest[key as keyof typeof rest]),
    }
  }, {})
  return {
    ...formattedRest,
    description,
    type,
  }
}
