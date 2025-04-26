import React from 'react'
import { HourlyResponse } from '../types/types'

import { formatHour } from '../utils/date'
import { GetTemperature } from '../utils/ParseTemperature'
import { GetWeatherIcon } from '../weather/GetWeatherIcon'

interface HourlyForecastProps {
    forecast: HourlyResponse[]
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
    return (
        <div className="forecast">
            <div className="forecast-title">HOURLY FORECAST</div>
            <div className="scroller">
                <div className="forecast-list">
                    {forecast.length === 0 && (
                        <div className="no-data">No weather data available</div>
                    )}
                    {forecast.length > 0 && forecast.map(({ DateTime, Temperature, IconPhrase }) => (
                        <div className="forecast-item" key={DateTime}>
                            <span>{formatHour(DateTime)}</span>
                            <span>{GetWeatherIcon(IconPhrase)}</span>
                            <span>
                                {GetTemperature(Temperature)}°
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
