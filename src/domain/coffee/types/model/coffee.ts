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
