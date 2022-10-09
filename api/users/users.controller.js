import { Users } from './users.model';
import { tokenSign } from '../../utils/handleToken';
import { encrypt } from '../../utils/handleBcrypt';
import { httpError } from '../../utils/handleError';

/**
 * It takes the email from the request params, finds the user in the database, and returns the user if
 * it exists
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 * @returns The user object is being returned.
 */
const show = async(req, res) => {

  
  try {
    
    const email = req.params;

    const user = await Users.findOne(email);

    if(!user) return httpError(res, 'There is no user with this email', 400);

    res.status(200).json({user});

  } catch (e) {
    httpError(res, e);
  }  

}

const showAll = async(req, res) => {

  try {

    const users = await Users.find();
    res.status(200).json({users});

  } catch (e) {
    httpError(res, e);
  } 

}

/**
 * It creates a new user in the database
 * @param req - The request object.
 * @param res - The response object.
 */
const create = async(req, res) => {

  try {


    const {name, username, email, password, role} = req.body;

    const token = tokenSign({email: email});

    const passHash = await encrypt(password);

    const status = 'Active';

    const user = await Users.create({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: passHash,
      role: role.toUpperCase(),
      status: status,
      confirmationCode: token,
    })
    res.status(200).json({user});

  } catch (e) {
    httpError(res, e);
  }
  
}

/**
 * It updates a user's information
 * @param req - The request object.
 * @param res - The response object.
 * @returns The user is being returned.
 */
const update = async(req, res) => {

  try {

    const email = req.params.email;
    const password = req.body.password;

    const users = await Users.findOne({email: email});

    if(!users) return httpError(res, 'There is no user with this email', 400);

    let passwordHash;
    if(password){
      passwordHash = await encrypt(password);
    } 

    const user = await Users.findOneAndUpdate({email: users.email}, {
        $set:{
          name: req.body.namecharAt(0).toUpperCase() || users.name,
          username: req.body.username.toLowerCase() || users.username,
          email: req.body.email.toLowerCase() || users.email,
          role: req.body.role.toUpperCase() || users.role,
          password: passwordHash  || users.password,
        }
    }, {new: true});

    res.status(200).json({user});

  } catch (e) {
    httpError(res, e);
  }

}

/**
 * It finds a user by email, and if it exists, it deletes it
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const destroy = async(req, res) => {

  try {

    const email = req.params.email;

    const user = await Users.findOne({email: email});

    if (!user) return httpError(res, 'This email does not exist!', 400)

      user.remove();
      res.status(200).json({message: 'User delete'});                   

  } catch (e) {
    httpError(res, e);
  }
}

export default {show, showAll, create, update, destroy};