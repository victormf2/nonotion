import './App.css'
import { useNotionToken } from './notion/notion-token-context'
import { WithNotionToken } from './notion/notion-token-prompt'
import { NotionTokenProvider } from './notion/notion-token-provider'

function Renderrr() {
  const { token } = useNotionToken()

  return <div>{token}</div>
}

function App() {
  return (
    <>
      <NotionTokenProvider>
        <WithNotionToken>
          <Renderrr />
        </WithNotionToken>
      </NotionTokenProvider>
    </>
  )
}

export default App
