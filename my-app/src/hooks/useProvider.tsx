import { DojoProvider } from '@dojoengine/core'
import { atom, useAtom } from 'jotai'
import { dojoConfig } from '../../dojoConfig'
import { useEffect, useState } from 'react'
import { ERROR_MESSAGES } from '../utils'
import { dojoProviderAtom } from '../state/atoms'

export const useProvider = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<{ isError: boolean; message?: string; errorObject?: unknown }>(
    {
      isError: false,
      message: '',
      errorObject: null,
    }
  )
  const [dojoProvider, setDojoProvider] = useAtom(dojoProviderAtom)
  useEffect(() => {
    setIsLoading(true)
    if (!dojoProvider) {
      try {
        const provider = new DojoProvider(dojoConfig.manifest, dojoConfig.rpcUrl)
        setDojoProvider(provider)
        setIsLoading(false)
        setError({ isError: false })
      } catch (err) {
        setIsLoading(false)
        setError({
          isError: true,
          message: ERROR_MESSAGES.DOJO_PROVIDER_INIT_FAILED,
          errorObject: err,
        })
      }
    } else {
      setIsLoading(false)
      setError({ isError: false })
    }
  }, [])

  return { dojoProvider, isLoading, error }
}
