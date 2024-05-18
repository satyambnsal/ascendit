import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router'
import { GameScreen, AccountScreen, LeaderboardScreen, GameRules, Settings } from './components'

export const App = () => {
  return (
      <div className="safe-areas">
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet className='pb-12'>
              <Route path="/leaderboard" component={LeaderboardScreen} />
              <Route path="/game/:gameId" component={GameScreen} />
              <Route path="/rules" component={GameRules} />
              <Route path="/settings" component={Settings} />
              <Route exact path="/" component={AccountScreen} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </div>
  )
}
