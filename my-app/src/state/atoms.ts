import { atom } from 'jotai'
import { Account, RpcProvider, SignerInterface } from 'starknet'

export const dojoProviderAtom = atom<RpcProvider | null>(null)
export const accountDataAtom = atom<{ address: string; signer: SignerInterface } | null>(null)

export const accountAtom = atom<Account | null>((get) => {
  const accountData = get(accountDataAtom)
  const dojoProvider = get(dojoProviderAtom)
  if (!dojoProvider || !accountData?.address) return null
  return new Account(dojoProvider, accountData?.address, (accountData?.signer as any)?.pk, '1')
})
