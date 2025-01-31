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
exports.LuggageWeatherExpert = void 0;
const runnables_1 = require("@langchain/core/runnables");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
class LuggageWeatherExpert {
    constructor(model, weatherService) {
        this.packingPrompt = prompts_1.PromptTemplate.fromTemplate(`
        Como experto en viajes, necesito sugerir una lista de equipaje para un viaje a {destination} 
        con la siguiente información del clima: {weatherInfo}.
        El viaje durará {duration} días.

        Por favor, proporciona una lista detallada de artículos esenciales considerando:
        - El clima y la temperatura
        - La duración del viaje
        - Artículos básicos de higiene
        - Documentos importantes

        Formato deseado:
        Ropa:
        - item 1
        - item 2
        
        Artículos de higiene:
        - item 1
        - item 2
        
        Documentos:
        - item 1
        - item 2
    `);
        this.model = model;
        this.weatherService = weatherService;
    }
    getWeatherAndPackingList(destination, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener información del clima
                const weatherInfo = yield this.weatherService.getWeather(destination);
                // Crear la cadena de procesamiento
                const chain = runnables_1.RunnableSequence.from([
                    this.packingPrompt,
                    this.model,
                    new output_parsers_1.StringOutputParser()
                ]);
                // Ejecutar la cadena con los parámetros
                const response = yield chain.invoke({
                    destination,
                    weatherInfo: JSON.stringify(weatherInfo),
                    duration: duration.toString()
                });
                return response;
            }
            catch (error) {
                console.error('Error al generar lista de equipaje:', error);
                throw new Error('No se pudo generar la lista de equipaje');
            }
        });
    }
    suggestWeatherBasedActivities(weatherInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityPrompt = prompts_1.PromptTemplate.fromTemplate(`
            Dado el siguiente clima: {weatherInfo}
            Sugiere 3-5 actividades apropiadas para estas condiciones meteorológicas.
            Las sugerencias deben ser específicas y considerar la seguridad del viajero.
        `);
            try {
                const chain = runnables_1.RunnableSequence.from([
                    activityPrompt,
                    this.model,
                    new output_parsers_1.StringOutputParser()
                ]);
                return yield chain.invoke({
                    weatherInfo: JSON.stringify(weatherInfo)
                });
            }
            catch (error) {
                console.error('Error al sugerir actividades:', error);
                throw new Error('No se pudieron generar sugerencias de actividades');
            }
        });
    }
}
exports.LuggageWeatherExpert = LuggageWeatherExpert;
