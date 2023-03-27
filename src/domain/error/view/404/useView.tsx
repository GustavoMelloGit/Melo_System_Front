import { useNavigate } from 'react-router-dom'

export default function useNotFoundPage(): UseNotFoundPage {
  const navigate = useNavigate()

  const handleGoBack = (): void => {
    navigate(-1)
  }

  return {
    handleGoBack,
  }
}

type UseNotFoundPage = {
  handleGoBack: () => void
}
