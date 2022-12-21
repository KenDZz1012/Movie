import MovieModel from "../../Movie/Models/MovieModel";
import Movie from "../../Movie/DTO/Movie";
import MovieFilter from "../../Movie/DTO/MovieFilter";
import MovieCreate from "../../Movie/DTO/MovieCreate";
import MovieUpdate from "../../Movie/DTO/MovieUpdate";
import { FileService } from "../../../middlewares/FileService";
import Pageable from "../DTO/Pageable";
const _fileService = new FileService();

const getListMovieByName = async (input: MovieFilter, pageable: Pageable) => {
    console.log(pageable)
    return await MovieModel.find({ MovieName: { $regex: input.MovieName, $options: 'i' } }).limit(pageable.size).skip(pageable.skip).populate('Category').populate('Actor').populate('Director')
}
export {
    getListMovieByName
}