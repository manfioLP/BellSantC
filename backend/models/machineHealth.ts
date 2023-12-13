import mongoose, { Schema } from 'mongoose';
import { MachineType, WeldingRobotPart } from "../../native-app/data/types";

type MachineScore = {
	[key in MachineType]?: any
}
const MachineTypeValues = Object.values(MachineType);
const machineScoresSchemaDefinition : MachineScore = {};
MachineTypeValues.forEach(type => {
	machineScoresSchemaDefinition[type] = { type: Number, required: false };
});

type MachineRecord = {
	[key in MachineType]?: { [key in WeldingRobotPart]?: any }
}
const MachinePartsValues = Object.values(WeldingRobotPart);
const machineSchemaDefinition : MachineRecord = {}

MachineTypeValues.forEach(type => {
	const _machine = machineSchemaDefinition[type]
	MachinePartsValues.forEach(part => {
		if (!_machine) {
			machineSchemaDefinition[type] = {
				[part]: { type: Number, required: false },
			}
		} else {
			_machine[part] = { type: Number, required: false };
		}
	})
	machineSchemaDefinition[type] = _machine
});


const machineHealthSchema = new Schema({
	userId: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	factoryScore: { type: Number, required: true },
	machineScores: {
		type: new Schema(machineScoresSchemaDefinition, { _id: false }),
		required: false
	},
	machines: {
		type: Map,
		of: new Schema(machineSchemaDefinition, { _id: false })
	},
})

export const MachineHealthModel = mongoose.model('MachineHealth', machineHealthSchema)

