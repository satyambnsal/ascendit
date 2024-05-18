import { graphql } from '../graphql'
import { useQuery } from 'urql'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatAddress } from '@/utils'
import { useAccounts } from '@/hooks/useAccounts'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const AllGamesQuery = graphql(`
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

const OwnGamesQuery = graphql(`
  query Games($offset: Int, $player: String) {
    gameModels(
      order: { direction: ASC, field: REMAINING_SLOTS }
      limit: 20
      offset: $offset
      where: { player: $player }
    ) {
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
type ScoreTableProps = {
  title: string
  type: 'all' | 'player'
  address?: string
}

export const ScoreTable = ({ title, type, address }: ScoreTableProps) => {
  const history = useHistory()
  const [offset, setOffset] = useState<number>(0)
  const { account } = useAccounts()
  const variables: { offset: number; player?: string } = {
    offset,
  }
  if (type === 'player') {
    variables.player = address
  }
  const [result, reexecuteQuery] = useQuery({
    query: type === 'all' ? AllGamesQuery : OwnGamesQuery,
    variables,
  })

  const [gameResults, setGameResults] = useState<Edge[]>([])
  const totalResult = result.data?.gameModels?.edges ? result.data.gameModels?.edges.length : 0
  useEffect(() => {
    if (result.data?.gameModels?.edges?.length) {
      setGameResults(result.data?.gameModels?.edges as Edge[])
    }
  }, [result.data?.gameModels?.edges, totalResult])

  return (
    <div className="py-4">
      <div className="flex justify-between items-center px-2 mb-1">
        <h2 className="">{title}</h2>
        <Button
          onClick={() => {
            reexecuteQuery({ requestPolicy: 'network-only' })
          }}
          variant="outline"
        >
          Refresh
        </Button>
      </div>

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
            {gameResults.length <= 0 ? (
              <>
                {Array.from({ length: 20 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[90px] rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-10 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-10 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
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
              </>
            )}
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
  )
}
