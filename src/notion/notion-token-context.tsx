import { createContext, useContext } from 'react'

export type NotionTokenContext = {
  token: string | null
  setToken: (token: string) => void
}
export const NotionTokenContext = createContext<NotionTokenContext | null>(null)

export function useNotionToken() {
  const ctx = useContext(NotionTokenContext)
  if (ctx == null) {
    throw new Error('useNotionToken should be used with NotionTokenProvider')
  }
  return ctx
}
