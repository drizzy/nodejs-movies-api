import { Schema, model, Types} from 'mongoose';

const movieSchema = new Schema({

  title: {
    type: String,
    required:  true,
    maxlength: 50,
    minlength: 3,
  },

  desc: {
    type: String,
    unique: false,
    required: true
  },

  poster: {
    type: String,
    unique: false,
    required: false
  },
  
  genre: {
    type: String,
    maxlength: 30,
    minlength: 1,
  },
  
  year: {
    type: Number,
    max: 2100,
    min: 1900,
    default: Date.now,
  },
  
  rating: {
    type: Number,
    max: 10,
    min: 0,
  },

  duration: {
    type: Number,
    default: 60,
  },

  only: [
    {
      language: {
        type: String,
        default: 'ingles',
      },
      server: {
        type: String,
        default: 'unknown'
      },
      quality: {
        type: String,
        default: 'hd1080',
      },
      url: {
        type: String,
      },
    }
  ],

  status: {
    type: Boolean,
    default: true
  },
  
  createAT: {
    type: Date,
    default: Date.now,
  }

}, { versionKey: false } )

const Movies = model("movie", movieSchema);

export { Movies, Types};