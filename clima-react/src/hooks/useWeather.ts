import axios from "axios"
import type { SearchState } from "../types"
//import { object, string, number, InferOutput, parse } from "valibot"
import { z } from "zod"
import { useMemo, useState } from "react";

//Type Guard or Assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

//Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather>

//Valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })

// type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min:0
    }
}

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchState) => {
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            //console.log(geoURL)
            const { data } = await axios.get(geoURL)

            if (!data[0]) {
                setNotFound(true)
                return
            }

            setNotFound(false)
            //console.log(data)
            const lat = data[0].lat
            const lon = data[0].lon
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            //Type Cast
            // const { data:dataW } = await axios<Weather>(weatherURL)
            // console.log(dataW)

            //Type Guard
            // const { data: dataW } = await axios<Weather>(weatherURL)
            // const result = isWeatherResponse(dataW)
            // if (result) {
            //
            // }

            //Zod
            const { data: dataW } = await axios<Weather>(weatherURL)
            const result = Weather.safeParse(dataW)
            if (result.success) {
                setWeather(result.data)
            }
            else {
                console.log('Response not valid')
            }

            //Validbot
            // const { data: dataW } = await axios<Weather>(weatherURL)
            // const result = parse(WeatherSchema, dataW)
            // console.log(result)

        }
        catch(error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}