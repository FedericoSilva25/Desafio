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
exports.DestinationExpert = void 0;
const runnables_1 = require("@langchain/core/runnables");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
class DestinationExpert {
    constructor(model) {
        this.destinationPrompt = prompts_1.PromptTemplate.fromTemplate(`
        Como experto en destinos turísticos, proporciona información sobre {destination}.
        Incluye:
        - Descripción breve del lugar
        - Principales atracciones
        - Mejor época para visitar
        - Consejos culturales importantes
        
        Si el destino no es específico, sugiere 3 destinos populares que coincidan con la descripción.
    `);
        this.model = model;
    }
    getDestinationInfo(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chain = runnables_1.RunnableSequence.from([
                    this.destinationPrompt,
                    this.model,
                    new output_parsers_1.StringOutputParser()
                ]);
                return yield chain.invoke({ destination });
            }
            catch (error) {
                console.error('Error al obtener información del destino:', error);
                throw new Error('No se pudo obtener información del destino');
            }
        });
    }
    suggestDestinations(preferences) {
        return __awaiter(this, void 0, void 0, function* () {
            const suggestPrompt = prompts_1.PromptTemplate.fromTemplate(`
            Basado en las siguientes preferencias: {preferences}
            Sugiere 3 destinos que mejor se adapten.
            Para cada destino, incluye:
            - Nombre y ubicación
            - Por qué coincide con las preferencias
            - Mejor momento para visitar
        `);
            try {
                const chain = runnables_1.RunnableSequence.from([
                    suggestPrompt,
                    this.model,
                    new output_parsers_1.StringOutputParser()
                ]);
                return yield chain.invoke({ preferences });
            }
            catch (error) {
                console.error('Error al sugerir destinos:', error);
                throw new Error('No se pudieron generar sugerencias de destinos');
            }
        });
    }
}
exports.DestinationExpert = DestinationExpert;
