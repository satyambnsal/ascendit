import { graphql } from '../../graphql'
import { useQuery } from 'urql'
import { useHistory } from 'react-router-dom'
import { NewGameBtn } from '../NewGameBtn'
import { useEffect, useState } from 'react'
import { formatAddress } from '../../utils'
import { useAccounts } from '../../hooks/useAccounts'
import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonIcon } from '@ionic/react'
import {
  BlockTitle,
  Button,
  Card,
  Icon,
  Link,
  Navbar,
  NavbarBackLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'konsta/react'
import { arrowBackOutline } from 'ionicons/icons'

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
        <IonToolbar>
          <Link>
            <IonIcon
              icon={arrowBackOutline}
              size="large"
              onClick={() => {
                history.goBack()
              }}
              className="k-color-brand-green"
              color="#A91D3A"
            />{' '}
            Go Back
          </Link>
          <NewGameBtn />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BlockTitle>Leaderboard</BlockTitle>
        <Card
          className="block overflow-x-hidden overflow-y-scroll mt-8 h-5/6"
          contentWrap={false}
          color="black"
        >
          <Table>
            <TableHead>
              <TableRow header>
                <TableCell header>Ranking</TableCell>
                <TableCell header className="text-left">
                  Player
                </TableCell>
                <TableCell header className="text-left">
                  Moves Left
                </TableCell>
                <TableCell header className="text-left">
                  Game ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameResults.map((edge: any, index) => (
                <TableRow
                  key={edge.node.game_id}
                  onClick={() => {
                    history.push(`/game/${edge.node.game_id}`)
                  }}
                  className="flex"
                >
                  <TableCell className="w-10">{index + offset + 1}</TableCell>
                  <TableCell className="text-left">
                    {formatAddress(edge.node.player)}{' '}
                    {account?.address === edge.node.player && <>(you)</>}{' '}
                  </TableCell>
                  <TableCell className="text-center">{edge.node.remaining_slots}</TableCell>
                  <TableCell className="text-center">{edge.node.game_id.toString(16)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="fixed bottom-4 flex justify-around w-full gap-8 px-8">
          <Button
            disabled={offset === 0}
            onClick={() => {
              setOffset(offset - 20)
              reexecuteQuery({ requestPolicy: 'network-only' })
            }}
            className="w-32"
          >
            Prev
          </Button>
          <Button
            disabled={totalResult < 20}
            onClick={() => {
              setOffset(offset + 20)
              reexecuteQuery({ requestPolicy: 'network-only' })
            }}
          >
            Next
          </Button>
        </div>
      </IonContent>
    </IonPage>
  )
}
