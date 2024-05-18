import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './styles/index.css'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import { IonIcon, setupIonicReact } from '@ionic/react'
import { Provider, Client, cacheExchange, fetchExchange, subscriptionExchange } from 'urql'

import { createClient as createWSClient } from 'graphql-ws'

const wsClient = createWSClient({
  url: import.meta.env.VITE_GRAPHQL_WS_URL,
})

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' }
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink)
            return { unsubscribe }
          },
        }
      },
    }),
  ],
})

async function init() {
  setupIonicReact()
  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('React root not found')
  const root = ReactDOM.createRoot(rootElement as HTMLElement)

  root.render(
    <React.StrictMode>
      <Provider value={client}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

init()
