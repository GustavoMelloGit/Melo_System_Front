import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import { NotFoundView } from '../../types/view/404'

export default function useNotFoundPage(): NotFoundView {
  const navigate = useNavigate()

  const handleGoHome = (): void => {
    navigate(Routes.home)
  }

  return {
    handleGoHome,
  }
}
