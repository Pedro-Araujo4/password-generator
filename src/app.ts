import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // URL do seu frontend (ex: Vite/React)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-key'] // Não esqueça de liberar seu header customizado!
}));
app.use(express.json()); // Permite que a API entenda JSON no corpo das requisições

// Rotas
app.use('/api', routes);

export { app };