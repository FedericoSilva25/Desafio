import express from 'express';
import { ConversationService } from '../services/conversationService';
import { DestinationExpert } from '../agents/destinationExpert';
import { LuggageWeatherExpert } from '../agents/luggageWeatherExpert';
import { WeatherService } from '../services/weatherService';
import { ChatOpenAI } from '@langchain/openai';
import { config } from '../config';
import { TravelAssistantError } from '../types';

const router = express.Router();
const model = new ChatOpenAI({ temperature: 0.7 });
const weatherService = new WeatherService(config.openWeatherApiKey);
const conversationService = new ConversationService();
const destinationExpert = new DestinationExpert(model);
const luggageExpert = new LuggageWeatherExpert(model, weatherService);

router.post('/chat', async (req, res) => {
    try {
        const { message, threadId: existingThreadId, context } = req.body;

        // Validación de entrada
        if (!message || typeof message !== 'string') {
            throw new TravelAssistantError(
                'El mensaje es requerido y debe ser texto',
                'INVALID_INPUT',
                400
            );
        }

        if (existingThreadId && typeof existingThreadId !== 'string') {
            throw new TravelAssistantError(
                'El threadId debe ser un string válido',
                'INVALID_THREAD_ID',
                400
            );
        }

        // Crear o recuperar thread
        const threadId = existingThreadId || conversationService.createThread();
        const thread = conversationService.getThread(threadId);

        // Agregar mensaje del usuario
        conversationService.addMessage(threadId, {
            role: 'user',
            content: message,
            context
        });

        // Determinar y ejecutar agente apropiado
        let response: string;
        if (context?.destination && !context?.duration) {
            response = await destinationExpert.getDestinationInfo(context.destination);
            thread.currentAgent = 'destination';
        } else if (context?.destination && context?.duration) {
            response = await luggageExpert.getWeatherAndPackingList(context.destination, context.duration);
            thread.currentAgent = 'luggage_weather';
        } else {
            response = await destinationExpert.suggestDestinations(message);
            thread.currentAgent = 'destination';
        }

        // Agregar respuesta del bot
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
        console.error('Error en el chat:', error);
        if (error instanceof TravelAssistantError) {
            res.status(error.statusCode).json({
                error: 'Error procesando la solicitud',
                message: error.message,
                code: error.code
            });
        } else {
            res.status(500).json({
                error: 'Error interno del servidor',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
});

export default router;
