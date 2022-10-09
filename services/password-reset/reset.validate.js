import { validate, body } from '../../utils/handleValidate';


/* Validating the email field. */
const passwordValidate = [

  body('email').trim().notEmpty().withMessage('email is missing').isEmail().withMessage('Email is invalid'),
  (req, res, next) => {
    validate(req, res, next);
  }
]


/* Validating the password field. */
const passwordResetValidate = [

  body('password').trim().notEmpty().withMessage('password is missing').isLength({min: 3}).withMessage('The password must contain a minimum of 3 characters'),
  (req, res, next) => {
    validate(req, res, next);
  }
]


export { passwordValidate, passwordResetValidate };