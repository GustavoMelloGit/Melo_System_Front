export type CoffeeDetails = {
  moisture?: number
  picking?: number
  sieve?: number
  drilled?: number
  foulness?: number
  description?: string
  weight?: number
}

export type CoffeeTypes =
  | 'rio_velho'
  | 'rio_zona'
  | 'rio'
  | 'riado_rio'
  | 'riado'
  | 'duro_riado_rio'
  | 'duro_riado'
  | 'duro'
  | 'despolpado'
  | 'escolha'

export enum CoffeeTypesEnum {
  rio_velho = 'Rio Velho',
  rio_zona = 'Rio Zona',
  rio = 'Rio',
  riado_rio = 'Riado Rio',
  riado = 'Riado',
  duro_riado_rio = 'Duro Riado Rio',
  duro_riado = 'Duro Riado',
  duro = 'Duro',
  despolpado = 'Despolpado',
  escolha = 'Escolha',
}
