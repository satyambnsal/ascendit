import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { arrowBackOutline, chatbox, trashBin } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { Button } from '../ui/button'
import { BottomTabs } from '../BottomTabs'
import { useAccounts } from '../../hooks/useAccounts'
import { trimStringWithEllipsis } from '../../utils'
import { Spinner } from '@/components/Spinner'
import { ScoreTable } from '../ScoreTable'

export const Settings = () => {
  const { account, removeAccount, createAccount, isLoading } = useAccounts()
  const history = useHistory()
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
            <div className="w-full mb-8">
              <h2 className="text-xl">
                Welcome,
                <span className="pl-1">{trimStringWithEllipsis(account?.address)}</span>
              </h2>
            </div>
          ) : (
            <Button
              onClick={createAccount}
              className="min-h-12 flex items-center justify-center max-w-80 w-full"
              size="lg"
            >
              {!!isLoading && <Spinner className="w-6" />}
              {!isLoading && <span className="">Create New Wallet</span>}
            </Button>
          )}

          {account?.address && (
            <Button
              variant="destructive"
              className="w-full mb-8 min-h-12"
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

          <Button size="lg" className="w-full mb-8 min-h-12 p-0">
            <a href="https://t.me/satyambnsal" className='w-full h-full text-inherit flex items-center justify-center' target='_blank'>

            <IonIcon
                icon={chatbox}
                size="small"
                className="k-color-brand-green mr-2"
                color="#A91D3A"
              />
           Support Or Feedback
            </a>
          </Button>
          {account?.address && (
            <>
              <ScoreTable type="player" title="Your Games" address={account.address} />
            </>
          )}
        </div>
      </IonContent>

      <BottomTabs />
    </IonPage>
  )
}
