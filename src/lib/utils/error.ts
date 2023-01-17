export const errorHandler = (error: unknown): string => {
    if (typeof error === 'string') return error
    if (error instanceof Error) return error.message
    if (error instanceof Object) return JSON.stringify(error)
    return String(error)
}