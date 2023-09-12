import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type Permission } from '../types/Permission'

const item1: Permission = {
  description: 'Criar usuário',
  method: 'POST',
  route: `/user/create`,
}
const item2: Permission = {
  description: 'Criar café',
  method: 'POST',
  route: `/coffee/create`,
}
const item3: Permission = {
  description: 'Criar cliente',
  method: 'POST',
  route: `/client/create`,
}
const mockData: Permission[] = [item1, item2, item3]

export default function getAllPermissionsService(): SWRServiceResponse<Permission[]> {
  const { data, ...response } = useFetch('/permissions')
  return {
    ...response,
    data: mockData,
  }
}
