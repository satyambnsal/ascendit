import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react'
import { BlockTitle, Button } from 'konsta/react'
import { useAccounts } from '../../hooks/useAccounts'
import { trimStringWithEllipsis } from '../../utils'
import { Spinner } from '../Spinner'
import logo from '../../assets/icon.png'

export const AccountScreen = () => {
  const { createAccount, isLoading, account } = useAccounts()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ascend It</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="bg-slate-50">
          <div className="flex justify-center ">
            <img src={logo} alt="Ascend It logo" className="w-64 h-64 my-8 block" />
          </div>
          <div className="w-full px-6 justify-center items-center flex flex-col h-48 gap-4">
            {!!account && (
              <div className="w-full">
                <label className="font-semibold mb-4 block">Use Existing Account</label>
                <Button href="/leaderboard" className="w-full" outline large>
                  {trimStringWithEllipsis(account?.address)}
                </Button>
              </div>
            )}
            {!!account && <p className="font-semibold">OR</p>}
            <Button onClick={createAccount} className="w-full" large>
              {!!isLoading && <Spinner className="mr-4" fill="white" />}
              Create New Account
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
