import { Rain } from './Rain'
import { Snow } from './Snow'
import { NightCloudy } from './NightCloudy'
import { Sunny } from './Sunny'
import { DefaultWeather } from './WeatherDefault'
import { Windy } from './Windy'
import { Clear } from './Clear'
import { JSX } from 'react'
import React from 'react'

const weatherIcons: Record<string, JSX.Element> = {
    Rain: <Rain />,
    Cloud: <NightCloudy />,
    Sunny: <Sunny />,
    Snow: <Snow />,
    Windy: <Windy />,
    Clear: <Clear />,
}

export const GetWeatherIcon = (iconPhrase: string): JSX.Element => {
    const weatherIconKey = Object.keys(weatherIcons).find((key) =>
        iconPhrase.toLowerCase().includes(key.toLowerCase())
    )
    if (!weatherIconKey) {
        return <DefaultWeather /> // Default icon if no match is found
    }

    return weatherIcons[weatherIconKey];
}
