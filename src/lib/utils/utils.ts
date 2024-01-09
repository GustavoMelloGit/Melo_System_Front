import { PaginationParams } from '../constants/pagination'

/**
 * Deeply removes all properties with falsy values from an object.
 * @param obj The object to remove properties from.
 * @returns a new object with all falsy properties removed.
 */
export function removeEmptyProperties(obj: Record<string, any>): Record<string, any> {
  const objectWithoutFalsyValues = Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v)
      .map(([k, v]) => [
        k,
        v === Object(v) ? removeEmptyProperties(v as Record<string, unknown>) : v,
      ]),
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
    Object.entries(obj).filter(
      ([_, v]) => v !== Object(v) || Object.keys(v as Record<string, unknown>).length > 0,
    ),
  )
}

/**
 * Returns default sort search params for given sort field and order.
 * @param sortBy The field to sort by.
 * @param sortOrder The order to sort by.
 * @returns the default sort search params.
 */
export function getDefaultSortParams(sortBy: string, sortOrder: 'desc' | 'asc' = 'desc'): string {
  return `${PaginationParams.sortBy}=${sortBy}&${PaginationParams.sortOrder}=${sortOrder}`
}
