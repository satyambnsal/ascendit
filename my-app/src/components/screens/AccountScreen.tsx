import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react'
import { BlockTitle, Button, Preloader } from 'konsta/react'
import { useAccounts } from '../../hooks/useAccounts'
import { trimStringWithEllipsis } from '../../utils'
import { Spinner } from '../Spinner'

export const AccountScreen = () => {
  const { createAccount, isLoading, account } = useAccounts()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AscendIt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="px-6 justify-center items-center flex flex-col h-48 gap-4">
          {!!account && (
            <div>
              <h1>Ascend It!</h1>
              <Button href="/leaderboard" className="w-full" outline large>
                {trimStringWithEllipsis(account?.address)}
              </Button>
            </div>
          )}
          <Button onClick={createAccount} className="w-full" large>
            {!!isLoading && <Spinner className="mr-4" />}
            Create New Account
          </Button>
        </div>
      </IonContent>
    </IonPage>
  )
}
