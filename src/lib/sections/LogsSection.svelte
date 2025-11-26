<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { getServerLogs } from '$lib/repositories/MinecraftRepository';
	import type { MinecraftLogs } from '$lib/types/minecraft';
	import { onMount } from 'svelte';

	let logs: MinecraftLogs | null = null;
	let error: string | null = null;
	let logsContainer: HTMLDivElement | null = null;
	let initialLoading = true;

	async function loadLogs({ asPoll = false } = {}) {
		try {
			error = null;
			if (!asPoll) initialLoading = true;

			const logsRes = await getServerLogs();
			if (logs?.lines !== logsRes.lines) {
				logs = logsRes;
			}
		} catch (e) {
			error = (e as Error).message;
		} finally {
			initialLoading = false;
		}
	}

	onMount(() => {
		loadLogs({ asPoll: false });
		const interval = setInterval(() => loadLogs({ asPoll: true }), 5000);
		return () => clearInterval(interval);
	});

	$: if (logsContainer && logs?.lines) {
		const nearBottom =
			logsContainer.scrollHeight - logsContainer.scrollTop - logsContainer.clientHeight < 40;

		if (nearBottom) {
			logsContainer.scrollTop = logsContainer.scrollHeight;
		}
	}
</script>

<div class="section-title">Minecraft logs</div>

<Card>
	<div class="minecraft-logs" bind:this={logsContainer}>
		{#if initialLoading}
			<pre>Loading logs...</pre>
		{:else if error}
			<pre style="color: #ef4444">Error: {error}</pre>
		{:else if logs && logs.ok}
			<pre>{logs.lines}</pre>
		{:else}
			<pre>No logs available.</pre>
		{/if}
	</div>
</Card>

<style>
	.minecraft-logs {
		max-height: 320px;
		overflow-y: auto;
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		font-size: 0.8rem;
		white-space: pre-wrap;
		background: #020617;
		border-radius: 0.5rem;
		border: 1px solid rgba(148, 163, 184, 0.2);
		padding: 0.75rem;
	}
</style>
