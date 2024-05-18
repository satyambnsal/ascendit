import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { Button } from '../ui/button'
import { BottomTabs } from '../BottomTabs'

export const GameRules = () => {
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="text-center">
          <div className="flex items-center justify-between px-4">
            <Button
              className="flex items-center gap-2 !pe-2 ps-0"
              variant="secondary"
              onClick={() => {
                history.push(`/leaderboard`)
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
            <div>Game Rules</div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="px-4 pt-4 pb-24">
          We generate 20 random numbers from 1 to 1000, and each time we generate one, you predict
          where the current number will go in ascending order of the 20 numbers. Your ranking
          depends on how many numbers you successfully place.
        </div>
      </IonContent>

      <BottomTabs />
    </IonPage>
  )
}
