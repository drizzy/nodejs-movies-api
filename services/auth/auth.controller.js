import { Users } from '../../api/users/users.model';
import { tokenSign } from '../../utils/handleToken';
import { encrypt, compare } from '../../utils/handleBcrypt'
import { httpError } from '../../utils/handleError';
import { activate } from '../account-activate/activate.controller';

/**
 * It receives a request and a response, it tries to find a user with the username and password
 * provided in the request body, if it finds it, it compares the password provided with the one in the
 * database, if they match, it generates a token and sends it back to the client, if not, it sends an
 * error message
 * @param req - The request object.
 * @param res - The response object.
 * @returns The access_token and the user data.
 */
const login = async(req, res) => {

  try {

    const {username, password } = req.body;

    const user = await Users.findOne({username});

    if (!user) return httpError(res, 'This user does not exist!', 400);

    const passCheck = await compare(password, user.password);

    if (!passCheck) return httpError(res, 'Wrong Password or Email!', 401);

    if (user.status != 'Active') return httpError(res, 'Pending Account. Please Verify Your Email!', 400);

    const access_token = tokenSign(user);

    res.json({access_token, data: user });

  } catch (e) {
    httpError(res, e);
  }

}

/**
 * It creates a new user in the database
 * @param req - The request object.
 * @param res - The response object.
 */
const signup = async(req, res) => {

  try {

      const token = tokenSign({email: req.body.email});

      const count = await Users.count({});

      const role = count > 0 ? 'USER' : 'ADMIN';

      const user = await Users.create({
        name:     req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        username: req.body.username.toLowerCase(),
        email:    req.body.email.toLowerCase(),
        password: await encrypt(req.body.password),
        role: role,
        confirmationCode: token,
       });

      await activate(user);

      res.status(200).json({message: 'User was registered successfully! Please check your email'});

  } catch (e) {
    httpError(res, e);
  }

}

export { login, signup };