import {
    DailyForecastsResponse,
    HourlyResponse,
    CurrentResponse,
    LocationResponse,
} from 'src/types/types'

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY || ''

export const GetWeatherDaily = async (locationKey: string): Promise<DailyForecastsResponse[]> => {
    const apiUrl = `/api/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(
                `Failed to fetch weather data: ${response.statusText}`
            )
        }
        const { DailyForecasts }: { DailyForecasts: DailyForecastsResponse[] } =
            await response.json()

        return DailyForecasts
    } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error // Or return a default/fallback response
    }
}

export const GetWeatherHourly = async (locationKey: string): Promise<HourlyResponse[]> => {
    const apiUrl = `/api/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(
                `Failed to fetch hourly weather data: ${response.statusText}`
            )
        }

        const data: HourlyResponse[] = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Invalid hourly weather data format')
        }

        return data
    } catch (error) {
        console.error('Error fetching hourly weather data:', error)
        throw error // Let caller handle or use a fallback
    }
}

export const GetCurrentWeather = async (locationKey: string): Promise<CurrentResponse> => {
    const apiUrl = `/api/currentconditions/v1/${locationKey}?apikey=${apiKey}`
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(
                `Failed to fetch current weather data: ${response.statusText}`
            )
        }
        const data = await response.json()
        return data[0]
    } catch (error) {
        console.error('Error fetching current weather data:', error)
        throw error // Or return a default/fallback response
    }
}

export const GetGeoLocation = async (lat: number, lon: number): Promise<LocationResponse> => {
    const apiUrl = `/api/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(
                `Failed to fetch location data: ${response.statusText}`
            )
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching location data:', error)
        throw error // Or return a default/fallback response
    }
}

// const transformWeatherDaily = (data: any) => {
//     const transformedData = data.DailyForecasts.map((day: any) => ({
//         datetime: day.Date,
//         icon: day.Day.Icon,
//         temperature: {
//             min: day.Temperature.Minimum.Value,
//             max: day.Temperature.Maximum.Value,
//         },
//     }));

//     return transformedData;
// }
