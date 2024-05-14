import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSpinner,
} from '@ionic/react'
import { useAccounts } from '../../hooks/useAccounts'
import { trimStringWithEllipsis } from '../../utils'

export const AccountScreen = () => {
  const { createAccount, isLoading, error, account } = useAccounts()
  // console.log({ account, error })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!!account && (
          <div>
            <p>Use Existing Account 1</p>
            <IonButton routerLink="/home">{trimStringWithEllipsis(account?.address)}</IonButton>
          </div>
        )}
        <IonButton onClick={createAccount}>
          {!!isLoading && <IonSpinner />}
          Create New Account
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
