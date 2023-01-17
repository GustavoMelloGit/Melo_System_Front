export default function useLocalStorage(key: string): UseLocalStorage {
  const getValue = (): any => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const setValue = (value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const removeValue = (): void => {
    localStorage.removeItem(key)
  }

  return {
    getValue,
    setValue,
    removeValue,
  }
}

type UseLocalStorage = {
  getValue: () => any
  setValue: (value: any) => void
  removeValue: () => void
}
