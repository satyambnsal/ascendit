import { IonIcon } from '@ionic/react'
import { Button } from './ui/button.tsx'
import { settings, wallet , gameController } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'

export const BottomTabs = () => {
  const history = useHistory()
  return (
    <div className='fixed bottom-0 w-full bg-white min-h-[50px] flex items-center justify-around'>
    <Button className='flex flex-col min-h-[100px] gap-1' variant="link"
           onClick={() => {
              history.push(`/leaderboard`)
            }}
              >
      <IonIcon
          icon={wallet}
          size="large"
          />
        About
      </Button>

      <Button className='flex flex-col min-h-[100px] gap-1' variant="link" >
      <IonIcon
          icon={gameController}
          size="large"
          />Game
        </Button>

      <Button className='flex flex-col min-h-[100px] gap-1' variant="link">
        <IonIcon
          icon={settings}
          size="large"
        />Setting

        </Button>
  </div>
  )
}