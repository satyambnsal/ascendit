import { useEffect, useMemo, useState } from 'react'
import { ERROR_MESSAGES } from '../utils'
import { BurnerManager } from '@dojoengine/create-burner'
import { Account, SignerInterface } from 'starknet'
import { dojoConfig as config } from '../../dojoConfig'
import { useProvider } from './useProvider'
import { Preferences } from '@capacitor/preferences'
import { useAtomValue, useSetAtom } from 'jotai'
import { accountAtom, accountDataAtom } from '../state/atoms'
import { useToast } from '@/components/ui/use-toast'

const setAccountToStorage = async (account: string) => {
  await Preferences.set({
    key: 'primary_accounts',
    value: account,
  })
}

const getAccountFromStorage = async () => {
  const { value } = await Preferences.get({ key: 'primary_accounts' })
  return value
}

const removeAccountFromStorage = async () => {
  await Preferences.remove({ key: 'primary_accounts' })
}

export const useAccounts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [error, setError] = useState<{ isError: boolean; message?: string; errorObject?: unknown }>(
    {
      isError: false,
      message: '',
      errorObject: null,
    }
  )

  const account = useAtomValue(accountAtom)
  const setAccountData = useSetAtom(accountDataAtom)
  const [burnerManager, setBurnerManager] = useState<BurnerManager | null>()
  const { dojoProvider, isLoading: isProviderLoading, error: providerError } = useProvider()

  const getBurnerManager = async () => {
    if (burnerManager) {
      return burnerManager
    }
    if (providerError.isError) {
      setError({ isError: true, message: ERROR_MESSAGES.DOJO_PROVIDER_INIT_FAILED })
      return
    }
    // console.log('provider', dojoProvider)
    const newBurnerManager = new BurnerManager({
      masterAccount: new Account(
        {
          nodeUrl: config.rpcUrl,
        },
        config.masterAddress,
        config.masterPrivateKey
      ),
      accountClassHash: config.accountClassHash,
      rpcProvider: dojoProvider!,
      feeTokenAddress: config.feeTokenAddress,
    })
    await newBurnerManager.init()
    setBurnerManager(newBurnerManager)
    return newBurnerManager
  }

  const masterAccount = useMemo(
    () => new Account(dojoProvider!, config.masterAddress, config.masterPrivateKey, '1'),
    [config.masterAddress, config.masterPrivateKey, dojoProvider]
  )

  const getAccount = async (): Promise<Account | null> => {
    let accountFromStorageStr = await getAccountFromStorage()
    if (!accountFromStorageStr) return null
    try {
      let accountFromStorage: { address: string; signer: SignerInterface } =
        JSON.parse(accountFromStorageStr)
      let account = new Account(
        dojoProvider!,
        accountFromStorage.address,
        accountFromStorage.signer,
        '1'
      )
      setAccountData({ address: accountFromStorage.address, signer: accountFromStorage.signer })
      return account
    } catch (err) {
      console.error(`Failed to parse account from storage`)
      return null
    }
  }

  const createAccount = async (): Promise<Account | null> => {
    setIsLoading(true)
    let burnerManagerLocal = burnerManager
    if (!burnerManagerLocal) {
      burnerManagerLocal = await getBurnerManager()
    }
    let newAccount = await burnerManagerLocal?.create()
    if (newAccount) {
      await setAccountToStorage(
        JSON.stringify({ address: newAccount.address, signer: newAccount.signer })
      )
      // console.log('new account', newAccount)
      setAccountData({ address: newAccount.address, signer: newAccount.signer })
    } else {
      setError({ isError: true, message: 'Failed to create new account from burner' })
    }
    setIsLoading(false)
    toast({
      title: 'Wallet Created successfully',
      description: `We have a new burner wallet with address ${newAccount?.address}`,
    })
    return newAccount || null
  }

  const removeAccount = async () => {
    setAccountData(null)
    removeAccountFromStorage()
    toast({
      title: 'Wallet deleted successfully',
      description: 'We have deleted your wallet',
    })
  }

  useEffect(() => {
    getAccount()
  }, [])

  return {
    getBurnerManager,
    masterAccount,
    getAccount,
    isLoading,
    error,
    account,
    createAccount,
    removeAccount,
  }
}
