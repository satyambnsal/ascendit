import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { Button } from '../ui/button'
import { BottomTabs } from '../BottomTabs'
import arrow from '../../assets/arrow.svg'

export const GameRules = () => {
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="text-center">
          <div className="flex items-center justify-between px-4">
            <Button
              className="flex items-center gap-2 !pe-2 ps-0"
              variant="outline"
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
            <div>Game Rules</div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="px-4 pt-4 pb-24">
          <h2 className='mt-0'>
            Game Rules
          </h2>
          <ul className='flex flex-col gap-4 list-v1'>
            <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
              <img src={arrow} alt="" />
              <p>
        Twenty random numbers will appear one by one on the screen.
              </p>
              
            </li>

            <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
                <img src={arrow} alt="" />
            Your goal is to find a suitable slot to place each number as it appears.

            </li>

            <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
                <img src={arrow} alt="" />
The numbers must be placed in ascending order from left to right across the available slots.
            </li>

 <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
 <img src={arrow} alt="" />

            If a number cannot be placed in any of the remaining slots, the game will end.
            </li>
            <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
                <img src={arrow} alt="" />
              
To place a number, click or tap on the desired empty slot.
            </li>
 <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
 <img src={arrow} alt="" />
  
If you make a mistake, you can undo your last move by clicking or tapping the "Undo" button.
</li>
 <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
 <img src={arrow} alt="" />
  
The game will keep track of your remaining moves, which represent your score.
</li>
 <li className="border border-muted-500 rounded-md p-4 left-arrow flex items-start gap-2">
 <img src={arrow} alt="" />
  
The fewer moves you have remaining at the end of the game, the higher your ranking will be on the leaderboard.
</li>
  
          </ul>

        <div className='mt-4 border rounded-md p-4'>

          <strong>
          Note: {" "}
          </strong>

        The score is displayed as "Remaining Moves." A lower number of remaining moves indicates a better score and a higher ranking on the leaderboard.
        By following these rules, you'll be able to navigate the game and aim for the highest possible ranking on the leaderboard. Good luck!

        </div>


        </div>
      </IonContent>

      <BottomTabs />
    </IonPage>
  )
}
