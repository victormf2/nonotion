import { type PropsWithChildren } from 'react'
import { NOTION_TOKEN_LOCAL_STORAGE_KEY } from '../constants'
import { useLocalStorageState } from '../local-storage/use-local-storage-state'
import { NotionTokenContext } from './notion-token-context'

export function NotionTokenProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorageState(NOTION_TOKEN_LOCAL_STORAGE_KEY)

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
