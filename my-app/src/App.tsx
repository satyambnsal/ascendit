import { useComponentValue } from '@dojoengine/react'
import { Entity } from '@dojoengine/recs'
import { useEffect, useState } from 'react'
import './App.css'
import { Direction } from './utils'
import { getEntityIdFromKeys } from '@dojoengine/utils'
import { useDojo } from './dojo/useDojo'
import { DojoProvider } from './dojo/DojoContext'
import { dojoConfig } from '../dojoConfig'
import { setup } from './dojo/generated/setup'
import { Block, Button } from 'konsta/react'

import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router'
import { GameScreen, AccountScreen } from './components'

type SetupResultType = Awaited<ReturnType<typeof setup>>

export const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={GameScreen} />
          <Route exact path="/" component={AccountScreen} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}


// export default MyApp
