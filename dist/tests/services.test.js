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
const conversationService_1 = require("../services/conversationService");
const weatherService_1 = require("../services/weatherService");
describe('Services Tests', () => {
    describe('ConversationService', () => {
        const conversationService = new conversationService_1.ConversationService();
        it('should create new thread', () => {
            const threadId = conversationService.createThread();
            expect(threadId).toBeTruthy();
        });
        it('should add and retrieve messages', () => {
            const threadId = conversationService.createThread();
            const message = {
                role: 'user',
                content: 'Hola'
            };
            conversationService.addMessage(threadId, message);
            const thread = conversationService.getThread(threadId);
            expect(thread.messages).toHaveLength(1);
            expect(thread.messages[0].content).toBe('Hola');
        });
    });
    describe('WeatherService', () => {
        const weatherService = new weatherService_1.WeatherService(process.env.OPENWEATHER_API_KEY || '');
        it('should fetch weather information', () => __awaiter(void 0, void 0, void 0, function* () {
            const weather = yield weatherService.getWeather('Madrid');
            expect(weather).toHaveProperty('temperature');
            expect(weather).toHaveProperty('description');
            expect(weather).toHaveProperty('humidity');
        }));
    });
});
