export function dateInputToApiDate(date: string): string {
  const currentTime = new Date().toISOString().split('T')[1]
  return date + 'T' + currentTime
}

export function apiDateToDateInput(date: string): string {
  return date.split('T')[0]
}

export function formatAndSumDayOfDate(date: number): string {
  const day = new Date(date).getDate() + 1
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()
  return new Date(year, month, day).toLocaleDateString('pt-BR')
}

export function formatEndDate(inputDate: string): string {
  return `${inputDate}T23:59:59-03:00`
}

export function formatStartDate(inputDate: string): string {
  return `${inputDate}T00:00:00-03:00`
}
