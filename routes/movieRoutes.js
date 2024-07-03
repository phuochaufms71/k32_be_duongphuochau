import express from "express";
import { auth, authAmin } from '../middleware/auth';
import { getMovies, getMovieById, createNewMovie, updateMovie, deleteMovie } from '../controller/movieController.js';

const router = express.Router();

router.get('/', auth, getMovies);
router.get('/:id', auth, getMovieById);
router.post('/', auth, authAmin, createNewMovie);
router.put('/:id', auth, authAmin, updateMovie);
router.delete('/:id', auth, authAmin, deleteMovie);

export { router as movieRoutes }