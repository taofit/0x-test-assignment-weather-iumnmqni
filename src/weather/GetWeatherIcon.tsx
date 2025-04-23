import { Rain } from './Rain'
import { Snow } from './Snow'
import { NightCloudy } from './NightCloudy'
import { Sunny } from './Sunny'
import { JSX } from 'react'
import React from 'react'

const weatherIcons: Record<string, JSX.Element> = {
    Rain: <Rain />,
    Cloudy: <NightCloudy />,
    Sunny: <Sunny />,
    Snow: <Snow />,
}

export const GetWeatherIcon = (iconPhrase: string): JSX.Element => {
    const weatherIconKey = Object.keys(weatherIcons).find((key) =>
        iconPhrase.toLowerCase().includes(key.toLowerCase())
    )

    return (
        weatherIcons[weatherIconKey as keyof typeof weatherIcons] || <Sunny />
    )
}
