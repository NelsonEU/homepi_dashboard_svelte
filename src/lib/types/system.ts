export type Cpu = {
	temperature: number;
	highTemperature: number;
	criticalTemperature: number;
	temperatureStatus: "normal" | "warning" | "critical" | "unknown";
	usage: number;
};

export type Memory = {
	ram: Ram;
	disk: Disk;
};

export type Ram = {
	total_bytes: number;
	used_bytes: number;
	percent: number;
	total_gb: number;
	used_gb: number;
};

export type Disk = {
	total_bytes: number;
	used_bytes: number;
	free_bytes: number;
	percent: number;
	total_gb: number;
	used_gb: number;
	free_gb: number;
};