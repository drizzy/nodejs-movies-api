import { Router } from 'express';
const routes =  Router();
import Users from './users.controller';
import token from '../../middleware/tokenAuth';
import role  from '../../middleware/roleAuth';
import { validateUsers } from './users.validation';

routes.get('/', token, role(['ADMIN']), Users.showAll);
routes.get('/:email', token, role(['ADMIN']), Users.show);
routes.post('/', token, role(['ADMIN']), validateUsers, Users.create);
routes.put('/:email', token, role(['ADMIN']), Users.update);
routes.delete('/:email', token, role(['ADMIN']), Users.destroy);

export default routes;