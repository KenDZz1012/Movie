import { Request, Response, NextFunction } from "express";
import { BadRequest, BaseResponse } from '../../../../common/base.response'
import SingleMovie from "../DTO/SingleMovie";
import Router from '../../../../decorators/routes.decorator';
import extractJWT from "../../../middlewares/extractJWT";
import upload from "../../../middlewares/uploadImage";
import { getAllSingleMovieHandler, getSingleMovieByIdHandler, createSingleMovieHandler, updateSingleMovieHandler, deleteSingleMovieHandler } from '../Repositories/SingleMovieRepository'
import validationMiddleware from "../../../middlewares/validation";
import SingleMovieFilter from "../DTO/SingleMovieFilter";
import SingleMovieCreate from "../DTO/SingleMovieCreate";
import SingleMovieUpdate from "../DTO/SingleMovieUpdate";
import HttpException from "../../../../Exceptions/HttpException";
import * as fs from 'fs';
import Pageable from "../DTO/Pageable";
const baseUrl = `api/v1/SingleMovie`

export class SingleMovieController {

    @Router({
        path: `/${baseUrl}/getListSingleMovie`,
        method: 'get',
        middlewares: [extractJWT, validationMiddleware(SingleMovieFilter)]
    })
    public async GetListSingleMovie(req: Request, res: Response) {
        const filter = req.query as unknown  as SingleMovieFilter
        const pageable = req.query as unknown as Pageable
        const movies = await getAllSingleMovieHandler(filter,pageable);
        return res.status(200).send(new BaseResponse<SingleMovie[]>(movies, "Get Success", true))
    }

    @Router({
        path: `/${baseUrl}/GetSingleMovieById/:SingleMovieId`,
        method: 'get',
        middlewares: [extractJWT]
    })
    private async GetSingleMovieById(req: Request, res: Response, next: NextFunction) {
        try {
            const { SingleMovieId } = req.params;
            const SingleMovie = await getSingleMovieByIdHandler(SingleMovieId);
            return res.status(200).send(new BaseResponse<SingleMovie>(SingleMovie, "Get Success", true))
        }
        catch (error) {
            console.log(error)
        }

    }
    @Router({
        path: `/${baseUrl}/GetVideo/Folder=:Folder&Movie=:Movie&YearProduce=:YearProduce`,
        method: 'get',
    })
    private async GetVideoByMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { Folder, Movie, YearProduce } = req.params
            const path = `src/public/${Folder}/${Movie}-${YearProduce}.mp4`;
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
        path: `/${baseUrl}/CreateSingleMovie`,
        method: 'post',
        middlewares: [extractJWT, validationMiddleware(SingleMovieCreate), upload.fields([
            { name: "MoviePoster" },
            { name: "MovieVideo" },
            { name: "MovieCoverPoster" }
        ])]
    })
    private async CreateSingleMovie(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        const response = await createSingleMovieHandler(req.body, req.files);
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
        path: `/${baseUrl}/UpdateSingleMovie/:SingleMovieId`,
        method: 'put',
        middlewares: [extractJWT, validationMiddleware(SingleMovieUpdate), upload.fields([
            { name: "MoviePoster" },
            { name: "MovieVideo" }
        ])]
    })
    private async UpdateSingleMovie(req: Request, res: Response, next: NextFunction) {
        const { SingleMovieId } = req.params
        const Movie = await updateSingleMovieHandler(SingleMovieId, req.body, req.files)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Update Success"
        })
    }

    @Router({
        path: `/${baseUrl}/DeleteSingleMovie/:SingleMovieId`,
        method: 'delete',
        middlewares: [extractJWT]
    })
    private async DeleteMovie(req: Request, res: Response, next: NextFunction) {
        const { SingleMovieId } = req.params
        await deleteSingleMovieHandler(SingleMovieId)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Delete Success"
        })
    }

}