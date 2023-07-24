import { Request, Response, NextFunction } from 'express'
import { getClientByIdHandler, updateClientHandler } from '../Services/Client/Repositories/ClientRepository'
import { getListBillHandler } from '../Services/Bill/Repositories/BillRepository';
import BillFilter from '../Services/Bill/DTO/BillFilter';
import Bill from '../Services/Bill/DTO/Bill';
import ClientUpdate from '../Services/Client/DTO/ClientUpdate';

const CheckDateBuy = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.ClientId || req.query.ClientId) {
        const id = req.body.ClientId || req.query.ClientId
        const Client = await getClientByIdHandler(id);
        if (Client?.IsPayment != null && Client.IsPayment) {
            let billFIlter = new BillFilter()
            billFIlter.Client = Client._id.toString()
            const bills = (await getListBillHandler(billFIlter))
            bills.map(async (item, index) => {
                if (index == 0) {
                    if (item.DateEnd.toLocaleDateString("en-GB") == new Date().toLocaleDateString("en-GB")) {
                        const dataUpdate = new ClientUpdate()
                        dataUpdate.IsPayment = false;
                        console.log(dataUpdate)
                        await updateClientHandler(id, dataUpdate, req.file)

                    }
                }
            })
        }
    }
    next()

}

export default CheckDateBuy