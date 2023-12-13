import mongoose, { Schema } from 'mongoose';
import { MachineType, WeldingRobotPart } from "../../native-app/data/types";

type MachineScore = {
	[key in MachineType]?: any
}
const MachineTypeValues = Object.values(MachineType);
const machineScoresSchemaDefinition : MachineScore = {};
MachineTypeValues.forEach(type => {
	machineScoresSchemaDefinition[type] = { type: String, required: false };
});

type MachineRecord = {
	[key in MachineType]?: { [key in WeldingRobotPart]?: any }
}

const machineHealthSchema = new Schema({
	userId: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	factoryScore: { type: Number, required: true },
	machineScores: {
		type: new Schema(machineScoresSchemaDefinition, { _id: false }),
		required: false
	},
})

const MachineHealthModel = mongoose.model('MachineHealth', machineHealthSchema)
export default MachineHealthModel;

