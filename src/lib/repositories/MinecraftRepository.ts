import { RESTART_ACTION_NAME, START_ACTION_NAME, STOP_ACTION_NAME, type MinecraftActionResult, type MinecraftLogs, type MinecraftServer } from '$lib/types/minecraft';
import { get, post } from '$lib/utils/seek';

const BASE_URL = "minecraft";

export async function getServerInfo(): Promise<MinecraftServer> {
	return await get<MinecraftServer>(`${BASE_URL}/activity`);
}

export async function getServerLogs(lines = 200): Promise<MinecraftLogs> {
	const url = `${BASE_URL}/logs?lines=${encodeURIComponent(lines)}`;
	return await get<MinecraftLogs>(url);
}

export function startServer(): Promise<MinecraftActionResult> {
	return post<MinecraftActionResult>(`${BASE_URL}/${START_ACTION_NAME}`);
}

export function reStartServer(): Promise<MinecraftActionResult> {
	return post<MinecraftActionResult>(`${BASE_URL}/${RESTART_ACTION_NAME}`);
}

export function stopServer(): Promise<MinecraftActionResult> {
	return post<MinecraftActionResult>(`${BASE_URL}/${STOP_ACTION_NAME}`);
}
