type AsyncFunc = (...args: unknown[]) => Promise<unknown>
type Func = (...args: any) => unknown

/**
 * Verify if a function is async
 * @param fn Function to verify
 * @returns True if the function is async
 */
export function isAsyncFunction(fn: Func): fn is AsyncFunc {
  return fn.constructor.name === 'AsyncFunction'
}
