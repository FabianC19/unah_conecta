import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PostgresHealthRepository } from '../repositories/PostgresHealthRepository';
import { GetHealthReport } from '../../use-cases/GetHealthReport';
import { HealthController } from '../../interfaces/controllers/HealthController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Instanciar dependencias (Inyección de dependencias)
const healthRepository = new PostgresHealthRepository();
const getHealthReport = new GetHealthReport(healthRepository);
const healthController = new HealthController(getHealthReport);

// Rutas
app.get('/api/health', (req, res) => healthController.handle(req, res));

app.listen(PORT, () => {
  console.log(`Servidor de UNAH Conecta corriendo en http://localhost:${PORT}`);
  console.log(`Endpoint de salud disponible en http://localhost:${PORT}/api/health`);
});
