import TVSeasonModel from "../Models/TVSeasonModel";
import TVSeasonCreate from "../DTO/TVSeasonCreate";
import TVSeasonFilter from "../DTO/TVSeasonFilter";
import TVSeasonUpdate from "../DTO/TVSeasonUpdate"; 
import { FileService } from "../../../middlewares/FileService";
import Pageable from "../DTO/Pageable";
const _fileService = new FileService();
const getListTVSeasonHandler = async (filter: TVSeasonFilter, pageable: Pageable) => {
    return await TVSeasonModel.find(filter).sort(pageable.sort).limit(pageable.size).populate('Movie')
}

const getTVSeasonByIdHandler = async (input: String) => {
    return await TVSeasonModel.findById(input).populate('Movie')
}

const createTVSeasonHandler = async (input: TVSeasonCreate, files: any) => {
    if (files.TVPoster) {
        input.Poster = await _fileService.createFile(files.TVPoster[0])
    }
    if (files.TVCoverPoster) {
        const filePathPoster = await _fileService.createFile(files.TVCoverPoster[0])
        input.CoverPoster = filePathPoster
    }
    const TVSeasonCreate = await TVSeasonModel.create(input)
    return ({
        isSuccess: true,
        msgString: 'Create Success'
    })
}

const updateTVSeasonHandler = async (TVSeasonId: String, input: TVSeasonUpdate, files: any) => {
    if (files.TVPoster) {
        input.Poster = await _fileService.createFile(files.TVPoster[0])
    }
    if (files.TVCoverPoster) {
        const filePathPoster = await _fileService.createFile(files.TVCoverPoster[0])
        input.CoverPoster = filePathPoster
    }
    const TVSeasonUpdate = await TVSeasonModel.updateOne({ _id: TVSeasonId }, { $set: input })
    return ({
        isSuccess: true,
        msgString: 'Create Success'
    })
}

const deleteTVSeasonHandler = async (input: String) => {
    const TVSeasoneDelete = await TVSeasonModel.deleteOne({ _id: input })
}

export {
    getListTVSeasonHandler,
    getTVSeasonByIdHandler,
    createTVSeasonHandler,
    updateTVSeasonHandler,
    deleteTVSeasonHandler
}