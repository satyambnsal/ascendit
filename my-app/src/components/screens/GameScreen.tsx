import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { graphql } from 'gql.tada'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useAccounts } from '../../hooks/useAccounts'
import { useQuery, useSubscription } from 'urql'
import { ACTIONS_CONTRACT, formatAddress } from '../../utils'
import { arrowBackOutline, arrowForwardOutline, handRight } from 'ionicons/icons'
import { Button } from '../ui/button'
import { BottomTabs } from '../BottomTabs'
import { Spinner } from '../Spinner'

const GameQuery = graphql(`
  query GameQuery($gameId: u32) {
    gameModels(where: { game_id: $gameId }) {
      edges {
        node {
          player
          max_number
          remaining_slots
          next_number
        }
      }
    }
    slotModels(where: { game_id: $gameId }, order: { direction: ASC, field: SLOT }, limit: 20) {
      edges {
        node {
          slot
          number
        }
      }
    }
  }
`)

const EventSubscription = graphql(`
  subscription EventEmitted($gameId: String) {
    eventEmitted(keys: [$gameId]) {
      keys
      data
    }
  }
`)

const MAX_REMAINING = 20
export const GameScreen = () => {
  const history = useHistory()
  const { gameId }: { gameId: string } = useParams()
  const [slots, setSlots] = useState<number[]>(Array.from({ length: 20 }))
  const [next, setNext] = useState<number>()
  const [player, setPlayer] = useState<string>('')
  const [isOwner, setIsOwner] = useState(false)
  const [remaining, setRemaining] = useState<number>(MAX_REMAINING)
  const [disableAll, setDisableAll] = useState(false)
  const [maxNum, setMaxNum] = useState<number>()
  const { account } = useAccounts()
  const [showErrorToast, setErrorToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('false')

  if (!gameId) {
    return (
      <IonPage>
          <IonHeader>
        <IonToolbar className='text-center'>
          <div className='flex items-center justify-between px-4'>
            <Button 
             className='flex items-center gap-2 !pe-2 ps-0'
             variant="secondary"
             onClick={() => {
              history.push(`/leaderboard`)
            }}>
              <IonIcon
                icon={arrowBackOutline}
                size="small"
                className="k-color-brand-green"
                color="#A91D3A"
              />
              Go Back
              </Button>
          </div>
        </IonToolbar>
      </IonHeader>
        <IonContent>
          <h1>No games available matching game id ${gameId}</h1>
        </IonContent>
      </IonPage>
    )
  }

  const [queryResult] = useQuery({
    query: GameQuery,
    variables: { gameId: parseInt(gameId) },
    pause: !gameId,
  })

  const [eventEmitted] = useSubscription({
    query: EventSubscription,
    variables: { gameId },
  })

  useEffect(() => {
    if (eventEmitted.data?.eventEmitted) {
      const { data } = eventEmitted.data?.eventEmitted
      setNext(parseInt(data?.[2] || '0', 16))
      setRemaining(parseInt(data?.[3] || '0', 16))
      const newSlots = [...slots]
      newSlots[parseInt(data?.[0] || '0', 16)] = parseInt(data?.[1] || '0', 16)
      setSlots(newSlots)
      setDisableAll(false)
    }
  }, [eventEmitted])

  useEffect(() => {
    queryResult?.data?.gameModels?.edges?.forEach((edge: any) => {
      setRemaining(edge.node.remaining_slots)
      setNext(edge.node.next_number)
      // console.log('player', edge.node.player)
      setPlayer(edge.node.player)
      setMaxNum(edge.node.max_number)

      if (edge.node.player === account?.address) {
        setIsOwner(true)
      }
    })

    const newSlots: number[] = Array.from({ length: 20 })
    queryResult.data?.slotModels?.edges?.forEach((edge: any) => {
      newSlots[edge.node.slot] = edge.node.number
    })
    setSlots(newSlots)
  }, [queryResult, account])

  const setSlot = async (slot: number): Promise<boolean> => {
    if (!account) return false
    try {
      const { transaction_hash } = await account.execute({
        contractAddress: ACTIONS_CONTRACT,
        entrypoint: 'set_slot',
        calldata: [gameId, slot],
      })
      // console.log('transaction hash', transaction_hash)
    } catch (e) {
      console.error(e)
      setErrorMessage('can not place number in this slot')
      setDisableAll(false)
      setErrorToast(true)
      return false
    }
    return true
  }

  // console.log('player', player)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='text-center'>
          <div className='flex items-center justify-between px-4'>
            <Button 
             className='flex items-center gap-2 !pe-2 ps-0'
             variant="secondary"
             onClick={() => {
              history.push(`/leaderboard`)
            }}>
              <IonIcon
                icon={arrowBackOutline}
                size="small"
                className="k-color-brand-green"
                color="#A91D3A"
              />
              Go Back
              </Button>
            <div>
              <strong>
                {formatAddress(player)} {isOwner && '(you)'}
              </strong>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='mb-4'>
          <div className='mb-4'>

            <p>Number range: {maxNum && <strong>1 - {maxNum}</strong>}</p>
            <p>
              Remaining: <strong>{remaining}</strong>
            </p>

          </div>

          <div className='px-6 py-3 border border-gray-400 rounded-md text-center flex items-center justify-center gap-4'>
            <div className='flex items-center gap-1'>
              <span>
              Next Number 
              </span>
           <IonIcon
            icon={arrowForwardOutline}
            size="medium"
            className='align-middle'
          />

            </div>
            <div>
             <strong className='text-2xl'>{next}</strong>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-evenly sm:justify-center overflow-hidden">
          <div className="flex flex-col gap-2 min-w-[150px]">
            {slots.slice(0, 10).map((number, index) => (
              <Slot
                index={index}
                number={number}
                isOwner={isOwner}
                disableAll={disableAll}
                onClick={async (slot) => {
                  setDisableAll(true)
                  return await setSlot(slot)
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 min-w-[150px]">
            {slots.slice(10, 20).map((number, index) => (
              <Slot
                index={index + 10}
                number={number}
                isOwner={isOwner}
                disableAll={disableAll}
                onClick={async (slot) => {
                  setDisableAll(true)
                  return await setSlot(slot)
                }}
              />
            ))}
          </div>
        </div>

        {/* <Toast
          position="center"
          opened={showErrorToast}
          button={
            <Button rounded clear small inline onClick={() => setErrorToast(false)}>
              Close
            </Button>
          }
        >
          <div className="shrink">{errorMessage}</div>
        </Toast> */}
      </IonContent>

      <BottomTabs />
    </IonPage>
  )
}

type SlotProps = {
  index: number
  number: number
  isOwner: Boolean
  disableAll: boolean
  onClick: (slot: number) => Promise<boolean>
}

export const Slot = ({ index, number, isOwner, disableAll, onClick }: SlotProps) => {
  const [loading, setLoading] = useState(false)
  return (
    <div key={index} className="flex gap-4 flex-nowrap items-center">
      <p className="w-6">{index + 1}</p>
      <div className='w-full'>
        {number ? (
          <Button disabled={true} className='w-full max-w-[100px] !bg-green-600'>
            {number}
          </Button>
        ) : (
          <Button
            disabled={!isOwner || disableAll}
            className={`w-full max-w-[100px]`}
            onClick={async () => {
              setLoading(true)
              const success = await onClick(index)
              if (!success) {
                setLoading(false)
              }
            }}
          >
            {loading && <div className=""> <Spinner className="w-4" fill="white" /></div> }
            {!loading && <div className="">  {isOwner ? 'Set' : 'Empty'}</div> }
          </Button>
        )}
      </div>
    </div>
  )
}
