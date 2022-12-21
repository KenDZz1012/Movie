import TVEpisodeModel from "../Models/TVEpisodeModel";
import TVEpisodeCreate from "../DTO/TVEpisodeCreate";
import TVEpisodeFilter from "../DTO/TVEpisodeFilter";
import TVEpisode from "../DTO/TVEpisode";
import TVEpisodeUpdate from "../DTO/TVEpisodeUpdate";
import { FileService } from "../../../middlewares/FileService";
import { updateTVSeasonHandler } from "../../TVSeason/Repositories/TVSeasonRepository";
import TVSeasonUpdate from "../../TVSeason/DTO/TVSeasonUpdate";
const _fileService = new FileService();
const getAllTVEpisodeHandler = async (input: string) => {
    console.log(input)
    return await TVEpisodeModel.find({ 'Movie': input }).populate('Movie')
}

const getTVEpisodeByIdHandler = async (input: String) => {
    return await TVEpisodeModel.findById(input).populate('Movie')
}

const createTVEpisodeHandler = async (input: TVEpisodeCreate, file: any) => {
    if (file) {
        input.Video = `TVVideo/${input.Movie}-${input.Episode}.mp4`
    }
    console.log(input)
    const movieCreate = await TVEpisodeModel.create(input)
    const updateTimeTVSeason = new TVSeasonUpdate()
    updateTimeTVSeason.CreatedTime = new Date()
    updateTVSeasonHandler(input.Movie, updateTimeTVSeason, file)
    return ({
        isSuccess: true,
        msgString: 'Create Success'
    })
}

const updateTVEpisodeHandler = async (TVEpisodeId: String, input: TVEpisodeUpdate, file: any) => {
    if (file) {
        input.Video = `TVVideo/${input.Movie}-${input.Episode}.mp4`
    }
    const movieUpdate = await TVEpisodeModel.updateOne({ _id: TVEpisodeId }, { $set: input })
    const updateTimeTVSeason = new TVSeasonUpdate()
    updateTimeTVSeason.CreatedTime = new Date()
    updateTVSeasonHandler(input.Movie, updateTimeTVSeason, file)
    return ({
        isSuccess: true,
        msgString: 'Create Success'
    })
}

const deleteTVEpisodeHandler = async (input: String) => {
    const movieDelete = await TVEpisodeModel.deleteOne({ _id: input })
}

export {
    getAllTVEpisodeHandler,
    getTVEpisodeByIdHandler,
    createTVEpisodeHandler,
    updateTVEpisodeHandler,
    deleteTVEpisodeHandler
}