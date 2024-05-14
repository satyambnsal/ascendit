import { BigNumberish, num } from 'starknet'

export enum Direction {
  Left = 1,
  Right = 2,
  Up = 3,
  Down = 4,
}

export function updatePositionWithDirection(
  direction: Direction,
  value: { vec: { x: number; y: number } }
) {
  switch (direction) {
    case Direction.Left:
      value.vec.x--
      break
    case Direction.Right:
      value.vec.x++
      break
    case Direction.Up:
      value.vec.y--
      break
    case Direction.Down:
      value.vec.y++
      break
    default:
      throw new Error('Invalid direction provided')
  }
  return value
}

export const ERROR_MESSAGES = {
  DOJO_PROVIDER_INIT_FAILED: 'Failed to initialise dojo provider',
  BURNER_INIT_FAILED: 'Failed to initialise burner',
}

export const stringToHexString = (str: string) => {
  return str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(16).padStart(2, '0')
    })
    .join('')
}

export const trimStringWithEllipsis = (str: string) => {
  if (str.length <= 8) {
    return str // Return the original string if it's 8 characters or less
  }

  const firstThree = str.slice(0, 3) // Get the first three characters
  const lastFive = str.slice(-5) // Get the last five characters

  return `${firstThree}...${lastFive}`
}

export const getStartAndEndOfDay = () => {
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

  return { startDate, endDate }
}

export function formatAddress(addr: BigNumberish) {
  if (typeof addr === 'number') {
    addr = '0x' + addr.toString(16)
  } else {
    addr = num.toHex(BigInt(addr))
  }

  return addr.substr(0, 6) + '...' + addr.substr(-4)
}
