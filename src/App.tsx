import { useEffect } from 'react'
import './App.css'
import { useNotionClient } from './notion/notion-context'
import { NotionProvider } from './notion/notion-provider'
import { WithNotionToken } from './notion/notion-token-prompt'

function Renderrr() {
  const client = useNotionClient()

  useEffect(() => {
    async function teste() {
      console.log(client)
      // try {
      //   const response = await client.databases.retrieve({
      //     database_id: '2bf5d73563568061a9aaf1559a7ce436',
      //   })
      //   console.log(response)
      // } catch (error) {
      //   console.error(error)
      // }
    }
    teste()
  }, [client])

  return <div>Banana meu</div>
}

function App() {
  return (
    <>
      <NotionProvider>
        <WithNotionToken>
          <Renderrr />
        </WithNotionToken>
      </NotionProvider>
    </>
  )
}

export default App
