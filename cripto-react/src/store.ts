import { create } from "zustand/react"
import { devtools } from "zustand/middleware"
import type { CryptoCurrency, CryptoPrice, Pair } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[]
    cryptoPrice: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptoCurrencies: [],
    cryptoPrice: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
        const cryptoCurrencies = await getCryptos()
        set(() => ({
            cryptoCurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const cryptoPrice = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            cryptoPrice,
            loading: false
        }))
    }
})))