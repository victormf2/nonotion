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
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 p-4 justify-center items-center h-full"
    >
      <div>
        Insira o{' '}
        <a
          href="https://www.notion.so/profile/integrations"
          className="text-blue-400"
          target="_blank"
        >
          token do notion
        </a>
        .
      </div>
      <div>
        <input
          autoFocus
          name="notion-token"
          onChange={(evt) => setUserProvidedToken(evt.target.value)}
          ref={textbox}
          type="password"
          value={userProvidedToken}
          className="bg-gray-700 rounded-2xl p-4 resize-none disabled:bg-gray-600"
        />
      </div>
      <button
        type="submit"
        className="bg-amber-600 active:bg-amber-500 rounded-2xl p-2 disabled:bg-gray-600"
        disabled={disabled}
      >
        Confirmar
      </button>
    </form>
  )
}
