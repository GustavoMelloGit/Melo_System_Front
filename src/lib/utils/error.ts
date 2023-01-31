import axios, { type AxiosError } from 'axios'
import { type AxiosErrorResponse } from '../../shared/types/utils/error'

export function errorHandler(error: unknown): string {
  if (isAxiosError<AxiosErrorResponse>(error)) {
    return error.response?.data.message ?? 'Unknown error'
  }
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error)
}
