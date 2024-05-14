import './App.css'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router'
import { GameScreen, AccountScreen, LeaderboardScreen } from './components'

export const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/game" component={LeaderboardScreen} />
          <Route exact path="/" component={AccountScreen} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
