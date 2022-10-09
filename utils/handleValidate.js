import { validationResult, body } from 'express-validator';

/**
 * It takes the request object, validates it, and if it's valid, it calls the next function in the
 * chain. If it's not valid, it returns a 400 error
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The validationResult function is being returned.
 */
const validate = (req, res, next) => 
{
  try {

    validationResult(req).throw();
    return next();

  } catch (e) {

    res.status(400).json({error: e.array() });

  }
}

export { validate, body };