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
const destinationExpert_1 = require("../agents/destinationExpert");
const luggageWeatherExpert_1 = require("../agents/luggageWeatherExpert");
const weatherService_1 = require("../services/weatherService");
const openai_1 = require("@langchain/openai");
describe('Travel Agents Tests', () => {
    const model = new openai_1.ChatOpenAI({ temperature: 0.7 });
    const weatherService = new weatherService_1.WeatherService(process.env.OPENWEATHER_API_KEY || '');
    describe('DestinationExpert', () => {
        const destinationExpert = new destinationExpert_1.DestinationExpert(model);
        it('should provide destination information', () => __awaiter(void 0, void 0, void 0, function* () {
            const info = yield destinationExpert.getDestinationInfo('Paris');
            expect(info).toBeTruthy();
            expect(typeof info).toBe('string');
        }));
        it('should suggest destinations based on preferences', () => __awaiter(void 0, void 0, void 0, function* () {
            const suggestions = yield destinationExpert.suggestDestinations('playa, relax, presupuesto moderado');
            expect(suggestions).toBeTruthy();
            expect(typeof suggestions).toBe('string');
        }));
    });
    describe('LuggageWeatherExpert', () => {
        const luggageExpert = new luggageWeatherExpert_1.LuggageWeatherExpert(model, weatherService);
        it('should generate packing list', () => __awaiter(void 0, void 0, void 0, function* () {
            const list = yield luggageExpert.getWeatherAndPackingList('Barcelona', 7);
            expect(list).toBeTruthy();
            expect(typeof list).toBe('string');
        }));
    });
});
