"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const destinationExpert_1 = require("../agents/destinationExpert");
const luggageWeatherExpert_1 = require("../agents/luggageWeatherExpert");
const conversationService_1 = require("../services/conversationService");
const weatherService_1 = require("../services/weatherService");
const config_1 = require("../config");
const openai_1 = require("@langchain/openai");
const router = (0, express_1.Router)();
exports.router = router;
// Inicializar servicios
const model = new openai_1.ChatOpenAI({ temperature: 0.7 });
const weatherService = new weatherService_1.WeatherService(config_1.config.openWeatherApiKey);
const conversationService = new conversationService_1.ConversationService();
const destinationExpert = new destinationExpert_1.DestinationExpert(model);
const luggageWeatherExpert = new luggageWeatherExpert_1.LuggageWeatherExpert(model, weatherService);
router.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
        let response;
        if (message.toLowerCase().includes('clima') || message.toLowerCase().includes('equipaje')) {
            conversationService.switchAgent(threadId, 'luggage_weather');
            const destination = ((_b = (_a = thread.messages[0]) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.destination) || 'destino no especificado';
            response = yield luggageWeatherExpert.getWeatherAndPackingList(destination, 7);
        }
        else {
            conversationService.switchAgent(threadId, 'destination');
            response = yield destinationExpert.getDestinationInfo(message);
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
    }
    catch (error) {
        console.error('Error en el endpoint de chat:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}));
