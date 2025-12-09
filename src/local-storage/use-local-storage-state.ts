import { useEffect, useEffectEvent, useState, type SetStateAction } from 'react'

export function useLocalStorageState(storageKey: string) {
  const [stateValue, setStateValue] = useState<string | null>(null)

  const onLoadValue = useEffectEvent(setStateValue)
  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey)
    if (storedValue != null) {
      onLoadValue(storedValue)
    }
  }, [storageKey])

  function setAndStoreValue(value: SetStateAction<string | null>) {
    let newValue: string | null
    if (typeof value === 'function') {
      newValue = value(stateValue)
    } else {
      newValue = value
    }
    setStateValue(newValue)
    if (newValue == null) {
      localStorage.removeItem(storageKey)
    } else {
      localStorage.setItem(storageKey, newValue)
    }
  }

  return [stateValue, setAndStoreValue] as const
}
