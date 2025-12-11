import { useState, type FormEvent } from 'react'
import { toast, Toaster } from 'sonner'
import { NOTION_DATABASE_ID } from './constants'
import { useNotionClient } from './notion/notion-context'
import { NotionProvider } from './notion/notion-provider'
import { WithNotionToken } from './notion/notion-token-prompt'

function Renderrr() {
  const client = useNotionClient()

  const [text, setText] = useState('')
  const [disabled, setDisabled] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (disabled) {
      return
    }

    setDisabled(true)

    try {
      const items = getItemsFromText(text)

      setText(getTextFromItems(items))

      for (let i = 0; i < items.length; i++) {
        const item = items[i]

        try {
          await client.pages.create({
            parent: {
              type: 'database_id',
              database_id: NOTION_DATABASE_ID,
            },
            properties: {
              Name: {
                type: 'title',
                title: [
                  {
                    type: 'text',
                    text: {
                      content: item.food,
                    },
                  },
                ],
              },
              Number: {
                type: 'number',
                number: item.number,
              },
            },
          })
        } catch (error) {
          handleError(error)
        }

        setText(getTextFromItems(items.slice(i + 1)))
      }

      setText('')
    } catch (error) {
      handleError(error)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full gap-4 p-4">
      <div className="grow flex items-center justify-center">
        <textarea
          name="text"
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          className="h-full w-full bg-gray-700 rounded-2xl p-4 resize-none disabled:bg-gray-600"
          disabled={disabled}
        ></textarea>
      </div>
      <button
        type="submit"
        className="grow-0 flex justify-center bg-amber-600 active:bg-amber-500 rounded-2xl p-2 disabled:bg-gray-600"
        disabled={disabled}
      >
        Enviado
      </button>
    </form>
  )
}

type Item = {
  number: number
  food: string
}

function getItemsFromText(text: string): Item[] {
  const items = text.split('\n').map((line) => {
    line = line.trim()
    if (line.length === 0) {
      return null
    }
    const parts = line.split(/(\s+)/)

    let number = Number(parts[0])
    let food = parts.slice(1).join(' ')
    if (isNaN(number) || number === 0) {
      number = 1
      food = parts.join(' ')
    }
    if (number < 0) {
      number = -number
    }

    const item: Item = {
      number,
      food,
    }

    return item
  })

  return items.filter((item) => item != null)
}

function getTextFromItems(items: Item[]): string {
  return items
    .map((item) => {
      return `${item.number} ${item.food}`
    })
    .join('\n')
}

function handleError(error: unknown) {
  console.error(error)
  const message = getErrorMessage(error)
  toast.error(message)
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }

  return String(error)
}

function App() {
  return (
    <>
      <NotionProvider>
        <WithNotionToken>
          <Renderrr />
        </WithNotionToken>
      </NotionProvider>
      <Toaster />
    </>
  )
}

export default App
