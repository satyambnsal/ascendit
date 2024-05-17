import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router'
import { GameScreen, AccountScreen, LeaderboardScreen } from './components'
import { BottomTabs } from './components/BottomTabs.tsx'

export const App = () => {
  return (
      <div className="safe-areas">
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet className='pb-12'>
              <Route path="/leaderboard" component={LeaderboardScreen} />
              <Route path="/game/:gameId" component={GameScreen} />
              <Route exact path="/" component={AccountScreen} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </div>
  )
}
