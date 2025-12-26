import { ChangeEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import type { SearchState } from "../../types"
import Alert from "../Alert/Alert"

type FormProps = {
    fetchWeather: (search: SearchState) => Promise<void>
}

export default function Form({fetchWeather}: FormProps) {

    const [search, setSearch] = useState<SearchState>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligarios')
            return
        }
        await fetchWeather(search)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>Todos los campos son obligatorios</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input type="text"
                       id="city"
                       name="city"
                       placeholder="Ciudad"
                       value={search.city}
                       onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Pais:</label>
                <select name="country" id="country" value={search.country} onChange={handleChange}>
                    <option value="">-- Selecciona Pais</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input type="submit" value="Consultar Clima" className={styles.submit} />
        </form>
    )
}
