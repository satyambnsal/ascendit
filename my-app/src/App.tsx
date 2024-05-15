import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router'
import { GameScreen, AccountScreen, LeaderboardScreen } from './components'
import { KonstaProvider } from 'konsta/react'

export const App = () => {
  return (
    <KonstaProvider theme="ios">
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/leaderboard" component={LeaderboardScreen} />
            <Route path="/game/:gameId" component={GameScreen} />
            <Route exact path="/" component={AccountScreen} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </KonstaProvider>
  )
}
