import { Router } from 'express';
const routes = Router();
import { validateLogin, validateSignup } from './auth.validation';
import { login, signup } from './auth.controller';

routes.post('/login', validateLogin, login);
routes.post('/signup', validateSignup, signup);

export default routes;