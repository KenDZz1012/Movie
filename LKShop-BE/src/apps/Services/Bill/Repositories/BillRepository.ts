import Bill from "../DTO/Bill";
import BillCreate from "../DTO/BillCreate";
import BillFilter from "../DTO/BillFilter";
import BillUpdate from "../DTO/BillUpdate";
import BillModel from "../Models/BillModel";

const getListBillHandler = async (input: BillFilter) => {
    return await BillModel.find(input)
}

const getBillByIdHandler = async (input: String) => {
    return await BillModel.findById(input)
}

const createBillHandler = async (input: BillCreate) => {
    const BillCreate = await BillModel.create(input)
    return {
        isSuccess: true,
        msgString: `Create Success`,
        data: BillCreate
    }
}

const updateBillHandler = async (BillId: String, input: BillUpdate) => {
    return await BillModel.updateOne({ _id: BillId }, { $set: input })
}

const deleteBillHandler = async (input: String) => {
    return await BillModel.deleteOne({ _id: input })
}

export {
    getListBillHandler,
    getBillByIdHandler,
    createBillHandler,
    updateBillHandler,
    deleteBillHandler
}