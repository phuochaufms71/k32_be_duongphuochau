import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  poster: {
    type: String,
    require: true
  }
})

const Movies = mongoose.model('movies', MovieSchema);
export default Movies;
