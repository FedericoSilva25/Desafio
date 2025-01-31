Ejemplo 1: Consulta de Destino

Request:

bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{
  "message": "Quiero viajar a París",
  "context": {
    "destination": "París"
  }
}'

Response:

json
{
  "threadId": "123e4567-e89b-12d3-a456-426614174000",
  "response": "París es una ciudad...",
  "currentAgent": "destination"
}

Ejemplo 2: Consulta de Equipaje

Request:

bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{
  "message": "¿Qué debo llevar?",
  "threadId": "123e4567-e89b-12d3-a456-426614174000",
  "context": {
    "destination": "París",
    "duration": 7
  }
}'

Response:

json
{
"threadId": "123e4567-e89b-12d3-a456-426614174000",
"response": "Para tu viaje a París de 7 días, te recomiendo llevar...",
"currentAgent": "luggage_weather"
}


Ejemplo 3: Sugerencia de Destinos
Request:

curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{
"message": "Busco un destino con playa y buen clima para relajarme",
"context": {}
}'

Response:

json
{
"threadId": "123e4567-e89b-12d3-a456-426614174000",
"response": "Basado en tus preferencias, te sugiero los siguientes destinos...",
"currentAgent": "destination"
}

Ejemplo 4: Manejo de Errores
Ciudad No Encontrada

Request:

bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{
"message": "Quiero ir a CiudadInexistente",
"context": {
"destination": "CiudadInexistente"
}
}'

Response:

json
{
"error": "Error procesando la solicitud",
"message": "Ciudad no encontrada"
}


Notas Importantes

1. El `threadId` se usa para mantener el contexto de la conversación.
2. El `context` es opcional pero ayuda a proporcionar información más precisa.
3. El `currentAgent` indica qué experto está manejando la consulta.
4. Todos los mensajes de error incluyen información descriptiva.