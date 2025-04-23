import React from 'react'
import { CurrentResponse } from '../types/types'
import { FahrenheitToCelsius } from '../utils/FToC'

type HeaderProps = {
    current: CurrentResponse | null
}

export const Header: React.FC<HeaderProps> = ({ current }) => (
    <div className="header">
        <div className="location">{current?.location?.name}</div>
        <div className="temp">
            {current?.Temperature.Metric.Value}°
        </div>
        <div className="conditions">
            {current?.WeatherText}
            <br />
            {current?.temperatureRange ? (
                <>
                    H:{FahrenheitToCelsius(current.temperatureRange[1])}°
                    L:{FahrenheitToCelsius(current.temperatureRange[0])}°
                    <br />
                </>
            ) : null}
        </div>
    </div>
)
