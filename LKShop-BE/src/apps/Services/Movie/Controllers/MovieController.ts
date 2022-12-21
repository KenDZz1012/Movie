import { Request, Response, NextFunction } from "express";
import { BadRequest, BaseResponse } from '../../../../common/base.response'
import Movie from "../DTO/Movie";
import Router from '../../../../decorators/routes.decorator';
import extractJWT from "../../../middlewares/extractJWT";
import upload from "../../../middlewares/uploadImage";
import { getAllMovieHandler, getMovieByIdHandler, createMovieHandler, updateMovieHandler, deleteMovieHandler } from '../Repositories/MovieRepository'
import validationMiddleware from "../../../middlewares/validation";
import MovieFilter from "../DTO/MovieFilter";
import MovieCreate from "../DTO/MovieCreate";
import MovieUpdate from "../DTO/MovieUpdate";
import HttpException from "../../../../Exceptions/HttpException";
import * as fs from 'fs';
import Pageable from "../DTO/Pageable";

const baseUrl = "api/v1/Movie"

export class MovieController {
    @Router({
        path: `/${baseUrl}/GetAllMovie`,
        method: 'get',
        middlewares: [extractJWT, validationMiddleware(MovieFilter)]
    })
    private async GetAllMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const filter = req.query as unknown as MovieFilter
            const pageable = req.query as unknown as Pageable
            const movies = await getAllMovieHandler(filter,pageable);
            return res.status(200).send(new BaseResponse<Movie[]>(movies, "Get Success", true))
        }
        catch (error) {
            console.log(error)
        }
    }

    @Router({
        path: `/${baseUrl}/GetMovieById/:MovieId`,
        method: 'get',
        middlewares: [extractJWT]
    })
    private async GetAllMovieById(req: Request, res: Response, next: NextFunction) {
        try {
            const { MovieId } = req.params;
            const Movie = await getMovieByIdHandler(MovieId);
            return res.status(200).send(new BaseResponse<Movie>(Movie, "Get Success", true))
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
        path: `/${baseUrl}/CreateMovie`,
        method: 'post',
        middlewares: [extractJWT, validationMiddleware(MovieCreate), upload.fields([
            { name: "MoviePoster" },
            { name: "MovieVideo" },
            { name: "MovieCoverPoster" }
        ])]
    })
    private async CreateMovie(req: Request, res: Response, next: NextFunction) {
        const response = await createMovieHandler(req.body, req.files);
        if (!response) {
            return next(new HttpException(400, response.msgString))
        }
        else {
            return res.status(201).send({
                data: response.data,
                isSuccess: response.isSuccess,
                message: response.msgString
            })
        }
    }

    @Router({
        path: `/${baseUrl}/UpdateMovie/:MovieId`,
        method: 'put',
        middlewares: [extractJWT, validationMiddleware(MovieUpdate), upload.fields([
            { name: "MoviePoster" },
            { name: "MovieVideo" },
            { name: "MovieCoverPoster" }
        ])]
    })
    private async UpdateMovie(req: Request, res: Response, next: NextFunction) {
        const { MovieId } = req.params
        const Movie = await updateMovieHandler(MovieId, req.body, req.files)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Update Success"
        })
    }

    @Router({
        path: `/${baseUrl}/DeleteMovie/:MovieId`,
        method: 'delete',
        middlewares: [extractJWT]
    })
    private async DeleteMovie(req: Request, res: Response, next: NextFunction) {
        const { MovieId } = req.params
        await deleteMovieHandler(MovieId)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Delete Success"
        })
    }
}