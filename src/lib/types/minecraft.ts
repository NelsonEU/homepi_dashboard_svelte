export const START_ACTION_NAME = "start";
export const RESTART_ACTION_NAME = "restart";
export const STOP_ACTION_NAME = "stop";

export type MinecraftServerStatus = 'online' | 'offline';

export type MinecraftActions =
	| typeof START_ACTION_NAME
	| typeof RESTART_ACTION_NAME
	| typeof STOP_ACTION_NAME;

export type MinecraftPlayers = {
	online: number;
	max: number;
	sample_names: string[];
};

export type MinecraftProcess = {
	ok: boolean;
	state: string;          
	error: string | null;
};

export type MinecraftMood = 'offline' | 'chill' | 'normal' | 'busy';

export type MinecraftServer = {
	online: boolean;
	latency_ms: number | null;
	version: string | null;
	players: MinecraftPlayers | null;
	error: string | null;
	process: MinecraftProcess;
	cpu_percent: number;
	mood: MinecraftMood;
};

export type MinecraftLogs = {
	ok: boolean;
	lines: string;
	count?: number;
	path?: string;
	error?: string;
};

export type MinecraftActionResult = {
	ok: boolean;
	stdout: string;
	stderr: string;
	returncode: number | null;
};
