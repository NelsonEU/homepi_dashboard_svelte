<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import MetricRow from '$lib/components/MetricRow.svelte';
	import PillStatus from '$lib/components/PillStatus.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import Button from '$lib/components/Button.svelte';

	import {
		getServerInfo,
		startServer,
		reStartServer,
		stopServer
	} from '$lib/repositories/MinecraftRepository';

	import {
		type MinecraftServer,
		type MinecraftMood,
		type MinecraftActionResult,
		type MinecraftActions,
		START_ACTION_NAME,
		RESTART_ACTION_NAME,
		STOP_ACTION_NAME
	} from '$lib/types/minecraft';

	let server: MinecraftServer | null = null;
	let loading = true;
	let error: string | null = null;

	let actionMessage: string | null = null;
	let actionInProgress: 'start' | 'restart' | 'stop' | null = null;

	// --- Helpers ---

	function mapOnlineLabel(s: MinecraftServer | null): string {
		if (!s) return 'Unknown';
		return s.online ? 'Online' : 'Offline';
	}

	function mapOnlineStatus(s: MinecraftServer | null): 'online' | 'offline' {
		if (!s) return 'offline';
		return s.online ? 'online' : 'offline';
	}

	function mapMoodToVariant(mood: MinecraftMood | null): 'ok' | 'warn' | 'crit' | 'offline' {
		if (!mood || mood === 'offline') return 'offline';
		if (mood === 'chill') return 'ok';
		if (mood === 'normal') return 'warn';
		return 'crit'; // 'busy'
	}

	function formatPlayers(s: MinecraftServer | null): string {
		if (!s || !s.players) return '–';
		const { online, max, sample_names } = s.players;
		const names =
			sample_names && sample_names.length > 0 ? ` [${sample_names.join(', ')}]` : '';
		return `${online}/${max}${names}`;
	}

	function formatLatency(s: MinecraftServer | null): string {
		if (!s || s.latency_ms == null) return '–';
		return `${s.latency_ms.toFixed(1)} ms`;
	}

	// --- Data loading ---

	async function loadServer() {
		try {
			error = null;
			const data = await getServerInfo();
			server = data;
		} catch (e) {
			error = (e as Error).message;
		} finally {
			loading = false;
		}
	}

	// --- Actions ---

	async function runAction(kind: MinecraftActions) {
		actionInProgress = kind;
		actionMessage = `Calling ${kind}...`;

		let result: MinecraftActionResult | null = null;

		try {
			if (kind === START_ACTION_NAME) {
				result = await startServer();
			} else if (kind === RESTART_ACTION_NAME) {
				result = await reStartServer();
			} else if (kind === STOP_ACTION_NAME) {
				result = await stopServer();
			} else {
				console.log("Wrong action!");
			}

			if (result?.ok) {
				actionMessage = `Action '${kind}' sent successfully.`;
			} else {
				actionMessage = `Action '${kind}' failed: ${result?.stderr || 'unknown error'}`;
			}
		} catch (e) {
			actionMessage = `Action '${kind}' failed: ${(e as Error).message}`;
		} finally {
			actionInProgress = null;
			setTimeout(loadServer, 1500);
		}
	}

	onMount(() => {
		loadServer();
		const interval = setInterval(loadServer, 5000);
		return () => clearInterval(interval);
	});
</script>

<div class="section-title">Minecraft</div>

{#if error}
	<div class="text-muted">Failed to load Minecraft info: {error}</div>
{/if}

<div class="grid">
	<!-- Status Card -->
	<Card>
		<h2 class="section-subtitle">
			Status
			<PillStatus status={mapOnlineStatus(server)} value={mapOnlineLabel(server)} />
		</h2>

		<MetricRow label="Process" value={server ? server.process.state : '–'} />
		<MetricRow label="Players" value={formatPlayers(server)} />
		<MetricRow label="Version" value={server ? server.version ?? '–' : '–'} />
		<MetricRow label="Latency" value={formatLatency(server)} />
	</Card>

	<!-- Actions Card -->
	<Card>
		<h2 class="section-subtitle">
			Actions
			<StatusBadge
				label={server ? server.mood : '…'}
				variant={mapMoodToVariant(server ? server.mood : null)}
			/>
		</h2>
		<div class="actions">
			<div class="action-buttons">
				<Button
					label="Start"
					variant="primary"
					disabled={!!actionInProgress}
					onClick={() => runAction(START_ACTION_NAME)}
				/>
				<Button
					label="Restart"
					variant="neutral"
					disabled={!!actionInProgress}
					onClick={() => runAction(RESTART_ACTION_NAME)}
				/>
				<Button
					label="Stop"
					variant="danger"
					disabled={!!actionInProgress}
					onClick={() => runAction(STOP_ACTION_NAME)}
				/>
			</div>
		</div>
		<div class="text-muted">
			{#if actionMessage}
				{actionMessage}
			{:else if loading}
				Loading Minecraft status...
			{/if}
		</div>
	</Card>
</div>

<style>
	.actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-top: 0.75rem;
	}

	.actions > .action-buttons {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 12px;
	}
</style>
