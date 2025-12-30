import { get, post } from '$lib/utils/seek';

export type PinggyStatus = {
	active: boolean;
	since: string | null;
};

export function getPinggyStatus(): Promise<PinggyStatus> {
	return get<PinggyStatus>('pinggy/status');
}

export function restartPinggy(): Promise<{ ok: boolean }> {
	return post<{ ok: boolean }>('pinggy/restart');
}
