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

export class TravelAssistantError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'TravelAssistantError';
    }
}
