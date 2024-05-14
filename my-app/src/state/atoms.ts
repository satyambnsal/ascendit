import { DojoProvider } from '@dojoengine/core'
import { atom } from 'jotai'
import { Account, SignerInterface } from 'starknet'

export const dojoProviderAtom = atom<DojoProvider | null>(null)
export const accountDataAtom = atom<{ address: string; signer: SignerInterface } | null>(null)

export const accountAtom = atom<Account | null>((get) => {
  const accountData = get(accountDataAtom)
  const dojoProvider = get(dojoProviderAtom)
  if (!dojoProvider || !accountData?.address) return null
  return new Account(dojoProvider?.provider, accountData?.address, accountData?.signer, '1')
})
