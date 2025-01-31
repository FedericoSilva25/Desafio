import { WeatherInfo } from '../types';
import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

interface PackingInput {
    destination: string;
    duration: number;
}

interface WeatherActivityInput {
    weatherInfo: WeatherInfo;
}

export class LuggageWeatherExpert {
    private model: BaseLanguageModel;
    private weatherService: any;

    constructor(model: BaseLanguageModel, weatherService: any) {
        this.model = model;
        this.weatherService = weatherService;
    }

    private packingPrompt = ChatPromptTemplate.fromTemplate(`
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

    async getWeatherAndPackingList(destination: string, duration: number): Promise<string> {
        try {
            const weatherInfo: WeatherInfo = await this.weatherService.getWeather(destination);

            const chain = RunnableSequence.from([
                {
                    destination: () => destination,
                    weatherInfo: () => JSON.stringify(weatherInfo),
                    duration: () => duration.toString()
                },
                this.packingPrompt,
                this.model,
                new StringOutputParser()
            ]);

            const result = await chain.invoke({});
            return result;
        } catch (error) {
            console.error('Error al generar lista de equipaje:', error);
            throw new Error('No se pudo generar la lista de equipaje');
        }
    }

    async suggestWeatherBasedActivities(weatherInfo: WeatherInfo): Promise<string> {
        const activityPrompt = ChatPromptTemplate.fromTemplate(`
            Dado el siguiente clima: {weatherInfo}
            Sugiere 3-5 actividades apropiadas para estas condiciones meteorológicas.
            Las sugerencias deben ser específicas y considerar la seguridad del viajero.
        `);

        try {
            const chain = RunnableSequence.from([
                {
                    weatherInfo: () => JSON.stringify(weatherInfo)
                },
                activityPrompt,
                this.model,
                new StringOutputParser()
            ]);

            const result = await chain.invoke({});
            return result;
        } catch (error) {
            console.error('Error al sugerir actividades:', error);
            throw new Error('No se pudieron generar sugerencias de actividades');
        }
    }
}