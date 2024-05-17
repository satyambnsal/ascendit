import { graphql } from 'gql.tada'
import { useEffect, useState } from 'react'
import { useSubscription } from 'urql'
import { useAccounts } from '../hooks/useAccounts'
import { useHistory } from 'react-router-dom'
import { ACTIONS_CONTRACT } from '../utils'
import { Spinner } from './Spinner'
import { Button } from './ui/button'

const CreatedEvent = graphql(`
  subscription Created($player: String) {
    eventEmitted(keys: ["*", $player]) {
      keys
      data
    }
  }
`)

export const NewGameBtn = ({ onNewGame }: { onNewGame?: () => void }) => {
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
    history.push(`/game/${gameId}`)
  }, [createdEvent])

  const newGame = async () => {
    if (!account) return
    if (onNewGame) {
      onNewGame()
    }
    setCreating(true)
    // console.log('=== account ====', account)

    const { transaction_hash } = await account.execute({
      contractAddress: ACTIONS_CONTRACT,
      entrypoint: 'create',
      calldata: {},
    })
    // console.log(transaction_hash)
  }

  // console.log('creating', creating)

  return (
      <Button
        onClick={() => {
          setCreating(true)
          newGame()
        }}
        className="px-4 min-w-[100px]"
        disabled={!account?.address}
      >
        {creating && <Spinner className="w-4" fill="white" />}
        {!creating && <span className="">New Game</span> }
        
         
      </Button>
  )
}
