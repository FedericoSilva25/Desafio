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

5. API Endpoints 📡
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

6. Estructura del Proyecto 📁

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

7. Decisiones Técnicas 🔧

A. Arquitectura Multi-agente
Separación clara de responsabilidades.
Facilita la adición de nuevos agentes.
Mejor mantenibilidad del código.

B. Manejo de Estado
Sistema de hilos de conversación.
Persistencia de contexto entre mensajes.

Cambio fluido entre agentes.
C. Seguridad y Validación
Validación de variables de entorno.
Manejo de errores tipado.
Respuestas HTTP apropiadas.

D. Testing
Pruebas unitarias para componentes individuales.

Pruebas de integración para flujos completos.
Mocks para servicios externos.

8. Escalabilidad Futura 📈
El proyecto está diseñado para crecer con:


A. Nuevas Integraciones

APIs de vuelos.
Servicios de reserva de hoteles.
Recomendaciones de restaurantes.

B. Mejoras Técnicas

Sistema de caché.
Base de datos para persistencia.
Logging avanzado.

C. Experiencia de Usuario

Interfaz web.
Aplicación móvil.
Soporte multiidioma.

9. Contribuir 🤝
Si deseas contribuir a este proyecto:

Haz un fork del repositorio.
Crea una rama (git checkout -b feature/amazing-feature).
Realiza tus cambios y haz commit (git commit -m 'Add amazing feature').
Empuja tus cambios (git push origin feature/amazing-feature).
Abre un Pull Request.

10. Licencia 📄
MIT

11. Autor ✒️
[David Federico Silva]

---
⌨️ con ❤️ por [David Federico Silva]
