import { HourlyResponse } from '../types/types'

type Temperature = HourlyResponse['Temperature'];

export const FahrenheitToCelsius = (fahrenheit: number): number => {
    return Math.round(((fahrenheit - 32) * 5) / 9);
}

export const GetTemperature = (temperature: Temperature) => {
    if (temperature.Unit === 'F') {
        return FahrenheitToCelsius(temperature.Value);
    }
    return temperature.Value;
};