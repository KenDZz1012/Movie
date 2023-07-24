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
import CheckDateBuy from "../../../middlewares/CheckDateBuy";
const baseUrl = "api/v1/Movie"

export class MovieController {
    @Router({
        path: `/${baseUrl}/GetAllMovie`,
        method: 'get',
        middlewares: [extractJWT, validationMiddleware(MovieFilter), CheckDateBuy]
    })
    private async GetAllMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const filter = req.query as unknown as MovieFilter
            const pageable = req.query as unknown as Pageable
            const movies = await getAllMovieHandler(filter, pageable);
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
       
        const range = req.headers.range;
        if (!range) res.status(400).send("Range must be provided");

        const { Folder, Movie, YearProduce } = req.params
        const videoPath = `src/public/${Folder}/${Movie}-${YearProduce}.mp4`;
        // extract video size by using statSyn()
        const videoSize = fs.statSync(videoPath).size;
        // 10 powered by 6 equal 1000000bytes = 1mb
        const chunkSize = 10 ** 6;

        // calculating video where to start and where to end.
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;

        // setup video headers
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);
        // creating readStream (stdin).
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // create live stream pipe line
        videoStream.pipe(res);
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