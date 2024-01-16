const DEFAULT_KEY = '@melo-system:'

export default function StorageManager<T = string>(key: string): IStorageManager<T> {
  const storageKey = `${DEFAULT_KEY}${key}`

  const getValue = (): T => {
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

export type IStorageManager<T> = {
  getValue: () => T
  setValue: (value: any) => void
  removeValue: () => void
}
