import { ConversationService } from '../services/conversationService';
import { DestinationExpert } from '../agents/destinationExpert';
import { LuggageWeatherExpert } from '../agents/luggageWeatherExpert';
import { WeatherService } from '../services/weatherService';
import { ChatOpenAI } from '@langchain/openai';

describe('Integration Tests', () => {
    const model = new ChatOpenAI({ temperature: 0.7 });
    const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY || 'test-key');
    const conversationService = new ConversationService();
    const destinationExpert = new DestinationExpert(model);
    const luggageExpert = new LuggageWeatherExpert(model, weatherService);

    it('should handle a complete travel planning conversation', async () => {
        // Crear thread
        const threadId = conversationService.createThread();

        // Consulta sobre destino
        const destinationMessage = {
            role: 'user' as const,
            content: 'Me gustaría viajar a París',
            context: { destination: 'París' }
        };
        
        conversationService.addMessage(threadId, destinationMessage);
        const destinationInfo = await destinationExpert.getDestinationInfo('París');
        conversationService.addMessage(threadId, {
            role: 'assistant',
            content: destinationInfo
        });

        // Consulta sobre equipaje
        const luggageMessage = {
            role: 'user' as const,
            content: '¿Qué debo llevar para 7 días?',
            context: { duration: 7 }
        };

        conversationService.addMessage(threadId, luggageMessage);
        const packingList = await luggageExpert.getWeatherAndPackingList('París', 7);
        conversationService.addMessage(threadId, {
            role: 'assistant',
            content: packingList
        });

        // Verificar el hilo completo
        const thread = conversationService.getThread(threadId);
        expect(thread.messages).toHaveLength(4);
        expect(thread.messages[0].content).toBe('Me gustaría viajar a París');
        expect(thread.messages[1].content).toBeTruthy();
        expect(thread.messages[2].content).toBe('¿Qué debo llevar para 7 días?');
        expect(thread.messages[3].content).toBeTruthy();
    });
}); 