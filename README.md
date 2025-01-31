Desafío de Asistente de Viajes - Sherpa

1. Introducción 🚀
Este proyecto tiene como objetivo crear un prototipo de un asistente digital básico para ayudar a los usuarios a planificar sus viajes. El asistente será escalable y se desarrollará utilizando tecnologías modernas como TypeScript, Express.js, LangGraph y OpenWeather API.

2. Requisitos previos 🔧
Antes de comenzar, asegúrate de tener instalado:

Node.js (versión 16 o superior).
npm o yarn para la gestión de dependencias.
Una cuenta en OpenAI para obtener tu clave API.
Una cuenta en OpenWeatherMap para obtener tu clave API.

3. Instalación 💻
Clona el repositorio:

bash
git clone https://github.com/FedericoSilva25/Desafio
cd desafio
Instala las dependencias:

bash
npm install

Configura las variables de entorno en el archivo .env (si no existe, créalo):

env
OPENAI_API_KEY=tu_clave_de_openai
OPENWEATHER_API_KEY=tu_clave_de_openweather
PORT=3000
NODE_ENV=development

4. Uso 🚀
Desarrollo
Para ejecutar el servidor en modo desarrollo:

bash
npm run dev

Producción
Para compilar el proyecto y ejecutarlo en producción:

bash
npm run build
npm start

Pruebas
Para ejecutar las pruebas del proyecto:

bash
npm test

5. Ejemplos de Uso 🎯

Ver examples.md para ejemplos detallados de uso de la API.

6. API Endpoints 📡
POST /api/chat
Este es el endpoint principal para interactuar con el asistente.


Request Body
json
{
  "message": "Quiero viajar a París",
  "threadId": "opcional-para-continuar-conversacion",
  "context": {
    "destination": "París",
    "duration": 7
  }
}

message: El mensaje del usuario para el asistente.
threadId: Usado para mantener la continuidad de la conversación (si ya existe un hilo anterior).
context: Información adicional sobre el viaje, como el destino y la duración.

Response
json
{
  "threadId": "uuid-generado",
  "response": "Información sobre París...",
  "currentAgent": "destination"
}

threadId: Identificador del hilo de conversación.
response: La respuesta generada por el bot, según el mensaje del usuario.
currentAgent: El agente que está manejando la conversación actual (por ejemplo, destination).

7. Estructura del Proyecto 📁

src/
├── agents/               # Agentes especializados
│   ├── destinationExpert.ts
│   └── luggageWeatherExpert.ts
├── api/                  # Rutas y controladores

│   └── routes.ts
├── services/             # Servicios
│   ├── conversationService.ts
│   └── weatherService.ts
├── types/                # Definiciones de tipos
│   └── index.ts
├── tests/                # Pruebas
│   ├── agents.test.ts
│   ├── integration.test.ts
│   └── services.test.ts
├── config.ts             # Configuración
└── app.ts                # Punto de entrada

8. Decisiones Técnicas 🔧

Desafíos y Soluciones Técnicas 🛠️
A. Integración con LangChain

Uno de los principales desafíos fue la implementación correcta del RunnableSequence de LangChain:

Desafío: Los tipos y la documentación de LangChain eran limitados para mi caso de uso.
Solución: Implementé una estructura personalizada de transformadores que permite un flujo de datos más predecible y tipado.

B. Manejo de Contexto en Conversaciones

Desafío: Mantener el contexto entre diferentes mensajes y agentes sin perder información crucial.

Solución: Desarrollé un sistema de hilos (Thread) con un servicio dedicado (ConversationService) que mantiene el estado y permite cambios fluidos entre agentes.

C. Integración con OpenWeather API

Desafío: Manejar diferentes tipos de errores y respuestas de la API externa.
Solución: Implementé un sistema de errores tipados (TravelAssistantError) que traduce los errores externos a mensajes significativos para el usuario.

D. Testing de Componentes con IA

Desafío: Crear tests significativos para componentes que dependen de IA.
Solución: Desarrollé un sistema de mocks que simula respuestas de IA manteniendo la coherencia en las pruebas.

E. Arquitectura Multi-agente

Desafío: Coordinar múltiples agentes especializados manteniendo el código mantenible.
Solución: Implementé una arquitectura modular donde cada agente tiene responsabilidades claramente definidas y una interfaz consistente.


Decisiones de Diseño Clave

A. Tipado Estricto

Uso extensivo de TypeScript para prevenir errores en tiempo de compilación.

Uso extensivo de TypeScript para prevenir errores en tiempo de compilación.
Interfaces y tipos personalizados para todas las estructuras de datos.

B. Manejo de Errores

Sistema centralizado de errores con códigos específicos.
Transformación de errores técnicos en mensajes amigables para el usuario.

C. Estructura Modular

Separación clara de responsabilidades entre agentes.
Servicios independientes para funcionalidades específicas.
Fácil extensibilidad para nuevas características.

D. Testing

Tests unitarios para componentes individuales.
Tests de integración para flujos completos.
Mocks personalizados para servicios externos.

Mejoras Futuras Consideradas

A. Optimización de Rendimiento

Implementación de caché para respuestas comunes.
Sistema de rate limiting para APIs externas.

B. Escalabilidad

Preparación para microservicios.
Sistema de colas para procesamiento asíncrono.

C. Monitoreo

Sistema de logging más detallado.
Métricas de rendimiento y uso.

D. Contribuir 🤝

Si deseas contribuir a este proyecto:

Haz un fork del repositorio.
Crea una rama (git checkout -b feature/amazing-feature).
Realiza tus cambios y haz commit (git commit -m 'Add amazing feature').
Empuja tus cambios (git push origin feature/amazing-feature).
Abre un Pull Request.

9. Licencia 📄
MIT

10. Autor ✒️
[David Federico Silva]

-----------------------------------------------------------------------------


⌨️ con ❤️ por [David Federico Silva]
