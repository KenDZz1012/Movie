import { Request, Response, NextFunction } from "express";
import { BadRequest, BaseResponse } from '../../../../common/base.response'
import SingleMovie from "../../SingleMovie/DTO/SingleMovie";
import Router from '../../../../decorators/routes.decorator';
import extractJWT from "../../../middlewares/extractJWT";
import upload from "../../../middlewares/uploadImage";
import { getAllSingleMovieHandler, getSingleMovieByIdHandler, createSingleMovieHandler, updateSingleMovieHandler, deleteSingleMovieHandler } from '../../SingleMovie/Repositories/SingleMovieRepository'
import validationMiddleware from "../../../middlewares/validation";
import SingleMovieUpdate from "../../SingleMovie/DTO/SingleMovieUpdate";
import HttpException from "../../../../Exceptions/HttpException";
import * as fs from 'fs';
const baseUrl = `api/v1/Site`

export class SiteController {
    
}