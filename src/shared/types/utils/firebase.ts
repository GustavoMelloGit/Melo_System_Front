
export type UseSwrFirebase<T> = {
    data: T | undefined
    isLoading: boolean
    error: Error | undefined
}