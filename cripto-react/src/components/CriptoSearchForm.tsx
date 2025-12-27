import { useState } from "react"
import { useCryptoStore } from "../store"
import { currencies } from "../data"
import type { Pair } from "../types";
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {

    const cryptoCurrencies = useCryptoStore(state => state.cryptoCurrencies)
    const fetchData = useCryptoStore(state => state.fetchData)

    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptoCurrency: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(pair).includes('')) {
            setError('Tienes que seleccionar ambas monedas.')
            return
        }
        setError('')
        await fetchData(pair)
    }

    return (
        <form action="" className="form" onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                    <option value="">--Seleccionar Moneda</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="cryptoCurrency">Criptomoneda:</label>
                <select name="cryptoCurrency" id="cryptoCurrency" onChange={handleChange} value={pair.cryptoCurrency}>
                    <option value="">--Seleccionar Criptomoneda</option>
                    {cryptoCurrencies.map(cryptoCurrency => (
                        <option key={cryptoCurrency.CoinInfo.Name} value={cryptoCurrency.CoinInfo.Name}>
                            {cryptoCurrency.CoinInfo.FullName}
                        </option>
                    ))}
                </select>
            </div>
            <input type="submit" value="Cotizar" />
        </form>
    )
}
