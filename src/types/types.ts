export type DailyForecastsResponse = {
    Date: string;
    Temperature: {
        Minimum: { Value: number; Unit: string };
        Maximum: { Value: number; Unit: string };
    };
    Day: { Icon: number; IconPhrase: string };
    Night: { Icon: number; IconPhrase: string };
};

export type HourlyResponse = {
    DateTime: string;
    WeatherIcon: number;
    IconPhrase: string;
    Temperature: {
        Value: number;
        Unit: string;
    };
};

export type CurrentResponse = {
    WeatherText: string;
    Temperature: {
        Metric: { Value: number; Unit: string };
        Imperial: { Value: number; Unit: string };
    };
    WeatherIcon: number;
    IsDayTime: boolean;
    location?: {
        lat: number;
        lon: number;
        name: string;
    }
    temperatureRange: [number, number];
};

export type LocationResponse = {
    Key: string;
    EnglishName: string;
    Country: { EnglishName: string };
    AdministrativeArea: { EnglishName: string };
    GeoPosition: {
        Latitude: number;
        Longitude: number;
        Elevation: { Metric: { Value: number; Unit: string } };
    };
};

export type Location = {
    lat: number;
    lon: number;
    name: string;
}