import { Router } from 'express';
const routes = Router();
import { passwordReset, passwordResetId } from './reset.controller';
import { passwordValidate, passwordResetValidate } from './reset.validate'

routes.post('/', passwordValidate, passwordReset);
routes.post('/:userId/:token', passwordResetValidate, passwordResetId);

export default routes;