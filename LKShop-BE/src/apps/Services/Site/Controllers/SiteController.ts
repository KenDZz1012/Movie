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
import paypal from "../../../functions/paypal";
import { getListMovieByName } from '../Repositories/SiteRepository'
import Movie from "../../Movie/DTO/Movie";
import MovieFilter from "../../Movie/DTO/MovieFilter";
import Pageable from "../DTO/Pageable";
const baseUrl = `api/v1/Site`

export class SiteController {
    @Router({
        path: `/${baseUrl}/PayBundle`,
        method: 'post',
        // middlewares: [extractJWT]
    })
    private async payBundle(req: Request, res: Response, next: NextFunction) {
        const url = req.get('Host')
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "https://" + url + "/PaySuccess",
                "cancel_url": "/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": 'abc',
                        "sku": "001",
                        "price": '12',
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": '12'
                },
                "description": "LK Convert Premium"
            }]
        };
        paypal.payment.create(create_payment_json, async function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {

                        res.redirect(payment.links[i].href);
                    }
                }

            }
        });

    }


    @Router({
        path: `/${baseUrl}/PaySuccess`,
        method: 'post',
        // middlewares: [extractJWT]
    })
    private async paySuccess(req: Request, res: Response, next: NextFunction) {

        const payerId = req.query.PayerID;
        const paymentId: any = req.query.paymentId;
        const execute_payment_json: any = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "12"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                res.send('OK')
            }
        });
    }


    @Router({
        path: `/${baseUrl}/GetMovieByMovieName`,
        method: 'get',
        // middlewares: [extractJWT]
    })
    private async getMovieByName(req: Request, res: Response, next: NextFunction) {
        try {
            const movieFilter = req.query as unknown as MovieFilter
            const pageable = req.query as unknown as Pageable
            const movies = await getListMovieByName(movieFilter, pageable);
            return res.status(200).send(new BaseResponse<Movie[]>(movies, "Get Success", true))
        }
        catch (error) {
            console.log(error)
        }
    }

    // const postPay = async (req, res) => {
    //     let today = new Date();
    //     const yyyy = today.getFullYear();
    //     let mm = today.getMonth() + 1;
    //     let dd = today.getDate();
    //     if (dd < 10) dd = '0' + dd;
    //     if (mm < 10) mm = '0' + mm;
    //     let endMonth = parseInt(mm) + 1
    //     today = yyyy + "-" + mm + '-' + dd
    //     dayEnd = yyyy + "-" + '0' + endMonth + '-' + dd
    //     let name = req.body.priceName;
    //     let price = req.body.pricePrice;
    //     const url = req.get('Host')
    //     console.log(url)
    //     let user = {
    //         PriceId: req.body.priceId,
    //         dayBuy: today,
    //         convertCount: 200,
    //         dayEnd: dayEnd
    //     }
    //     getPrice = price.toString();
    //     const create_payment_json = {
    //         "intent": "sale",
    //         "payer": {
    //             "payment_method": "paypal"
    //         },
    //         "redirect_urls": {
    //             "return_url": "https://" + url + "/success",
    //             "cancel_url": "/cancel"
    //         },
    //         "transactions": [{
    //             "item_list": {
    //                 "items": [{
    //                     "name": name,
    //                     "sku": "001",
    //                     "price": price.toString(),
    //                     "currency": "USD",
    //                     "quantity": 1
    //                 }]
    //             },
    //             "amount": {
    //                 "currency": "USD",
    //                 "total": price.toString()
    //             },
    //             "description": "LK Convert Premium"
    //         }]
    //     };
    //     paypal.payment.create(create_payment_json, async function (error, payment) {
    //         if (error) {
    //             throw error;
    //         } else {
    //             for (let i = 0; i < payment.links.length; i++) {
    //                 if (payment.links[i].rel === 'approval_url') {
    //                     let bill = {
    //                         userId: req.body.userId,
    //                         priceId: req.body.priceId,
    //                         totalPrice: price,
    //                         day: today,
    //                         status: "Đã thanh toán"
    //                     }
    //                     await UserModel.updateOne({ _id: req.body.userId }, { $set: user })
    //                     await BillModel(bill).save()
    //                     const userOne = await UserModel.findOne({ _id: req.body.userId })
    //                     console.log(userOne)
    //                     const viewPath = req.app.get('views');
    //                     const html = await ejs.renderFile(
    //                         path.join(viewPath, 'site/mail.ejs'),
    //                         {
    //                             username: userOne.username,
    //                             email: userOne.email,
    //                             price: price,
    //                             name: name,
    //                         }
    //                     );
    //                     await transporter.sendMail({
    //                         to: userOne.email,
    //                         from: "LK Shop",
    //                         subject: "Xác nhận đơn hàng từ LK GEAR",
    //                         html,
    //                     })
    //                     res.redirect(payment.links[i].href);
    //                 }
    //             }

    //         }
    //     });
    // }
}