// src/agents/destinosAgent.ts
import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

interface DestinationInput {
    destination: string;
}

interface PreferencesInput {
    preferences: string;
}

export class DestinationExpert {
    private model: BaseLanguageModel;

    constructor(model: BaseLanguageModel) {
        this.model = model;
    }

    private destinationPrompt = ChatPromptTemplate.fromTemplate(`
        Como experto en destinos turísticos, proporciona información sobre {destination}.
        Incluye:
        - Descripción breve del lugar
        - Principales atracciones
        - Mejor época para visitar
        - Consejos culturales importantes
    `);

    async getDestinationInfo(destination: string): Promise<string> {
        try {
            const chain = RunnableSequence.from([
                {
                    destination: (input: DestinationInput) => input.destination
                },
                this.destinationPrompt,
                this.model,
                new StringOutputParser()
            ]);

            const result = await chain.invoke({ destination });
            return result;
        } catch (error) {
            console.error('Error al obtener información del destino:', error);
            throw new Error('No se pudo obtener información del destino');
        }
    }

    async suggestDestinations(preferences: string): Promise<string> {
        const suggestPrompt = ChatPromptTemplate.fromTemplate(`
            Basado en las siguientes preferencias: {preferences}
            Sugiere 3 destinos que mejor se adapten.
            Para cada destino, incluye:
            - Nombre y ubicación
            - Por qué coincide con las preferencias
            - Mejor momento para visitar
        `);

        try {
            const chain = RunnableSequence.from([
                {
                    preferences: (input: PreferencesInput) => input.preferences
                },
                suggestPrompt,
                this.model,
                new StringOutputParser()
            ]);

            const result = await chain.invoke({ preferences });
            return result;
        } catch (error) {
            console.error('Error al sugerir destinos:', error);
            throw new Error('No se pudieron generar sugerencias de destinos');
        }
    }
}
  