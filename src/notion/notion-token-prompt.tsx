import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PropsWithChildren,
} from 'react'
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

  const textbox = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (textbox.current == null) {
      return
    }

    function focusTextbox() {
      textbox.current?.focus()
    }

    document.addEventListener('click', focusTextbox)

    return () => {
      document.removeEventListener('click', focusTextbox)
    }
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <div>Insira o notion token</div>
      <div>
        <input
          autoFocus
          name="notion-token"
          onChange={(evt) => setUserProvidedToken(evt.target.value)}
          ref={textbox}
          style={{ width: '100%' }}
          type="text"
          value={userProvidedToken}
        />
      </div>
      <button type="submit" disabled={disabled}>
        Confirmar
      </button>
    </form>
  )
}
