import { Router } from 'express';
import { PasswordController } from '../controllers/password-controller';
import { validatePasswordRequest } from '../middlewares/validation.middleware';

const routes = Router();
const passwordController = new PasswordController();

// A requisição passa primeiro pela validação e DEPOIS pelo handle
routes.get('/passwords', validatePasswordRequest, passwordController.handle);

export default routes;