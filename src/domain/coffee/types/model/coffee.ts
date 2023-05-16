export type CoffeeDetails = {
  moisture: number
  picking: number
  sieve: number
  drilled: number
  foulness: number
  description: string
  bebida: CoffeeBebidas
  coffeeType: CoffeeTypes
}

export type EscolhaDetails = Omit<CoffeeDetails, 'type'> & {
  utilization: number
}

export type DespolpadoDetails = Omit<CoffeeDetails, 'type'>

export type CoffeeTypes = 'bica_corrida' | 'despolpado' | 'conilon' | 'escolha'

export const CoffeeTypesEnum: Record<CoffeeTypes, string> = {
  bica_corrida: 'Bica Corrida',
  conilon: 'Conilon',
  despolpado: 'Despolpado',
  escolha: 'Escolha',
}

export type CoffeeBebidas =
  | 'rio_velho'
  | 'rio_zona'
  | 'rio'
  | 'riado_rio'
  | 'riado'
  | 'duro_riado_rio'
  | 'duro_riado'
  | 'duro'

export const CoffeeBebidasLabel: Record<CoffeeBebidas, string> = {
  rio_velho: 'Rio Velho',
  rio_zona: 'Rio Zona',
  rio: 'Rio',
  riado_rio: 'Riado Rio',
  riado: 'Riado',
  duro_riado_rio: 'Duro Riado Rio',
  duro_riado: 'Duro Riado',
  duro: 'Duro',
}
