import type { Cpu, Memory } from "$lib/types/system";
import { get } from "$lib/utils/seek";

const BASE_URL = "system";

export async function getCPUInfo(): Promise<Cpu> {
	return await get<Cpu>(`${BASE_URL}/cpu`);
}

export async function getMemoryInfo(): Promise<Memory> {
	return await get<Memory>(`${BASE_URL}/memory`);
}
