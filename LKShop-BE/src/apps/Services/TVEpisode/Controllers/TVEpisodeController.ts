import { Request, Response, NextFunction } from "express";
import { BadRequest, BaseResponse } from '../../../../common/base.response'
import TVEpisode from "../DTO/TVEpisode";
import Router from '../../../../decorators/routes.decorator';
import extractJWT from "../../../middlewares/extractJWT";
import upload from "../../../middlewares/uploadImage";
import { getAllTVEpisodeHandler, getTVEpisodeByIdHandler, createTVEpisodeHandler, updateTVEpisodeHandler, deleteTVEpisodeHandler } from '../Repositories/TVEpisodeRepository'
import validationMiddleware from "../../../middlewares/validation";
import TVEpisodeFilter from "../DTO/TVEpisodeFilter";
import TVEpisodeCreate from "../DTO/TVEpisodeCreate";
import TVEpisodeUpdate from "../DTO/TVEpisodeUpdate";
import HttpException from "../../../../Exceptions/HttpException";
import * as fs from 'fs';

const baseUrl = `api/v1/TVEpisode`

export class TVEpisodeController {

    @Router({
        path: `/${baseUrl}/getListTVEpisode/:TVSeasonId`,
        method: 'get',
        middlewares: [extractJWT]
    })
    public async GetListTVEpisodeByTVSeasonId(req: Request, res: Response) {
        const { TVSeasonId } = req.params;
        const movies = await getAllTVEpisodeHandler(TVSeasonId);
        return res.status(200).send(new BaseResponse<TVEpisode[]>(movies, "Get Success", true))
    }

    @Router({
        path: `/${baseUrl}/GetTVEpisodeById/:TVEpisodeId`,
        method: 'get',
        middlewares: [extractJWT]
    })
    private async GetTVEpisodeById(req: Request, res: Response, next: NextFunction) {
        try {
            const { TVEpisodeId } = req.params;
            const TVEpisode = await getTVEpisodeByIdHandler(TVEpisodeId);
            return res.status(200).send(new BaseResponse<TVEpisode>(TVEpisode, "Get Success", true))
        }
        catch (error) {
            console.log(error)
        }

    }

    @Router({
        path: `/${baseUrl}/GetVideo/Folder=:Folder&Season=:Season&Episode=:Episode`,
        method: 'get',
    })
    private async GetVideoByMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { Folder, Season, Episode } = req.params
            const path = `src/public/${Folder}/${Season}-${Episode}.mp4`;
            console.log(path)
            const stat = fs.statSync(path);
            console.log(stat)
            const fileSize = stat.size;
            const range = req.headers.range;
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1]
                    ? parseInt(parts[1], 10)
                    : fileSize - 1;
                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(path, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                };
                console.log(path)
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                };
                console.log('path', path)
                res.writeHead(200, head);
                fs.createReadStream(path).pipe(res);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    @Router({
        path: `/${baseUrl}/CreateTVEpisode`,
        method: 'post',
        middlewares: [extractJWT, validationMiddleware(TVEpisodeCreate), upload.single("TVVideo")]
    })
    private async CreateTVEpisode(req: Request, res: Response, next: NextFunction) {
        const response = await createTVEpisodeHandler(req.body, req.file);
        if (!response) {
            return next(new HttpException(400, response.msgString))
        }
        else {
            return res.status(201).send({
                isSuccess: response.isSuccess,
                message: response.msgString
            })
        }
    }

    @Router({
        path: `/${baseUrl}/UpdateTVEpisode/:TVEpisodeId`,
        method: 'put',
        middlewares: [extractJWT, validationMiddleware(TVEpisodeUpdate), upload.single("TVVideo")]
    })
    private async UpdateTVEpisode(req: Request, res: Response, next: NextFunction) {
        const { TVEpisodeId } = req.params
        const Movie = await updateTVEpisodeHandler(TVEpisodeId, req.body, req.file)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Update Success"
        })
    }

    @Router({
        path: `/${baseUrl}/DeleteTVEpisode/:TVEpisodeId`,
        method: 'delete',
        middlewares: [extractJWT]
    })
    private async DeleteMovie(req: Request, res: Response, next: NextFunction) {
        const { TVEpisodeId } = req.params
        await deleteTVEpisodeHandler(TVEpisodeId)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Delete Success"
        })
    }

}