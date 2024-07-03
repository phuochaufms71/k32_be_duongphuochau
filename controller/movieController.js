import mongoose from "mongoose";
import Movies from "../models/MovieModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";


const getMovies = async (req, res) => {
    try {
        const movies = await Movies.find();
        handleResponseSuccess(res, 200, "Get movies successfully", { movies })
    } catch (err) {
        console.log("Error", err);
        handleResponseError(res, 500, "Internal server error")
    }
}

const getMovieById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return
    }
    const checkMovieIdInDb = await Movies.findById(id);
    if (!checkMovieIdInDb) {
        handleResponseError(res, 404, "Movie not found")
        return
    }
    handleResponseSuccess(res, 200, "Get movie successfully", {
        title: checkMovieIdInDb.title,
        year: checkMovieIdInDb.year,
        poster: checkMovieIdInDb.poster
    })

}

const createNewMovie = async (req, res) => {
    const { title, year, poster } = req.body;
    if (!title || !year || !poster) {
        handleResponseError(res, 400, "Bad request. All fields are existed")
        return
    }
    const newMovie = await Movies.create({ title, year, poster })
    handleResponseSuccess(res, 201, "Create new movie successfully", { ...newMovie })
}

const updateMovie = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return
    }
    const checkMovieIdInDb = await Movies.findById(id);
    if (!checkMovieIdInDb) {
        handleResponseError(res, 404, "Movie not found")
        return
    }

    const { title, year, poster } = req.body;
    if (!title || !year || !poster) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }
    await checkMovieIdInDb.updateOne({ title, year, poster })
    handleResponseSuccess(res, 200, "Update movie successfully", { ...checkMovieIdInDb })
} 

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return
    }
    const checkMovieIdInDb = await Movies.findById(id);
    if (!checkMovieIdInDb) {
        handleResponseError(res, 404, "Movie not found")
        return
    }
    await Movies.findByIdAndDelete(id)
    handleResponseSuccess(res, 200, "Movie delete successfully")
}

export {
    getMovies,
    getMovieById,
    createNewMovie,
    updateMovie,
    deleteMovie
}