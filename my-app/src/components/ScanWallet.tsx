import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Ocr, TextDetection } from '@capacitor-community/image-to-text'
import { useState } from 'react'

export const ScanWallet = () => {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [textDetected, setTextDetected] = useState<TextDetection[] | []>([])
  const handleTakePhoto = async () => {
    try {
      // const currentPermission = await Camera.checkPermissions()
      // if(currentPermission.camera === 'denied') {
      await Camera.requestPermissions({ permissions: ['camera'] })
      // }

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      })
      // console.log('photo', photo)
      setPhoto(photo)
      const data = await Ocr.detectText({ filename: photo.path || '' })
      setTextDetected(data.textDetections)
    } catch (err) {
      console.error('failed to call photo api', err)
    }
  }

  return (
    <div>
      <button onClick={handleTakePhoto}>Take Photo</button>
      <h1> Detected text</h1>
      <ul>{textDetected && textDetected.map((detection) => <li> {detection.text}</li>)}</ul>
    </div>
  )
}
