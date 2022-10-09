import { tokenVerify } from '../utils/handleToken';
import { httpError } from '../utils/handleError';

/**
 * It checks if the request has a token, if it does, it verifies the token and if the token is valid,
 * it calls the next function
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
const tokenAuth = async (req, res, next) => {

    try {

      const token = req.headers['x-access-token'];
      
      if (!token) return httpError(res, 'Not token provided', 403);

      const tokenData = await tokenVerify(token);

      if (!tokenData) return httpError(res, 'The token not is valid', 403);

      if(tokenData._id) {
        next();
      }else{
        httpError(res, 'USER_NOT_PERMISSIONS', 401);
      }
    } catch (e) {

      console.log(e);
      httpError(res, 'USER_NOT_PERMISSIONS', 401);

    }

}

export default tokenAuth;