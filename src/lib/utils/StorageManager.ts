const DEFAULT_KEY = '@melo-system:'

export default function StorageManager(key: string): UseLocalStorage {
  const storageKey = `${DEFAULT_KEY}${key}`
  const getValue = (): any => {
    const value = localStorage.getItem(storageKey)
    return value ? JSON.parse(value) : null
  }

  const setValue = (value: any): void => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }

  const removeValue = (): void => {
    localStorage.removeItem(storageKey)
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
