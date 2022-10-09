import { validate, body } from '../../utils/handleValidate';
import { Users } from './users.model';
/* Validating the user input. */
const validateUsers = [
  body('name').trim().isString(),
  body('username').trim().isString().notEmpty().withMessage('username is missing').isLength({min: 5, max: 20}).withMessage('username must contain between 5 and 20 characters').custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      Users.findOne({username: req.body.username.toLowerCase()}, function(error, user) {
        if (error) {
          reject(new Error('Server error'));
        }
        if (Boolean(user)) {
          reject(new Error('Username already exist!'))
        }
        resolve(true);
      })
    })
  }),
  body('email').trim().notEmpty().withMessage('email is missing').isEmail().withMessage('Email is invalid').custom( (value, {req}) => {
    return new Promise((resolve, reject) => {
      Users.findOne({email: req.body.email.toLowerCase()}, function(error, user) {
        if (error) {
          reject(new Error('Server error'));
        }
        if (Boolean(user)) {
          reject(new Error('Email already exist!'));
        }
        resolve(true);
      })
    })
  }),
  body('password').trim().notEmpty().withMessage('password is missing').isLength({min: 3}).withMessage('the password must contain a minimum of 3 characters'),

  (req, res, next) => {
    validate(req, res, next);
  }
  
]


export { validateUsers };