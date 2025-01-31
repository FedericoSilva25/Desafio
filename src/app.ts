import express from 'express';
import routes from './api/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;