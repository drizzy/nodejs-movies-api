import { Router } from 'express';
const  routes = Router();
import movies from './movies.controller';
import token from '../../middleware/tokenAuth';
import role from '../../middleware/roleAuth';
import { validateMovie } from './movies.validation';

routes.get('/', movies.showAll);
routes.get('/:id', movies.show);
routes.post('/', token, role(['ADMIN', 'USER']), validateMovie, movies.create);
routes.put('/:id', token, role(['ADMIN', 'USER']), movies.update);
routes.delete('/:id', token, role(['ADMIN', 'USER']), movies.destroy);

export default routes;