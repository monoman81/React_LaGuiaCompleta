import { useCryptoStore } from "../store"
import { useMemo } from "react"
import Spinner from "./Spinner.tsx";

export default function CryptoPriceDisplay() {
    const cryptoPrice = useCryptoStore(state => state.cryptoPrice)
    const loading = useCryptoStore(state => state.loading)

    const hasResult = useMemo(() => Object.keys(cryptoPrice).length > 0 && !Object.values(cryptoPrice).includes(''), [cryptoPrice])

    return (
        <div className="result-wrapper">
            {loading ? <Spinner /> : hasResult && (
                <>
                    <h2>Cotizacion</h2>
                    <div className="result">
                        <img src={`https://cryptocompare.com/${cryptoPrice.IMAGEURL}`} alt="Crypto Image"/>
                        <div>
                            <p>El precio es de: <span>{cryptoPrice.PRICE}</span></p>
                            <p>Precio mas alto del dia: <span>{cryptoPrice.HIGHDAY}</span></p>
                            <p>Precio mas bajo del dia: <span>{cryptoPrice.LOWDAY}</span></p>
                            <p>Variacion ultimas 24 horas: <span>{cryptoPrice.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima actualizacion: <span>{cryptoPrice.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
