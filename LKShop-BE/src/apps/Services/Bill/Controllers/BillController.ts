import { getListBillHandler, createBillHandler, updateBillHandler, deleteBillHandler, getBillByIdHandler } from "../Repositories/BillRepository";
import e, { NextFunction, Request, Response } from 'express'
import { BadRequest, BaseResponse } from '../../../../common/base.response'
import Router from '../../../../decorators/routes.decorator';
import extractJWT from "../../../middlewares/extractJWT";
import upload from "../../../middlewares/uploadImage";
import Bill from "../DTO/Bill";
import validationMiddleware from "../../../middlewares/validation";
import BillFilter from "../DTO/BillFilter";
import BillCreate from "../DTO/BillCreate";
import BillUpdate from "../DTO/BillUpdate";
import HttpException from "../../../../Exceptions/HttpException";

const baseUrl = "api/v1/Bill"

export class BillController {


    @Router({
        path: `/${baseUrl}/GetListBill`,
        method: 'get',
        middlewares: [extractJWT, validationMiddleware(BillFilter)]
    })
    private async getListBill(req: Request, res: Response, next: NextFunction) {
        const Bills = await getListBillHandler(req.body);
        return res.status(200).send(new BaseResponse<Bill[]>(Bills, "Get Success", true))
    }



    @Router({
        path: `/${baseUrl}/GetBillById/:BillId`,
        method: 'get',
        middlewares: [extractJWT]
    })
    private async getBillById(req: Request, res: Response) {
        const { BillId } = req.params;
        const Bill = await getBillByIdHandler(BillId);
        return res.status(200).send(new BaseResponse<Bill>(Bill, "Get Success", true))
    }



    @Router({
        path: `/${baseUrl}/createBill`,
        method: 'post',
        middlewares: [extractJWT, validationMiddleware(BillCreate)]
    })
    private async createBill(req: Request, res: Response, next: NextFunction) {
        const Response = await createBillHandler(req.body);
        if (!Response.isSuccess) {
            next(new HttpException(400, Response.msgString))
        }
        else {
            return res.status(201).send({
                isSuccess: Response.isSuccess,
                msgString: Response.msgString
            })
        }

    }



    @Router({
        path: `/${baseUrl}/updateBill/:BillId`,
        method: 'put',
        middlewares: [extractJWT, validationMiddleware(BillUpdate)]
    })
    private async updateBill(req: Request, res: Response) {
        const { BillId } = req.params
        const Bill = await updateBillHandler(BillId, req.body)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Update Success"
        })
    }



    @Router({
        path: `/${baseUrl}/deleteBill/:BillId`,
        method: 'delete',
        middlewares: [extractJWT]
    })
    private async deleteBill(req: Request, res: Response) {
        const { BillId } = req.params
        await deleteBillHandler(BillId)
        return res.status(200).send({
            isSuccess: true,
            msgString: "Delete Success"
        })
    }
}
