export function formatInputDateString(date: string): string {
  return date + 'T10:00:00.000Z'
}

export function formatAndSumDayOfDate(date: number): string {
  const day = new Date(date).getDate() + 1
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()
  return new Date(year, month, day).toLocaleDateString('pt-BR')
}
