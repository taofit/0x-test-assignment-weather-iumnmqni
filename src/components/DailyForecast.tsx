import React from 'react'
import { DailyForecastsResponse } from '../types/types'
import { formatWeekday } from '../utils/date'
import { GetTemperature } from '../utils/ParseTemperature'
import { GetWeatherIcon } from '../weather/GetWeatherIcon'
import { Forecast } from 'src/weather/forecast'

interface DailyForecastProps {
    daily: DailyForecastsResponse[]
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
    return (
        <div className="daily">
            <div className="daily-title"><Forecast />5-DAY FORECAST</div>
            <div className="daily-list">
                {daily.length === 0 && (
                    <div className="no-data">No weather data available</div>
                )}
                {daily.length > 0 &&
                    daily.map(
                        ({
                            Date,
                            Temperature: { Minimum, Maximum },
                            Day: { IconPhrase },
                        }) => (
                            <div className="daily-row" key={Date}>
                                <div className="daily-time">
                                    {formatWeekday(Date)}
                                </div>
                                <div className="daily-conditions">
                                    <span className="weather-icon">
                                        {GetWeatherIcon(IconPhrase)}
                                    </span>
                                    <span className="condition">
                                        {IconPhrase}
                                    </span>
                                </div>
                                <div className="daily-range">
                                    <span className="daily-min">
                                        {GetTemperature(Minimum)}°
                                    </span>
                                    <span className="range">
                                        <span className="range-meter" />
                                        <span className="range-current" />
                                    </span>
                                    <span className="daily-max">
                                        {GetTemperature(Maximum)}°
                                    </span>
                                </div>
                            </div>
                        )
                    )}
            </div>
        </div>
    )
}
