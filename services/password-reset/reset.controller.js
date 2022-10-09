import crypto from 'crypto';
import { Users, Types } from '../../api/users/users.model';
import Token from '../../api/token/token.model';
import sendEmail from '../email/email.controller';
import { encrypt } from '../../utils/handleBcrypt'
import { httpError } from '../../utils/handleError';


/**
 * It checks if the user exists, if not it returns an error, if the user exists it creates a token and
 * sends a password reset link to the user's email
 * @param req - The request object.
 * @param res - the response object
 */
const passwordReset = async(req, res) => {

  try {
 
     const email = req.body.email;
 
     const user = await Users.findOne({email: email});
 
     if(!user) return httpError(res, `user with given email doesn't exist!`, 400);
     
     let token = await Token.findOne({userId: user._id});
 
     if (!token) {
 
       token = await new Token({
         userId: user._id,
         token: crypto.randomBytes(32).toString('hex')
      }).save(); 
 
     }
 
     const link = `${process.env.API_URL}/password-reset/${user._id}/${token.token}`;

     const message = `<h1>Password reset</h1>
        <h2>Hello ${user.name}</h2>
        <p>To reset your password click on the following link</p>
        <a href=${link}> Click here</a>
        <p><b>If you did not request to reset your password, skip this email.</b></p>
        </div>`
 
     await sendEmail(user.email, 'Password reset', message);
 
     res.status(200).json({ok: 'password reset link sent to your email account'});
 
  } catch (e) {
    httpError(res);
  }
 
 
}


/**
 * It takes the userId and token from the url, finds the user and token in the database, checks if the
 * token is valid, encrypts the password and saves the user, then deletes the token
 * @param req - The request object.
 * @param res - The response object.
 */
const passwordResetId = async(req, res) => {
 
   try {
    
    const id = req.params.userId;

     if (!Types.ObjectId.isValid(id)) return httpError(res, 'invalid link or expired', 400);
     const user = await Users.findById({_id: id});
     const token = await Token.findOne({
       userId: user._id,
       token: req.params.token,
     });
 
     if (!token) return httpError(res, 'invalid link or expired', 400);
 
     user.password = await encrypt(req.body.password);
     await user.save();
     await token.delete();
 
     res.status(200).json({message: 'password reset sucessfully.'})
 
   } catch (e) {
     httpError(res);
   }
 
}

 export { passwordReset, passwordResetId };