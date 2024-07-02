import Movies from "../models/MovieModel.js"
import { handleResponseError, handleResponseSuccess } from "../utils/responses.js"
import mongoose from "mongoose"

const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find()
    handleResponseSuccess(res, 200, "Get movies successfully", {movies})
  } catch (error) {
    console.log("error", error)
    handleResponseError(res, 500, "Internal server error")
  }
}

const getMovieById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect format id")
    return
  }
  const checkMovieInDb = await Movies.findById(id)
  if (!checkMovieInDb) {
    handleResponseError(res, 404, "Movie not found")
    return
  }
  handleResponseSuccess(res, 200, "Get movie successfully", {
    title: checkMovieInDb.title,
    year: checkMovieInDb.year,
    poster: checkMovieInDb.poster
  })
}

const createNewMovie = async (req, res) => {
  const { title, year, poster } = req.body
  if (!title || !year || !poster) {
    handleResponseError(res, 400, "All fields are required")
    return
  }
  const newMovie = await Movies.create({ title, year, poster })
  handleResponseSuccess(res, 201, "Create new movie successfully", {...newMovie})
}

const updateMovie = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect format id")
    return
  }
  const checkMovieInDb = await Movies.findById(id)
  if (!checkMovieInDb) {
    handleResponseError(res, 404, "Movie not found")
    return
  }
}





