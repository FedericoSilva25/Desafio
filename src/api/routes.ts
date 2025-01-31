import { Router } from 'express';
import { DestinationExpert } from '../agents/destinationExpert';
import { LuggageWeatherExpert } from '../agents/luggageWeatherExpert';
import { ConversationService } from '../services/conversationService';
import { WeatherService } from '../services/weatherService';
import { config } from '../config';
import { ChatOpenAI } from '@langchain/openai';

const router = Router();

// Inicializar servicios
const model = new ChatOpenAI({ temperature: 0.7 });
const weatherService = new WeatherService(config.openWeatherApiKey);
const conversationService = new ConversationService();
const destinationExpert = new DestinationExpert(model);
const luggageWeatherExpert = new LuggageWeatherExpert(model, weatherService);

router.post('/chat', async (req, res) => {
    try {
        const { message, threadId: existingThreadId } = req.body;
        
        // Crear o recuperar hilo de conversación
        const threadId = existingThreadId || conversationService.createThread();
        const thread = conversationService.getThread(threadId);

        // Agregar mensaje del usuario
        conversationService.addMessage(threadId, {
            role: 'user',
            content: message,
            context: req.body.context
        });

        // Determinar qué agente debe responder
        let response: string;
        if (message.toLowerCase().includes('clima') || message.toLowerCase().includes('equipaje')) {
            conversationService.switchAgent(threadId, 'luggage_weather');
            const destination = thread.messages[0]?.context?.destination || 'destino no especificado';
            response = await luggageWeatherExpert.getWeatherAndPackingList(destination, 7);
        } else {
            conversationService.switchAgent(threadId, 'destination');
            response = await destinationExpert.getDestinationInfo(message);
        }

        // Agregar respuesta del asistente
        conversationService.addMessage(threadId, {
            role: 'assistant',
            content: response
        });

        res.json({
            threadId,
            response,
            currentAgent: thread.currentAgent
        });

    } catch (error) {
        console.error('Error en el endpoint de chat:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export { router };
