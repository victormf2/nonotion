import { Client } from '@notionhq/client'
import { createContext, useContext } from 'react'

export type NotionContext = {
  token: string | null
  client: Client | null
  setToken: (token: string) => void
}
export const NotionContext = createContext<NotionContext | null>(null)

export function useNotion() {
  const ctx = useContext(NotionContext)
  if (ctx == null) {
    throw new Error('useNotion should be used with NotionTokenProvider')
  }
  return ctx
}

export function useNotionClient() {
  const { client } = useNotion()
  if (client == null) {
    throw new Error(
      'useNotionClient should be used when token is already set by useNotion'
    )
  }

  return client
}
