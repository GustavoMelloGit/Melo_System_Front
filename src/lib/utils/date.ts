export function formatInputDateString(date: string): string {
  const currentTime = new Date().toISOString().split('T')[1]
  return date + 'T' + currentTime
}

export function formatAndSumDayOfDate(date: number): string {
  const day = new Date(date).getDate() + 1
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()
  return new Date(year, month, day).toLocaleDateString('pt-BR')
}
