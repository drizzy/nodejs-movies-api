import { validate, body } from '../../utils/handleValidate';
import { Movies } from './movies.model';

/* This is a validation for the movie. */
const validateMovie = [
  body('title').trim().isString().notEmpty().withMessage('title is missing').isLength({min: 3, max: 50}).withMessage('title must contain between 3 and 50 characters').custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      Movies.findOne({title: req.body.title}, function(error, movie){
        if (error) {
          reject(new Error('Server error'));
        }
        if(Boolean(movie)){
          reject(new Error('Title already exists!'));
        }
        resolve(true);
      })
    })
  }),
  body('desc').trim().isString().notEmpty().withMessage('desc is missing').isLength({min: 3, max: 550}).withMessage('The description must contain a minimum of 3 characters and a maximum of 550'),
  body('poster').trim().isURL().withMessage('This field requires a url'),
  body('genre').trim().isString().notEmpty().withMessage('genre is missing').isLength({min: 1, max: 50}),
  body('year').trim().isNumeric().withMessage('Year this is numeric').notEmpty().withMessage('year is missing'),
  body('rating').trim().isNumeric().withMessage('Rating this is numeric').notEmpty().withMessage('rating is missing'),

  (req, res, next) => {
    validate(req, res, next);
  }
]


export { validateMovie };