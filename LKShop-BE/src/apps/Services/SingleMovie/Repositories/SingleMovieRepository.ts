import SingleMovieModel from "../models/SingleMovieModel";
import SingleMovie from "../DTO/SingleMovie";
import SingleMovieFilter from "../DTO/SingleMovieFilter";
import SingleMovieCreate from "../DTO/SingleMovieCreate";
import SingleMovieUpdate from "../DTO/SingleMovieUpdate";
import { FileService } from "../../../middlewares/FileService";
import Pageable from "../DTO/Pageable";
import MovieFilter from "../../Movie/DTO/MovieFilter";
const _fileService = new FileService();

const getAllSingleMovieHandler = async (input: SingleMovieFilter, pageable: Pageable) => {
    return await SingleMovieModel.find(input).sort(pageable.sort).limit(pageable.size).populate({ path: 'Movie', populate: 'Category' })
}

const getSingleMovieByIdHandler = async (input: String) => {
    return await SingleMovieModel.findById(input).populate('Movie')
}

const createSingleMovieHandler = async (input: SingleMovieCreate, files: any) => {
    console.log(input)
    if (files.MoviePoster) {
        const filePathPoster = await _fileService.createFile(files.MoviePoster[0])
        input.Poster = filePathPoster
    }
    if (files.MovieCoverPoster) {
        const filePathPoster = await _fileService.createFile(files.MovieCoverPoster[0])
        input.Poster = filePathPoster
    }
    if (files.MovieVideo) {
        input.Video = `MovieVideo/${input.Movie}-${input.YearProduce}.mp4`
    }
    const movieCreate = await SingleMovieModel.create(input)
    return ({
        isSuccess: true,
        msgString: 'Create Success'
    })
}

const updateSingleMovieHandler = async (SingleMovieId: String, input: SingleMovieUpdate, files: any) => {
    if (files.MoviePoster) {
        const filePathPoster = await _fileService.createFile(files.MoviePoster[0])
        input.Poster = filePathPoster
    }
    if (files.MovieCoverPoster) {
        const filePathPoster = await _fileService.createFile(files.MovieCoverPoster[0])
        input.Poster = filePathPoster
    }
    if (files.MovieVideo) {
        input.Video = `MovieVideo/${input.Movie}-${input.YearProduce}.mp4`
    }
    const movieUpdate = await SingleMovieModel.updateOne({ _id: SingleMovieId }, { $set: input })
    return ({
        isSuccess: true,
        msgString: 'Create Success'
    })
}

const deleteSingleMovieHandler = async (input: String) => {
    const movieDelete = await SingleMovieModel.deleteOne({ _id: input })
}

export {
    getAllSingleMovieHandler,
    getSingleMovieByIdHandler,
    createSingleMovieHandler,
    updateSingleMovieHandler,
    deleteSingleMovieHandler
}