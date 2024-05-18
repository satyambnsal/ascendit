import { graphql } from '../../graphql'
import { useQuery } from 'urql'
import { useHistory } from 'react-router-dom'
import { NewGameBtn } from '../NewGameBtn'
import { useEffect, useState } from 'react'
import { formatAddress } from '../../utils'
import { useAccounts } from '../../hooks/useAccounts'
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonIcon,
  IonFooter,
} from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { BottomTabs } from '../BottomTabs'

const GamesQuery = graphql(`
  query Games($offset: Int) {
    gameModels(order: { direction: ASC, field: REMAINING_SLOTS }, limit: 20, offset: $offset) {
      edges {
        node {
          game_id
          player
          remaining_slots
        }
      }
    }
  }
`)

type Edge = {
  node: {
    remaining_slots: number | null
    player: unknown
    game_id: number | null
  } | null
} | null

export const LeaderboardScreen = () => {
  const history = useHistory()
  const [offset, setOffset] = useState<number>(0)
  const { account } = useAccounts()
  const [result, reexecuteQuery] = useQuery({
    query: GamesQuery,
    variables: {
      offset,
    },
  })

  const [gameResults, setGameResults] = useState<Edge[]>([])
  const totalResult = result.data?.gameModels?.edges ? result.data.gameModels?.edges.length : 0
  useEffect(() => {
    if (result.data?.gameModels?.edges?.length) {
      setGameResults(result.data?.gameModels?.edges as Edge[])
    }
  }, [result.data?.gameModels?.edges, totalResult])

  // console.log('total results', totalResult)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="text-center">
          <div className="flex justify-between items-center px-3 py-1">
            <Button
              className="flex items-center gap-2 !pe-2 ps-0"
              variant="secondary"
              onClick={() => {
                history.goBack()
              }}
            >
              <IonIcon
                icon={arrowBackOutline}
                size="small"
                className="k-color-brand-green"
                color="#A91D3A"
              />
              Go Back
            </Button>
            <NewGameBtn />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="py-4">
          <h2 className="mb-4 text-center mt-0">Leaderboard</h2>
          <div className="border border-[#eee] mb-36">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ranking</TableHead>
                  <TableHead className="text-center">Player</TableHead>
                  <TableHead className="text-center">Moves Left</TableHead>
                  <TableHead className="text-center">Game ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameResults.map((edge: any, index) => (
                  <TableRow
                    key={edge.node.game_id}
                    onClick={() => {
                      history.push(`/game/${edge.node.game_id}`)
                    }}
                  >
                    <TableCell>{index + offset + 1}</TableCell>
                    <TableCell className="text-center">
                      {formatAddress(edge.node.player)}{' '}
                      {account?.address === edge.node.player && <>(you)</>}{' '}
                    </TableCell>
                    <TableCell className="text-center">{edge.node.remaining_slots}</TableCell>
                    <TableCell className="text-center">{edge.node.game_id.toString(16)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="fixed bottom-[75px] left-0 right-0 w-full">
            <div className="gap-8 bg-white py-4">
              <div className="flex justify-around items-center">
                <Button
                  variant="outline"
                  className="flex-grow-1"
                  disabled={offset === 0}
                  onClick={() => {
                    setOffset(offset - 20)
                    reexecuteQuery({ requestPolicy: 'network-only' })
                  }}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  className="flex-grow-1"
                  disabled={totalResult < 20}
                  onClick={() => {
                    setOffset(offset + 20)
                    reexecuteQuery({ requestPolicy: 'network-only' })
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
      <BottomTabs />
    </IonPage>
  )
}
