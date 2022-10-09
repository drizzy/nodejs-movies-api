import { Router } from 'express';
const routes = Router();
import { emailActive } from './activate.controller';

routes.get('/:confirmationCode', emailActive);

export default routes;