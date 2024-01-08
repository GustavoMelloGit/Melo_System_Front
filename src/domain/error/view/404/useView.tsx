import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'

export default function useNotFoundPage(): UseNotFoundPage {
  const navigate = useNavigate()

  const handleGoBack = (): void => {
    navigate(Routes.clients)
  }

  return {
    handleGoBack,
  }
}

type UseNotFoundPage = {
  handleGoBack: () => void
}
