import { PaginationParams } from '../../../../../lib/constants/pagination'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { getBirthdaysService } from '../../../service/getBirthdaysService'
import { type ClientModel } from '../../../types/model/Client'

const currentMonth = new Date().getMonth() + 1

export default function useBirthdaysView(): UseBirthdaysView {
  const { getParam } = useURLSearchParams({
    [PaginationParams.searchBy]: String(currentMonth),
  })
  const month = getParam(PaginationParams.searchBy) ?? currentMonth
  const { data, isLoading } = getBirthdaysService(month)

  return {
    data: data ?? [],
    isLoading,
  }
}

type UseBirthdaysView = {
  data: ClientModel[]
  isLoading: boolean
}
