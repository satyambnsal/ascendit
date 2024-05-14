import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from '@ionic/react'
import {
  ActivityData,
  CapacitorHealthkit,
  OtherData,
  QueryOutput,
  SampleNames,
  SleepData,
} from 'capacitor-healthkit-dojo'
import { useState } from 'react'
import { getStartAndEndOfDay } from '../../utils'

const READ_PERMISSIONS = ['steps', 'distance']

/**
   * 
   *totalFlightsClimbed: number;
    totalSwimmingStrokeCount: number;
    totalEnergyBurned: number;
    totalDistance: number;
    workoutActivityId: number;
    workoutActivityName: string;
   */

export const GameScreen = () => {
  const [totalSteps, setTotalSteps] = useState(0)
  const requestAuthorization = async (): Promise<void> => {
    try {
      await CapacitorHealthkit.requestAuthorization({
        all: [''],
        read: READ_PERMISSIONS,
        write: [''],
      })
    } catch (error) {
      console.error('[HealthKitService] Error getting Authorization:', error)
    }
  }
  const getActivityData = async (): Promise<QueryOutput<ActivityData> | undefined> => {
    try {
      const { startDate, endDate } = getStartAndEndOfDay()
      const queryOptions = {
        sampleName: SampleNames.STEP_COUNT,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 0,
      }

      const response = await CapacitorHealthkit.queryHKitSampleType<ActivityData>(queryOptions)
      // console.log(response)
      const totalStepsData = response.resultData
        .filter((results) => (results as any).unitName === 'count')
        .reduce((prevSteps, obj) => prevSteps + (obj as any).value, 0)
      setTotalSteps(totalStepsData)
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={requestAuthorization}>Request Authorization</IonButton>
        <IonButton
          onClick={() => {
            getActivityData()
          }}
        >
          Get Data
        </IonButton>

        <div>
          <div>
            <div>Total steps: {totalSteps}</div>
          </div>
        </div>
        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Total Steps Count</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText>
              <h1>{totalSteps}</h1>
            </IonText>
            <IonButton disabled={true}>Claim {totalSteps} FRT token</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}
