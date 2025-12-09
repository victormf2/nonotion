import { useState, type FormEvent, type PropsWithChildren } from 'react'
import { useNotionToken } from './notion-token-context'

export function WithNotionToken({ children }: PropsWithChildren) {
  const { token } = useNotionToken()

  if (token == null) {
    return <NotionTokenPrompt />
  }

  return <>{children}</>
}

function NotionTokenPrompt() {
  const [userProvidedToken, setUserProvidedToken] = useState('')
  const { setToken } = useNotionToken()

  const normalizedValue = userProvidedToken.trim()
  const disabled = normalizedValue.length === 0

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (disabled) {
      return
    }

    setToken(normalizedValue)
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          name="notion-token"
          type="text"
          value={userProvidedToken}
          onChange={(evt) => setUserProvidedToken(evt.target.value)}
        />
      </div>
      <button type="submit" disabled={disabled}>
        Confirmar
      </button>
    </form>
  )
}
