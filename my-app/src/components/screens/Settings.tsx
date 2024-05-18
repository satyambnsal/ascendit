import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { arrowBackOutline, logOutOutline, trashBin } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { Button } from '../ui/button'
import { BottomTabs } from '../BottomTabs'
import { useAccounts } from '../../hooks/useAccounts'
import { trimStringWithEllipsis } from '../../utils'
import { useToast } from '@/components/ui/use-toast'
import { Spinner } from '@/components/Spinner'

export const Settings = () => {
  const { account, removeAccount, createAccount, isLoading } = useAccounts()
  const history = useHistory()
  const { toast } = useToast()
  console.log('account', account)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="text-center">
          <div className="flex items-center justify-between px-4">
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
            <div>Settings</div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="px-4 pt-4 pb-24 h-full flex flex-col">
          {!!account?.address ? (
            <div className="w-full">
              <h2 className="text-xl">
                Welcome, <br />
                <p className="mt-4">{trimStringWithEllipsis(account?.address)}</p>
              </h2>
            </div>
          ) : (
            <Button
              onClick={createAccount}
              className="min-h-12 flex items-center justify-center max-w-80 w-full"
              size="lg"
            >
              {!!isLoading && <Spinner className="w-6" fill="white" />}
              {!isLoading && <span className="">Create New Wallet</span>}
            </Button>
          )}

          {account?.address && (
            <Button
              variant="destructive"
              className="w-full mt-auto"
              size="lg"
              onClick={() => {
                removeAccount()
                
              }}
            >
              <IonIcon
                icon={trashBin}
                size="small"
                className="k-color-brand-green mr-2"
                color="#A91D3A"
              />
              Delete Wallet
            </Button>
          )}
        </div>
      </IonContent>

      <BottomTabs />
    </IonPage>
  )
}
