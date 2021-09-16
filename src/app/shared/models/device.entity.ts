export class DeviceAlarmData {
	deviceTag: string;
	site: string;
	plant: string;
	area: string;
	unit: string;
	unitDescription: string;
	systemNumber: string;
	lineNumber: string;
	lineCriticality: string;
	breakerPanel: string;
	controlPanel: string;
	deviceType: string;
	temperatureSource1Celsius: string;
	temperatureSource2Celsius: string;
	controlTemperatureCelsius: string;
	lineCurrentA: string;
	groundFaultCurrentmA: string;
	voltageV: string;
	powerW: string;
	outputState: string;
	alarmState: string;
	onlineStatus: string;
	lastUpdatedAt: string;
	alarmDetails: AlarmDetails[];
}

export class AlarmDetails {
	devicePriority: string;
	deviceTag: string;
	description: string;
	value: string;
	setting: string;
	status: string;
	userName: string;
	alarmPriority: string;
	alarmType: string;
	timestamp: number;
	shelvedTimeRemaining: string;
	state: boolean;
}
