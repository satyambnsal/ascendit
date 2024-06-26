import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonItem,
  IonLabel,
} from '@ionic/react'
import { trimStringWithEllipsis } from '../../utils'
import { Spinner } from '../Spinner'
import logo from '../../assets/icon.png'
import { useAccounts } from '../../hooks/useAccounts'
import { Button } from '../../components/ui/button'
import { useHistory } from 'react-router-dom'

export const AccountScreen = () => {
  const { createAccount, isLoading, account } = useAccounts()
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="text-center">
          <img
            src={logo}
            alt="Ascend It logo"
            className="h-8 rounded-full absolute left-3 top-1/2 -translate-y-1/2"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="bg-slate-50 h-full relative flex flex-col pb-12">
          <h1 className="text-center">Ascend It</h1>
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Ascend It logo"
              className="w-64 h-64 my-8 block object-cover rounded-md"
            />
          </div>
          <div className="px-4 justify-center items-center flex flex-col gap-8 text-center w-full mt-auto">
            {!!account && (
              <div className="w-full">
                <label className="font-semibold mb-4 block">Use Existing Account</label>
                <Button
                  onClick={() => {
                    history.push('/leaderboard')
                  }}
                  className="min-h-12 max-w-64 w-full"
                >
                  {trimStringWithEllipsis(account?.address)}
                </Button>
              </div>
            )}
            {!!account && (
              <div className="flex items-center w-full">
                <div className="border-solid border-b border-b-[#EEE] w-full"></div>
                <div className="px-3">Or</div>
                <div className="border-solid border-b border-b-[#EEE] w-full"></div>
              </div>
            )}
            <Button
              onClick={createAccount}
              className="min-h-12 flex items-center justify-center max-w-64 w-full"
              size="lg"
            >
              {!!isLoading && <Spinner className="text-white" />}
              {!isLoading && <span className="">Create New Account</span>}
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
