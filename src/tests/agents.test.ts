import { DestinationExpert } from '../agents/destinationExpert';
import { LuggageWeatherExpert } from '../agents/luggageWeatherExpert';
import { WeatherService } from '../services/weatherService';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage } from '@langchain/core/messages';

// Mock de ChatOpenAI
jest.mock('@langchain/openai', () => ({
    ChatOpenAI: jest.fn().mockImplementation(() => ({
        invoke: jest.fn().mockResolvedValue([new AIMessage({ content: 'Respuesta simulada de prueba' })]),
        call: jest.fn().mockResolvedValue([new AIMessage({ content: 'Respuesta simulada de prueba' })])
    }))
}));

// Mock de RunnableSequence
jest.mock('@langchain/core/runnables', () => ({
    RunnableSequence: {
        from: jest.fn().mockImplementation(() => ({
            invoke: jest.fn().mockResolvedValue('Respuesta simulada de prueba')
        }))
    }
}));

// Mock de WeatherService
jest.mock('../services/weatherService', () => ({
    WeatherService: jest.fn().mockImplementation(() => ({
        getWeather: jest.fn().mockResolvedValue({
            temperature: 20,
            description: 'soleado',
            humidity: 65
        })
    }))
}));

describe('Travel Agents Tests', () => {
    const model = new ChatOpenAI({ temperature: 0.7 });
    const weatherService = new WeatherService('fake-key');
    
    describe('DestinationExpert', () => {
        const destinationExpert = new DestinationExpert(model);

        it('should provide destination information', async () => {
            const info = await destinationExpert.getDestinationInfo('Paris');
            expect(info).toBeTruthy();
            expect(typeof info).toBe('string');
        });

        it('should suggest destinations based on preferences', async () => {
            const suggestions = await destinationExpert.suggestDestinations('playa, relax, presupuesto moderado');
            expect(suggestions).toBeTruthy();
            expect(typeof suggestions).toBe('string');
        });
    });

    describe('LuggageWeatherExpert', () => {
        const luggageExpert = new LuggageWeatherExpert(model, weatherService);

        it('should generate packing list', async () => {
            const list = await luggageExpert.getWeatherAndPackingList('Barcelona', 7);
            expect(list).toBeTruthy();
            expect(typeof list).toBe('string');
        });
    });
});
