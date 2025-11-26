import { get } from "$lib/utils/seek";

// TODO Arnaud: make host an env or process variable
const HOST = "http://localhost:8000";
const BASE_URL = `${HOST}/api/system`;

export async function getCPUInfo(): Promise<Cpu> {
	return await get<Cpu>(`${BASE_URL}/cpu`);
}

export async function getMemoryInfo(): Promise<Memory> {
	return await get<Memory>(`${BASE_URL}/memory`);
}

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
