import axios, { type AxiosError } from 'axios'
import { type AxiosErrorResponse } from '../../shared/types/utils/error'

export function errorHandler(error: unknown): string {
  if (isAxiosError<AxiosErrorResponse>(error)) {
    return error.response?.data.message ?? 'Um erro desconhecido ocorreu'
  }
  if (error instanceof Error) {
    return error.message
  }

  return 'Um erro desconhecido ocorreu'
}

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error)
}
