import { getBirthdaysService } from '../../../service/getBirthdaysService'
import { type ClientModel } from '../../../types/model/Client'

const currentMonth = new Date().getMonth()

export default function useBirthdaysView(): UseBirthdaysView {
  const { data, isLoading } = getBirthdaysService(currentMonth)

  return {
    data: data ?? [],
    isLoading,
  }
}

type UseBirthdaysView = {
  data: ClientModel[]
  isLoading: boolean
}
