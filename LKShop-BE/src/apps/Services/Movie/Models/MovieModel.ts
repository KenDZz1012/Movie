import mongoose from "mongoose";
import { PopulatedDoc } from 'mongoose';
import Movie from "../DTO/Movie";

const MovieSchema = new mongoose.Schema({
    MovieName: { type: String, require: true },
    Category: [{
        type: mongoose.Types.ObjectId,
        ref: "tbl_Category"
    }],
    Director: [{
        type: mongoose.Types.ObjectId,
        ref: "tbl_Celebrity"
    }],
    Actor: [{
        type: mongoose.Types.ObjectId,
        ref: "tbl_Celebrity"
    }],
    Country: {
        type: String,
        default: null,
    },
    Type: {
        type: String,
        default: null,
    },
    Poster: {
        type: String,
        default: null
    },
    CoverPoster: {
        type: String,
        default: null
    },
    Description: {
        type: String,
        default: null
    },
    RunTime: {
        type: String,
        default: null
    },
    Rating: {
        type: Number,
        default: 0
    },
    RateCount: {
        type: Number,
        default: 0
    },
    ViewCount: {
        type: Number,
        default: 0
    },
    YearProduce: {
        type: Number,
        default: null,
    },
    Trailer: {
        type: String,
        default: null
    },
    Video: {
        type: String,
        default: null
    },
    IsTrending: {
        type: Boolean,
        default: null,
    },
    Status: {
        type: String,
        default: null
    },
    Season: {
        type: Number,
        default: null,
    },
    CreatedTime: {
        type: Date,
        default: new Date()
    }

})
const myDB = mongoose.connection.useDb('KenStore');

const MovieModel = myDB.model<Movie>("tbl_Movie", MovieSchema);
export default MovieModel;