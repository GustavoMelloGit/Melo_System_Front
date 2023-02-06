/**
 * Deeply removes all properties with falsy values from an object.
 * @param obj The object to remove properties from.
 * @returns a new object with all falsy properties removed.
 */
export function removeEmptyProperties(obj: Record<string, any>): Record<string, any> {
  const objectWithoutFalsyValues = Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v)
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyProperties(v) : v]),
  )

  return removeEmptyObjects(objectWithoutFalsyValues)
}

/**
 * Removes empty objects from object.
 * @param obj The object to remove empty objects from.
 * @returns a new object with all empty objects removed.
 */
export function removeEmptyObjects(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== Object(v) || Object.keys(v).length > 0),
  )
}

/**
 * Format number values to BRL currency.
 * @param {number} value The value to be formatted.
 * @returns {string} a string with the value formatted to BRL currency.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
