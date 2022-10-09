import { Movies, Types } from './movies.model';
import { httpError } from '../../utils/handleError';

/**
 * It finds a movie by id and returns it
 * @param req - The request object.
 * @param res - The response object.
 * @returns The movie with the id that was passed in the request.
 */
const show = async (req, res) => {
  
  try {

    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) return httpError(res, 'invalid movid id', 400);
  
    const movie = await Movies.findById({_id: id, status: true});

    res.status(200).json({movie});

  } catch (e) {
    httpError(res, e);
  }

}

/**
 * It finds all the movies in the database that have a status of true and returns them in a json object
 * @param req - The request object.
 * @param res - The response object.
 * @returns An array of movies
 */
const showAll = async (req, res) => {

  try {

    const movies = await Movies.find({status: true});

    if (!movies) return res.status(200).json( {message: 'There are no movies at the moment'} );
      
      res.status(200).json({movies});

  } catch (e) {

    httpError(res, e);
  }
}

/**
 * It creates a new movie in the database
 * @param req - request
 * @param res - response object
 */
const create = async (req, res) => {

 try {

    const only = req.body.only;

    const onlyM = only.map(el => {
        return {
          "language": el.language,
          "server": el.server,
          "quality": el.quality,
          "url": el.url
        }
      }
    )

    const movie = await Movies.create({
      title:  req.body.title,
      desc:   req.body.desc,
      poster: req.body.poster,
      genre:  req.body.genre,
      year:   req.body.year,
      rating: req.body.rating,
      duration: req.body.duration,
      only: onlyM,
    });

    res.status(200).json({movie});

 } catch (e) {
  httpError(res, e);
 }

}

/**
 * It takes the id of the movie to be updated from the request parameters, checks if the id is valid,
 * finds the movie by id, updates the movie with the new data from the request body, and returns the
 * updated movie
 * @param req - The request object.
 * @param res - The response object.
 * @returns The movie is being returned.
 */
const update = async (req, res) => {


  try {

    const id = req.params.id;
    
    if (!Types.ObjectId.isValid(id)) return httpError(res, 'Invalid ID', 400);
    
    const movies = await Movies.findById({_id: id});

    if (!movies) return httpError(res, 'This movie does not exist!', 400)

      const only = req.body.only;

      const onlyM = only.map(el => {
        return {
            "language": el.language,
            "server": el.server,
            "quality": el.quality,
            "url": el.url
          }
        }
      )

      const movie = await Movies.findByIdAndUpdate({_id: id}, {
        $set: {
          title:  req.body.title  || movies.title,
          desc:   req.body.desc   || movies.desc,
          url:    req.body.url    || movies.url,
          poster: req.body.poster || movies.poster,
          genre:  req.body.genre  || movies.genre,
          year:   req.body.year   || movies.year,
          rating: req.body.rating || movies.rating,
          duration: req.body.duration,
          only: onlyM || movies.only,
          status: req.body.status || movies.status,
        }
      }, {new: true});
  
      res.status(200).json({movie});

  } catch (e) {
    httpError(res, e);
  }

}

/**
 * We're trying to find a movie by its id, if it doesn't exist, we return a 404 error, if it does
 * exist, we remove it
 * @param req - The request object. This is an object that represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 */
const destroy = async (req, res) => {
  
  try {

    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) return httpError(res, 'Invalid ID', 400);

    const movie = await Movies.findById({_id: id});

    if (!movie) return httpError(res, 'This movie does not exist', 400);

      movie.remove();
      res.status(200).json({message: 'deleted movie'});

  } catch (e) {
    httpError(res, e);
  }

}

export default { show, showAll, create, update, destroy };