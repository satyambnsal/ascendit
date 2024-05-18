import React from 'react'
import clsx from 'clsx'
import { IonSpinner } from '@ionic/react'

export const Spinner = ({
  className,
}: {
  className?: string
}) => {

  return (
    <IonSpinner name="bubbles" className={`text-white w-6 h-6 ${className}`}></IonSpinner>
  )
}
