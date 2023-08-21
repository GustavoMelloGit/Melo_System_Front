export default function objectEntries<T extends string | number, K = unknown>(
  obj: Record<T, K>,
): Array<[T, K]> {
  return Object.entries(obj) as Array<[T, K]>
}
