import axios from 'axios';
import { WeatherInfo } from '../types';
import { TravelAssistantError } from '../types';

export class WeatherService {
    private apiKey: string;
    private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getWeather(city: string): Promise<WeatherInfo> {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });

            return {
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                humidity: response.data.main.humidity
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new TravelAssistantError(
                        'Error de autenticación con la API del clima',
                        'WEATHER_AUTH_ERROR',
                        401
                    );
                }
                if (error.response?.status === 404) {
                    throw new TravelAssistantError(
                        'Ciudad no encontrada',
                        'CITY_NOT_FOUND',
                        404
                    );
                }
            }
            throw new TravelAssistantError(
                'Error al obtener información del clima',
                'WEATHER_SERVICE_ERROR',
                500
            );
        }
    }
}
