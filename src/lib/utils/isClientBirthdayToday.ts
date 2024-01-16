import { type ClientModel } from '../../domain/client/types/model/Client'

const threeHoursInMilliseconds = 1.08e7

export function isClientBirthdayToday(client: ClientModel): boolean {
  if (client.personType.type !== 'fisica') return false
  if (!client.personType.birthDate) return false

  const clientBirthDate = new Date(client.personType.birthDate + threeHoursInMilliseconds)
  const today = new Date()
  return (
    clientBirthDate.getDate() === today.getDate() && clientBirthDate.getMonth() === today.getMonth()
  )
}
