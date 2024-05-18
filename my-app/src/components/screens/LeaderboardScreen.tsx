import { useHistory } from 'react-router-dom'
import { NewGameBtn } from '../NewGameBtn'
import { IonHeader, IonPage, IonToolbar, IonContent, IonIcon } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import { Button } from '../ui/button'

import { BottomTabs } from '../BottomTabs'
import { ScoreTable } from '../ScoreTable'

export const LeaderboardScreen = () => {
  const history = useHistory()
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
        <ScoreTable type="all" title="Leaderboard" />
      </IonContent>
      <BottomTabs />
    </IonPage>
  )
}
