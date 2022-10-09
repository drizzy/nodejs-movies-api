import movies from '../api/movies/movies.routes';
import users  from '../api/users/users.routes';
import auth   from '../services/auth/auth.routes';
import active from '../services/account-activate/activate.routes';
import reset  from '../services/password-reset/reset.routes';

/* Exporting the routes to the server.js file. */
export default (app) => {

  app.get('/', (req, res ) => {
    res.send('<h1>MOVIES REST API - Developed with NodeJs and MongoDB</h1>');
  });
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/active', active);
  app.use('/api/password-reset', reset);

}