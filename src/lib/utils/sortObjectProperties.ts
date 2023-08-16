export function sortObjectProperties<T>(inputObject: Record<string, T>): Record<string, T> {
  const orderedKeys = Object.keys(inputObject).sort()
  const orderedObject: Record<string, T> = {}

  for (const key of orderedKeys) {
    orderedObject[key] = inputObject[key]
  }

  return orderedObject
}
