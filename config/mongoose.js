import mongoose from 'mongoose';

/**
 * We're connecting to the database using the Mongoose library
 */
const mongodb = async () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUniFiedTopology: true
  })
  .then( console.log(`MongoDB --  database connection established successfully!`) )
  .catch(e => console.log('Error connecting to database', e) ) 
}

export default mongodb;