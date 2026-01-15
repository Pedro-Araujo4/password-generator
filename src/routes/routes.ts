import { Router } from 'express';
import { PasswordController } from '../controllers/password-controller.js';
import { validatePasswordRequest } from '../middlewares/validation.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';

const routes = Router();
const authController = new AuthController();
const passwordController = new PasswordController();
 
routes.post('/generate', authMiddleware, validatePasswordRequest, passwordController.handle);
routes.post('/auth/signup', authController.signup);
routes.post('/auth/login', authController.login);

routes.get('/passwords', authMiddleware, passwordController.getAll);         // Listar todas
routes.get('/passwords/:id', authMiddleware, passwordController.getById);      // Buscar uma


routes.delete('/passwords', authMiddleware, passwordController.delete); // deleta tudo
routes.delete('/passwords/:id', authMiddleware, passwordController.delete); // deleta por id


export default routes;