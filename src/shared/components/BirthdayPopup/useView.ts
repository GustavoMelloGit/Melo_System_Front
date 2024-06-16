import { useCallback, useEffect, useState } from 'react'
import { useGetBirthdaysService } from '../../../domain/client/service/ClientService.hooks'
import StorageManager from '../../../lib/utils/StorageManager'
import { isClientBirthdayToday } from '../../../lib/utils/isClientBirthdayToday'
import { type BirthdayPerson } from './types'

function hasPopupAlreadyBeenDisplayedToday(lastDisplayedDate: number): boolean {
  const today = new Date().getDate()

  return today === lastDisplayedDate
}

const currentMonth = new Date().getMonth() + 1

export default function useBirthdayPopupView(): UseBirthdayPopupView {
  const { data, isLoading } = useGetBirthdaysService(currentMonth)
  const [isOpen, setIsOpen] = useState(false)
  const manager = StorageManager<number>('birthday-popup')

  const todayBirthdays = data?.filter(isClientBirthdayToday)
  const hasPopupBeenDisplayedToday = hasPopupAlreadyBeenDisplayedToday(manager.getValue())
  const displayBirthdayPopup = !isLoading && !!todayBirthdays?.length && !hasPopupBeenDisplayedToday

  const closeModalHandler = useCallback(() => {
    setIsOpen(false)
    manager.setValue(new Date().getDate())
  }, [manager])

  useEffect(() => {
    setIsOpen(displayBirthdayPopup)
  }, [displayBirthdayPopup])

  return {
    birthdayPeople: todayBirthdays ?? [],
    closeModalHandler,
    isOpen,
  }
}

type UseBirthdayPopupView = {
  birthdayPeople: BirthdayPerson[]
  closeModalHandler: () => void
  isOpen: boolean
}
