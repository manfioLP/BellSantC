import {Request} from "express";
import {MachineHealthModel} from "./models";

export const getHistoryData = async (req: Request) => {
	// todo: add pagination
	try {
		const history = await MachineHealthModel.find({userId: req.userId}).sort({timestamp: -1}).limit(100)
		return {history};
	} catch (err) {
		console.error(err)
		return { error: "Error retrieving machine history data from DB", status: 400 };
	}

}
