import React, { useEffect, useState } from 'react'
import './style.css'

import { getBackgroundClass } from './utils/background'
import {
    GetWeatherDaily,
    GetWeatherHourly,
    GetCurrentWeather,
    GetGeoLocation,
} from './weather/GetWeatherData'
import {
    DailyForecastsResponse,
    HourlyResponse,
    CurrentResponse,
    Location,
} from './types/types'
import { Header } from './components/Header'
import { HourlyForecast } from './components/HourlyForecast'
import { DailyForecast } from './components/DailyForecast'
import { Loading } from './components/Loading'

export default function App() {
    const [current, setCurrent] = useState<CurrentResponse | null>(null)
    const [location, setLocation] = useState<Location | null>(null)
    const [forecast, setForecast] = useState<HourlyResponse[]>([])
    const [daily, setDaily] = useState<DailyForecastsResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [locationKey, setLocationKey] = useState<string | null>(null)

    useEffect(() => {
        const loadLocalStorage = () => {
            setLoading(true)
            const forecast = localStorage.getItem('forecast')
            const daily = localStorage.getItem('daily')
            const current = localStorage.getItem('current')
            const locationKey = localStorage.getItem('locationKey')
            const location = localStorage.getItem('location')

            try {
                if (forecast && forecast !== 'undefined') {
                    setForecast(JSON.parse(forecast))
                }
                if (daily && daily !== 'undefined') {
                    setDaily(JSON.parse(daily))
                }

                if (current && current !== 'undefined') {
                    setCurrent(JSON.parse(current))
                }
                if (locationKey && locationKey !== 'undefined') {
                    setLocationKey(JSON.parse(locationKey))
                }
                if (location && location !== 'undefined') {
                    setLocation(JSON.parse(location))
                }
            } catch (error) {
                console.error('Error parsing local storage data:', error)
            } finally {
                setLoading(false) // Set loading to false after attempting to load data
            }
        }
        loadLocalStorage()
    }, [])

    useEffect(() => {
        const fetchLocation = async (lat: number, lon: number) => {
            const locationResponse = await GetGeoLocation(lat, lon)
            const { Key, EnglishName } = locationResponse
            localStorage.setItem('locationKey', Key)
            setLocationKey(Key)

            setLocation({ name: EnglishName, lat, lon })
            localStorage.setItem(
                'location',
                JSON.stringify({ name: EnglishName, lat, lon })
            )
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude: lat, longitude: lon } = pos.coords
            fetchLocation(lat, lon)
        })
    }, [])

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!locationKey) {
                return
            }
            setLoading(true) // Set loading to true before fetching data
            try {
                GetGeoLocation
                const [daily, forecast, current] = await Promise.all([
                    GetWeatherDaily(locationKey),
                    GetWeatherHourly(locationKey),
                    GetCurrentWeather(locationKey),
                ])
                setDaily(daily)
                localStorage.setItem('daily', JSON.stringify(daily))

                setForecast(forecast)
                localStorage.setItem('forecast', JSON.stringify(forecast))

                setCurrent({
                    ...current,
                    location: location || undefined,
                    temperatureRange: [
                        daily[0].Temperature.Minimum.Value,
                        daily[0].Temperature.Maximum.Value,
                    ],
                })
                localStorage.setItem(
                    'current',
                    JSON.stringify({ ...current, location: current.location })
                )
            } catch (error) {
                console.error('Error fetching weather data:', error)
            } finally {
                setLoading(false) // Set loading to false after data is fetched
            }

            setLoading(false) // Set loading to false after data is fetched
        }

        fetchWeatherData()
    }, [locationKey])

    useEffect(() => {
        const backgroundClass = getBackgroundClass()
        const rootElement = document.getElementById('root')

        if (rootElement && rootElement.className !== backgroundClass) {
            rootElement.className = backgroundClass
        }
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <Header current={current} />
            <HourlyForecast forecast={forecast} />
            <DailyForecast daily={daily} />
        </div>
    )
}
