import dotenv from 'dotenv';
import { TravelAssistantError } from './types';

dotenv.config();

const requiredEnvVars = ['OPENAI_API_KEY', 'OPENWEATHER_API_KEY'] as const;

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new TravelAssistantError(
            `Missing required environment variable: ${envVar}`,
            'CONFIG_ERROR',
            500
        );
    }
}

export const config = {
    openAiApiKey: process.env.OPENAI_API_KEY!,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY!,
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
} as const;
