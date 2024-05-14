import { graphql } from 'gql.tada'
import { useEffect, useState } from 'react'
import { useSubscription } from 'urql'
import { useAccounts } from '../hooks/useAccounts'
import { useHistory } from 'react-router-dom'
import { ACTIONS_CONTRACT } from '../utils'
import { Button } from '@chakra-ui/react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

const CreatedEvent = graphql(`
  subscription Created($player: String) {
    eventEmitted(keys: ["*", $player]) {
      keys
      data
    }
  }
`)

export const Header = ({ title, onNewGame }: { title: string; onNewGame?: () => void }) => {
  const { account } = useAccounts()
  const [creating, setCreating] = useState(false)
  const history = useHistory()
  const [createdEvent] = useSubscription({
    query: CreatedEvent,
    pause: !account,
    variables: {
      player: account?.address,
    },
  })

  useEffect(() => {
    const gameId = createdEvent.data?.eventEmitted?.keys?.[0]
    if (!gameId) {
      return
    }
    setCreating(false)
    history.push(`/${gameId}`)
  }, [createdEvent])

  const newGame = async () => {
    if (!account) return
    if (onNewGame) {
      onNewGame()
    }
    console.log('=== account ====', account)

    const { transaction_hash } = await account.execute({
      contractAddress: ACTIONS_CONTRACT,
      entrypoint: 'create',
      calldata: {},
    })
    console.log(transaction_hash)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Button
          onClick={() => {
            setCreating(true)
            newGame()
          }}
          isLoading={creating}
          visibility={account ? 'visible' : 'hidden'}
        >
          New Game
        </Button>
      </IonContent>
    </IonPage>
  )
}
