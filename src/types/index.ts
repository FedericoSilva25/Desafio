export interface Message {
    role: 'user' | 'assistant';
    content: string;
    context?: {
        destination?: string;
        duration?: number;
    };
}

export interface Thread {
    id: string;
    messages: Message[];
    currentAgent: 'destination' | 'luggage_weather';
}

export interface WeatherInfo {
    temperature: number;
    description: string;
    humidity: number;
}

export type ErrorCode = 
    | 'WEATHER_AUTH_ERROR'
    | 'CITY_NOT_FOUND'
    | 'CONFIG_ERROR'
    | 'INVALID_INPUT'
    | 'INVALID_THREAD_ID'
    | 'WEATHER_SERVICE_ERROR';

export class TravelAssistantError extends Error {
    constructor(
        message: string,
        public code: ErrorCode,
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'TravelAssistantError';
    }
}
