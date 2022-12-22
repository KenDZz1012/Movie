import mongoose from "mongoose";
import Bill from "../DTO/Bill";

const BillSchema = new mongoose.Schema({
    Client: {
        type: mongoose.Types.ObjectId,
        ref: "tbl_Client"
    },
    Bundle: {
        type: mongoose.Types.ObjectId,
        ref: "tbl_Bundle"
    },
    TotalPrice: {
        type: Number,
        require: true
    },
    DateBuy: {
        type: Date,
        default: new Date()
    },
    DateEnd: {
        type: Date,
    }
}, { timestamps: true })

const BillModel = mongoose.model<Bill>("tbl_Bill", BillSchema);
export default BillModel;