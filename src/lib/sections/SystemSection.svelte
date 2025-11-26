<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import MetricRow from '$lib/components/MetricRow.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';

	import { getCPUInfo, getMemoryInfo, type Cpu, type Memory } from '$lib/repositories/SystemRepository';
	import { onDestroy, onMount } from 'svelte';

	let cpu = null as Cpu | null;
	let memory = null as Memory | null;

	let loading = true;
	let error: string | null = null;

	function mapTempStatusToVariant(status: Cpu['temperatureStatus']) {
		if (status === 'normal') return 'ok';
		if (status === 'warning') return 'warn';
		if (status === 'critical') return 'crit';
		return 'offline';
	}

	async function loadSystem() {
		try {
			error = null;
			const [cpuRes, memRes] = await Promise.all([
				getCPUInfo(),
				getMemoryInfo()
			]);

			cpu = cpuRes;
			memory = memRes;
		} catch (e) {
			error = (e as Error).message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadSystem();
		const interval = setInterval(loadSystem, 5000);
		return () => clearInterval(interval);
	});
</script>

<div class="section-title">System</div>

{#if error}
	<div class="text-muted">Failed to load system info: {error}</div>
{/if}

<div class="grid">
	<!-- CPU Card -->
	<Card>
		<h2 class="section-subtitle">
			CPU
			{#if cpu}
				<StatusBadge
					label={cpu.temperatureStatus}
					variant={mapTempStatusToVariant(cpu.temperatureStatus)}
				/>
			{:else}
				<StatusBadge label="…" variant="offline" />
			{/if}
		</h2>

		<MetricRow label="Temperature" value={cpu ? `${cpu.temperature} °C` : '–'} />
		<MetricRow label="Usage" value={cpu ? `${cpu.usage.toFixed(1)} %` : '–'} />

		<ProgressBar percent={cpu ? cpu.usage : 0} />
	</Card>

	<!-- Memory Card -->
	<Card>
		<h2>Memory</h2>

		<MetricRow
			label="RAM used"
			value={memory
				? `${memory.ram.used_gb} / ${memory.ram.total_gb} (${memory.ram.percent.toFixed(1)}%)`
				: '–'}
		/>
		<ProgressBar percent={memory ? memory.ram.percent : 0} />

		<MetricRow
			label="Disk used"
			value={memory
				? `${memory.disk.used_gb} / ${memory.disk.total_gb} (${memory.disk.percent.toFixed(1)}%)`
				: '–'}
		/>
		<ProgressBar percent={memory ? memory.disk.percent : 0} />

		<div class="text-muted">
			{#if memory}
				Disk free: {memory.disk.free_gb} GB
			{/if}
		</div>
	</Card>
</div>
