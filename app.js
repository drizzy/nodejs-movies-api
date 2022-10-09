import { config } from 'dotenv';
import express  from 'express';
import morgan   from 'morgan';
import cors     from 'cors';
import mongodb  from './config/mongoose';
import routes   from './routes';

/* Loading the environment variables from the `.env` file. */
config();

/* Creating an instance of the express application. */
const app = express();

/* Connecting to the database. */
mongodb();

/* A middleware that logs all the requests to the console. */
app.use(morgan('dev'));

/* A middleware that parses the request body and makes it available in the `req.body` object. */
app.use(express.json());

/* A middleware that allows the server to accept requests from different origins. */
app.use(cors());

/* A middleware that parses the request body and makes it available in the `req.body` object. */
app.use(express.urlencoded({
  extended: false
}));

/* starting the routes */
routes(app);

export default app;