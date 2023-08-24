import { useCallback, useEffect } from 'react'
import { useForm, type Control } from 'react-hook-form'
import useDebounce from '../../../../shared/hooks/useDebounce'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { getClientsService } from '../../../client/service/getClientsService'
import { type ClientModel } from '../../../client/types/model/Client'

const parseClients = (clients?: ClientModel[]): ClientModel[] => {
  if (!clients) return []
  return clients.slice(0, 3)
}

export default function useSearchBarView(): UseSearchBarView {
  const [isOpen, toggleIsOpen, setIsOpen] = useToggle()
  const { control, reset, watch } = useForm<SearchBarFormValues>({
    defaultValues,
  })
  const searchClient = watch('search')
  const debouncedClient = useDebounce(searchClient)
  const { data, isLoading } = getClientsService(`searchableName=${debouncedClient}`)

  const handleOpenSearchBar = useCallback(
    (e: KeyboardEvent) => {
      const isShortcut = e.ctrlKey && e.code === 'Space'
      if (isShortcut) toggleIsOpen()
    },
    [toggleIsOpen],
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
    reset(defaultValues)
  }, [reset, setIsOpen])

  useEffect(() => {
    window.addEventListener('keydown', handleOpenSearchBar)

    return () => {
      window.removeEventListener('keydown', handleOpenSearchBar)
    }
  }, [])

  const showClients = Boolean(
    Boolean(debouncedClient) && data?.data && Boolean(data.data.length) && !isLoading,
  )

  return {
    isOpen,
    control,
    handleClose,
    clients: parseClients(data?.data),
    showClients,
    isLoading,
  }
}

type UseSearchBarView = {
  isOpen: boolean
  control: Control<SearchBarFormValues>
  handleClose: () => void
  clients: ClientModel[]
  showClients: boolean
  isLoading: boolean
}

type SearchBarFormValues = {
  search: string
}
const defaultValues: SearchBarFormValues = {
  search: '',
}
