import { Users } from '../../api/users/users.model';
import { validate, body } from '../../utils/handleValidate';

/* Validating the username and password. */
const validateLogin = [
  body('username').trim().notEmpty().withMessage('username cannot be empty'),
  body('password').trim().notEmpty().withMessage('password cannot be empty'),

  (req, res, next) => {
    validate(req, res, next);
  }

]

/* Validating the register form. */
const validateSignup = [
  body('name').trim(),
  body('username').trim().notEmpty().withMessage('username cannot be empty').custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      Users.findOne({username: req.body.username.toLowerCase()}, function(error, user){
        if (error) {
          reject(new Error('Server error'));
        }
        if (Boolean(user)) {
          reject(new Error('Username already exist!'));
        }
        resolve(true);
      })
    })
  }),
  body('email').trim().notEmpty().withMessage('email cannot be empty').isEmail().withMessage('invalid email').custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      Users.findOne({email: req.body.email}, function(err, user){
        if(err) {
          reject(new Error('Server error'));
        }
        if(Boolean(user)) {
          reject(new Error('This email already exists!'))
        }
        resolve(true)
      });
    });
  }),
  body('password').trim().notEmpty().withMessage('password cannot be empty').isLength({min: 3}).withMessage('the password must contain a minimum of 3 characters'),

  (req, res, next) => {
    validate(req, res, next);
  }
]

export { validateLogin, validateSignup };