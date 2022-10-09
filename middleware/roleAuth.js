import { Users } from '../api/users/users.model';
import { tokenVerify } from '../utils/handleToken';
import { httpError } from '../utils/handleError';

/**
 * It takes a role as a parameter, and returns a function that takes a request, response, and next as
 * parameters
 * @param role - The role that the user must have to access the route.
 * @returns A function that takes a role and returns a function that takes a request, response, and
 * next.
 */
const roleAuth = (role) => async (req, res, next) => {

  try {
    
      const token = req.headers['x-access-token'];
      
      if (!token) return httpError(res, 'Not token provided', 403);

      const tokenData = await tokenVerify(token);

      const userData = await Users.findById(tokenData._id);
      
      if (!userData) return httpError(res, 'USER_NOT_PERMISSIONS', 400)

      if([].concat(role).includes(userData.role)){
        next();
      }else{
        httpError(res, 'USER_NOT_PERMISSIONS', 403);
      }

  } catch (e) {
    console.log(e);
    httpError(res);
  }

}

export default roleAuth;