import { Client } from '@notionhq/client'
import { useMemo, type PropsWithChildren } from 'react'
import { NOTION_TOKEN_LOCAL_STORAGE_KEY } from '../constants'
import { useLocalStorageState } from '../local-storage/use-local-storage-state'
import { NotionContext } from './notion-context'

export function NotionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorageState(NOTION_TOKEN_LOCAL_STORAGE_KEY)

  const client = useMemo(() => {
    if (token == null) {
      return null
    }
    const notionClient = new Client({
      auth: token,
      baseUrl: 'https://nonotion.victormachadodefranca.workers.dev',
      fetch: (...args) => fetch(...args),
      notionVersion: '2025-09-03',
    })
    return notionClient
  }, [token])

  return (
    <NotionContext.Provider
      value={{
        token,
        client,
        setToken,
      }}
    >
      {children}
    </NotionContext.Provider>
  )
}
