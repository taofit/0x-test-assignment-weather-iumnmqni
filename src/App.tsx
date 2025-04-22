import React, { useEffect, useState } from 'react'
import './style.css'

import { Thunder } from './weather/Thunder'
import { getBackgroundClass } from './utils/background'
import { formatHour, formatWeekday } from './utils/date'
import { Rain } from './weather/Rain'
import {
    GetWeatherDaily,
    GetWeatherHourly,
    GetCurrentWeather,
    GetGeoLocation,
} from './weather/GetWeather'
import {
    DailyForecastsResponse,
    HourlyResponse,
    CurrentResponse,
} from './types/types'

import { currentWeather, hourly, dailyForecast } from './data'

export default function App() {
    const [current, setCurrent] = useState<CurrentResponse>()
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
            const { Key } = locationResponse
            localStorage.setItem('locationKey', Key)
            setLocationKey(Key)

            setCurrent((prev) =>
                prev
                    ? {
                          ...prev,
                          location: { name: Key, lat, lon },
                      }
                    : undefined
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

                setCurrent(current)
                localStorage.setItem('current', JSON.stringify(current))
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
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading Weather Data...</p>
            </div>
        )
    }

    return (
        <div>
            <div className="header">
                <div className="location">
                    {current?.location?.name}
                </div>
                <div className="temp">
                    {current?.Temperature.Metric.Value}{' '}
                    {current?.Temperature.Metric.Unit}
                </div>
                <div className="conditions">
                    {current?.WeatherText}
                    <br />
                    H:{current?.WeatherIcon} L:{current?.WeatherIcon}
                </div>
            </div>

            <div className="forecast">
                <div className="forecast-title">HOURLY FORECAST</div>
                <div className="scroller">
                    <div className="forecast-list">
                        {forecast.map(({ DateTime, Temperature }) => (
                            <div className="forecast-item" key={DateTime}>
                                <span>{formatHour(DateTime)}</span>
                                <span>
                                    <Thunder />
                                </span>
                                <span>
                                    {Temperature.Value} {Temperature.Unit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="daily">
                <div className="daily-title">10-DAY FORECAST</div>
                <div className="daily-list">
                    {daily.map(
                        ({
                            Date,
                            Temperature: { Minimum, Maximum },
                            Day: { Icon, IconPhrase },
                        }) => (
                            <div className="daily-row">
                                <div className="daily-time">
                                    {formatWeekday(Date)}
                                </div>

                                <div className="daily-conditions">
                                    <Rain />
                                    <span className="probability">60%</span>
                                </div>

                                <div className="daily-range">
                                    <span className="daily-min">
                                        {Minimum.Value} {Minimum.Unit}
                                    </span>
                                    <span className="range">
                                        <span className="range-meter" />
                                        <span className="range-current" />
                                    </span>
                                    <span className="daily-max">
                                        {Maximum.Value} {Maximum.Unit}
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
