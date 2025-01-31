import axios from 'axios';

export const equipajeClimaAgent = async (destino: string, fecha: string) => {
  const equipaje = {
    // Equipaje según destino
  };

  const climaAPIKey = 'Yb73d2256a257e5469cf8a11b8aa8d5b6';
  const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${destino}&appid=${climaAPIKey}&units=metric`);

  const clima = weather.data.main ? `${weather.data.main.temp}°C` : "Información no disponible";

  return { equipaje: equipaje[destino], clima };
};