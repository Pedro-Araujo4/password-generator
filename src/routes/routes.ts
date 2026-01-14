import { Router } from 'express';
import { PasswordController } from '../controllers/password-controller.js';
import { validatePasswordRequest } from '../middlewares/validation.middleware.js';
import { adminAuth } from '../middlewares/auth.middleware.js';

const routes = Router();
const passwordController = new PasswordController();
 
routes.post('/generate', validatePasswordRequest, passwordController.handle);


routes.get('/passwords', passwordController.getAll);           // Listar todas
routes.get('/passwords/:id', passwordController.getById);      // Buscar uma


routes.delete('/passwords', adminAuth, passwordController.delete); // deleta tudo
routes.delete('/passwords/:id', adminAuth, passwordController.delete); // deleta por id


export default routes;