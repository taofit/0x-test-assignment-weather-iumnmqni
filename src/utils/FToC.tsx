export function FahrenheitToCelsius(fahrenheit: number): number {
    return Math.round(((fahrenheit - 32) * 5) / 9);
}