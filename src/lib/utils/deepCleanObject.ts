import { type DeepPartial } from 'react-hook-form'

export function deepCleanObject<T extends Record<string, unknown>>(data: T): DeepPartial<T> {
  function deepClean(obj: Record<string, any>): Record<string, any> {
    const cleanedObj: Record<string, any> = {}

    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined || value === '') {
        continue // Skip empty values
      }

      if (typeof value === 'object') {
        const nestedCleaned = deepClean(value)
        if (Object.keys(nestedCleaned).length > 0) {
          cleanedObj[key] = nestedCleaned
        }
      } else {
        cleanedObj[key] = value
      }
    }

    return cleanedObj
  }

  return deepClean(data) as DeepPartial<T>
}
