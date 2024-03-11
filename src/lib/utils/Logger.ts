import { captureException } from '@sentry/react'

export interface ILogger {
  error: (message: string) => void
}

export class Logger implements ILogger {
  error(message: string): void {
    captureException(message)
  }
}
