import { graphql } from '../../graphql'
import { useQuery } from 'urql'
import { useHistory } from 'react-router-dom'
import { NewGameBtn } from '../NewGameBtn'
import { useEffect, useState } from 'react'
import { formatAddress } from '../../utils'
import { useAccounts } from '../../hooks/useAccounts'
import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent } from '@ionic/react'
import {
  Card,
  Navbar,
  NavbarBackLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'konsta/react'

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

  console.log('total results', totalResult)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Navbar title="Leaderboard" left={<NavbarBackLink onClick={() => history.goBack()} />} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NewGameBtn />
        <Card className="block overflow-x-auto mt-8" contentWrap={false} color="black">
          <Table>
            <TableHead>
              <TableRow header>
                <TableCell header>Ranking</TableCell>
                <TableCell header className="text-left">
                  Player
                </TableCell>
                <TableCell header className="text-left">
                  Remaining Numbers
                </TableCell>
                <TableCell header className="text-left">
                  Game ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameResults.map((edge: any, index) => (
                <TableRow key={edge.node.game_id}>
                  <TableCell>{index + offset + 1}</TableCell>
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
      </IonContent>
    </IonPage>
  )
}
