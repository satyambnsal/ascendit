import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
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
          <div className='px-4 pt-4 pb-24'>
            Settings
            {!!account && (
                <div className="w-full">
                  <Button onClick={() => {history.push('/leaderboard')}} className='min-h-[40px] min-w-[164px]'>
                    {trimStringWithEllipsis(account?.address)}
                  </Button>
                </div>
              )}
          </div>
        </IonContent>

        <BottomTabs />
      </IonPage>
  )
}