import { captureException } from '@sentry/react'

export type ILogger = {
  error: (message: string) => void
}

export class Logger implements ILogger {
  error(message: string | Error): void {
    captureException(message)
  }
}

export const logger = new Logger()
