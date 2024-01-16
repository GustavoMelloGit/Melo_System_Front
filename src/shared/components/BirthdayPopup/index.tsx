import BirthdayPopupView from './View'
import useBirthdayPopupView from './useView'

export default function BirthdayPopup(): JSX.Element {
  const { birthdayPeople, closeModalHandler, isOpen } = useBirthdayPopupView()
  return (
    <BirthdayPopupView
      birthdayPeople={birthdayPeople}
      closeModalHandler={closeModalHandler}
      isOpen={isOpen}
    />
  )
}
