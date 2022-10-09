import { Schema, model, Types } from 'mongoose';

const roles = {
  values: ['ADMIN', 'USER'],
  message: '`{VALUE}` not a valid role',
}

const userSchema = new Schema({

  name: {
    type: String,
  },

  username: {
    type: String,
    required: true,
    unique:  true,
    maxlength: 15,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  role: {
    type: String,
    required: true,
    enum: roles,
    default: 'USER'
  },

  status: {
    type: String, 
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },

  confirmationCode: { 
    type: String, 
    unique: true 
  },

}, {versionKey: false})

userSchema.methods.toJSON = function(){

  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject.confirmationCode;


  return userObject;
}

const Users = model('user', userSchema);

export { Users, Types };