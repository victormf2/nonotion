import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PropsWithChildren,
} from 'react'
import { useNotion } from './notion-context'

export function WithNotionToken({ children }: PropsWithChildren) {
  const { token } = useNotion()

  if (token == null) {
    return <NotionTokenPrompt />
  }

  return <>{children}</>
}

function NotionTokenPrompt() {
  const [userProvidedToken, setUserProvidedToken] = useState('')
  const { setToken } = useNotion()

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
      <div>
        Insira o{' '}
        <a href="https://www.notion.so/profile/integrations">token do notion</a>
        .
      </div>
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
