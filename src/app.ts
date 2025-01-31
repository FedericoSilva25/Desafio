
import express, { Request, Response } from 'express';
import { destinosAgent } from './agents/destinosAgent';
import { equipajeClimaAgent } from './agents/equipajeClimaAgent';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta para el chat
app.post('/api/chat', (req: Request, res: Response) => {
  const { userMessage } = req.body;

  // Dependiendo del mensaje del usuario, determinamos qué agente usar
  if (userMessage.includes("destino")) {
    const destinos = destinosAgent(userMessage);
    return res.json({ response: destinos });
  }

  if (userMessage.includes("empacar") || userMessage.includes("clima")) {
    const [destino, fecha] = userMessage.split(' ');  // Simulación simple, puedes expandirlo
    const { equipaje, clima } = equipajeClimaAgent(destino, fecha);
    return res.json({ equipaje, clima });
  }

  return res.json({ response: "Lo siento, no entendí eso." });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});