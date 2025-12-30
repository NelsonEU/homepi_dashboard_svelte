<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import PillStatus from '$lib/components/PillStatus.svelte';
	import Button from '$lib/components/Button.svelte';

	import { getPinggyStatus, restartPinggy } from '$lib/repositories/PinggyRepository';

	let status: boolean | null = null;
	let loading = true;

	async function load() {
		const res = await getPinggyStatus();
		status = res.active;
		loading = false;
	}

	async function restart() {
		await restartPinggy();
		setTimeout(load, 1500);
	}

	onMount(() => {
		load();
		const i = setInterval(load, 5000);
		return () => clearInterval(i);
	});
</script>

<Card>
	<h2 class="section-subtitle">
		Pinggy tunnel
		<PillStatus status={status ? 'online' : 'offline'} value={status ? 'Active' : 'Inactive'} />
	</h2>

	<Button label="Restart" variant="neutral" onClick={restart} style="width: fit-content;"/>
	{#if loading}
		<div class="text-muted">Loading…</div>
	{/if}
</Card>
