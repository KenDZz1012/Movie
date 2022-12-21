import MovieModel from "../models/MovieModel";
import Movie from "../DTO/Movie";
import MovieFilter from "../DTO/MovieFilter";
import MovieCreate from "../DTO/MovieCreate";
import MovieUpdate from "../DTO/MovieUpdate";
import { FileService } from "../../../middlewares/FileService";
import Pageable from "../DTO/Pageable";
const _fileService = new FileService();

const getAllMovieHandler = async (input: MovieFilter, pageable: Pageable) => {
    return await MovieModel.find(input).sort(pageable.sort).limit(pageable.size).populate('Category').populate('Actor').populate('Director')
}

const getMovieByIdHandler = async (input: String) => {
    return await MovieModel.findById(input).populate('Category').populate('Actor').populate('Director')
}

const createMovieHandler = async (input: MovieCreate, files: any) => {
    if (files.MoviePoster) {
        const filePathPoster = await _fileService.createFile(files.MoviePoster[0])
        input.Poster = filePathPoster
    }
    if (files.MovieCoverPoster) {
        const filePathPoster = await _fileService.createFile(files.MovieCoverPoster[0])
        input.CoverPoster = filePathPoster
    }
    if (files.MovieVideo) {

        input.Video = `MovieVideo/${input.MovieName}-${input.YearProduce}.mp4`
    }
    input.Actor = JSON.parse(input.Actor)
    input.Director = JSON.parse(input.Director)
    input.Category = JSON.parse(input.Category)
    const movieCreate = await MovieModel.create(input)
    return {
        data: movieCreate._id,
        isSuccess: true,
        msgString: "Create Success"
    }
}

const updateMovieHandler = async (MovieId: String, input: MovieUpdate, files: any) => {

    if (files.MoviePoster) {
        const filePathPoster = await _fileService.createFile(files.MoviePoster[0])
        input.Poster = filePathPoster
    }
    if (files.MovieCoverPoster) {
        const filePathPoster = await _fileService.createFile(files.MovieCoverPoster[0])
        input.CoverPoster = filePathPoster
    }
    if (files.MovieVideo) {

        input.Video = `MovieVideo/${input.MovieName}-${input.YearProduce}.mp4`
    }
    input.Actor = JSON.parse(input.Actor)
    input.Director = JSON.parse(input.Director)
    input.Category = JSON.parse(input.Category)
    return await MovieModel.updateOne({ _id: MovieId }, { $set: input })
}

const deleteMovieHandler = async (input: string) => {
    return await MovieModel.deleteOne({ _id: input })
}

export {
    getAllMovieHandler,
    getMovieByIdHandler,
    createMovieHandler,
    updateMovieHandler,
    deleteMovieHandler
}