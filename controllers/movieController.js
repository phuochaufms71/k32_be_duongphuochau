import Movies from "../models/MovieModel.js"

const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find()
  } catch (error) {
    
  }
}







