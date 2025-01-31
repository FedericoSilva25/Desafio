import { ConversationService } from '../services/conversationService';
import { WeatherService } from '../services/weatherService';
import axios from 'axios';

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Services Tests', () => {
    describe('ConversationService', () => {
        const conversationService = new ConversationService();

        it('should create new thread', () => {
            const threadId = conversationService.createThread();
            expect(threadId).toBeTruthy();
        });

        it('should add and retrieve messages', () => {
            const threadId = conversationService.createThread();
            const message = {
                role: 'user' as const,
                content: 'Hola'
            };

            conversationService.addMessage(threadId, message);
            const thread = conversationService.getThread(threadId);
            expect(thread.messages).toHaveLength(1);
            expect(thread.messages[0].content).toBe('Hola');
        });
    });

    describe('WeatherService', () => {
        const weatherService = new WeatherService('fake-api-key');

        beforeEach(() => {
            mockedAxios.get.mockResolvedValue({
                data: {
                    main: { temp: 20, humidity: 65 },
                    weather: [{ description: 'soleado' }]
                }
            });
        });

        it('should fetch weather information', async () => {
            const weather = await weatherService.getWeather('Madrid');
            expect(weather).toHaveProperty('temperature');
            expect(weather).toHaveProperty('description');
            expect(weather).toHaveProperty('humidity');
        });
    });
});
