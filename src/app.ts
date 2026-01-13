import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite que a API entenda JSON no corpo das requisições

// Rotas
app.use('/api', routes);

export { app };