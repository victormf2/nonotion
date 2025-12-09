import { type PropsWithChildren } from 'react'
import { useLocalStorageState } from '../local-storage/use-local-storage-state'
import { NotionTokenContext } from './notion-token-context'

export function NotionTokenProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorageState('banana-teste')

  return (
    <NotionTokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </NotionTokenContext.Provider>
  )
}
