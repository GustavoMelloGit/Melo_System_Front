import { type CoffeeDetails } from '../../types/model/coffee'

export function formatCoffeeDetails(values: Partial<CoffeeDetails>): Partial<CoffeeDetails> {
  const { description, bebida, coffeeType, ...rest } = values
  const formattedRest = Object.keys(rest).reduce((acc, key) => {
    return {
      ...acc,
      [key]: Number(rest[key as keyof typeof rest]),
    }
  }, {})
  return {
    ...formattedRest,
    description,
    bebida,
    coffeeType,
  }
}
