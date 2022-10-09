import { Users } from '../../api/users/users.model';
import { httpError } from '../../utils/handleError';
import sendEmail from '../email/email.controller';

const activate = async (user) => {
  
  try {

    const link = `${process.env.API_URL}/active/${user.confirmationCode}`

    const message = `<h1>Email Confirmation</h1>
        <h2>Hello ${user.name}</h2>
        <p>Thank you for registering. Please confirm your email by clicking the link below</p>
        <a href=${link}> Click here</a>
        </div>`

    await sendEmail(user.email, 'Please confirm your account', message);

  } catch (e) {
    console.log('Server error')
  }

}

const emailActive = async (req, res) => {

  try {

    const user = await Users.findOne({confirmationCode: req.params.confirmationCode});

    if(!user) return httpError(res, `The link is invalid or expired!`, 400);
    
    user.status = 'Active';
    user.save();

    res.status(200).json({message: 'Account confirmed!'});

 } catch (e) {
   httpError(res);
 }
 
}


export { activate, emailActive };