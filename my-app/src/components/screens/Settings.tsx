import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { arrowBackOutline, logOutOutline, trashBin } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { Button } from '../ui/button'
import { BottomTabs } from '../BottomTabs'
import { useAccounts } from '../../hooks/useAccounts'
import { trimStringWithEllipsis } from '../../utils'

export const Settings = () => {
  const { createAccount, isLoading, account } = useAccounts()
  const history = useHistory()
  return (
    <IonPage>
          <IonHeader>
          <IonToolbar className='text-center'>
            <div className='flex items-center justify-between px-4'>
              <Button 
              className='flex items-center gap-2 !pe-2 ps-0'
              variant="secondary"
              onClick={() => {
                history.push(`/leaderboard`)
              }}>
                <IonIcon
                  icon={arrowBackOutline}
                  size="small"
                  className="k-color-brand-green"
                  color="#A91D3A"
                />
                Go Back
                </Button>
              <div>

           
                Settings
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='px-4 pt-4 pb-24 h-full flex flex-col'>
          {!!account && (
            <>
                <div className="w-full">
                  <h2 className='text-xl'>
                    Welcome, <br />
                    <p className='mt-4'>
                     {trimStringWithEllipsis(account?.address)}
                    </p>
                  </h2>
                  </div>
                  <Button variant="destructive" className='w-full mt-auto' size="lg">

                  <IonIcon
                  icon={trashBin}
                  size="small"
                  className="k-color-brand-green mr-2"
                  color="#A91D3A"
                />
                Delete Wallet
                </Button>       
            </>
              )}

              
               
          </div>
        </IonContent>

        <BottomTabs />
      </IonPage>
  )
}