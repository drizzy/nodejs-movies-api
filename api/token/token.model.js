import { Schema, model } from 'mongoose';

const Token = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },

  token: {
    type: String,
    required: true
  },

  createAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }

}, {versionKey: false});


export default model('token', Token);