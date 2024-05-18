import { IonIcon } from '@ionic/react'
import { Button } from './ui/button.tsx'
import { settings , gameController, book } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'

export const BottomTabs = () => {
  const history = useHistory()

  return (
    <div className='fixed bottom-0 w-full bg-white min-h-[50px] flex items-center justify-around p-3'>
    <Button className='flex flex-col min-h-[65px] gap-1' variant={`${history.location.pathname === "/rules" ? "default" : "link"}`} 
     onClick={() => {
        history.push(`/rules`)
      }}>
      <IonIcon
          icon={book}
          size="large"
          />
        Rules
      </Button>

      <Button className='flex flex-col min-h-[65px] gap-1' variant={`${history.location.pathname === "/leaderboard" ? "default" : "link"}`} 
       onClick={() => {
        history.push(`/leaderboard`)
      }}
      >
      <IonIcon
          icon={gameController}
          size="large"
          />Home
        </Button>

      <Button className='flex flex-col min-h-[65px] gap-1' variant={`${history.location.pathname === "/settings" ? "default" : "link"}`} 
        onClick={() => {
          history.push(`/settings`)
        }}
      >
        <IonIcon
          icon={settings}
          size="large"
        />Setting

        </Button>
  </div>
  )
}