<script lang="ts">
	import SystemSection from '$lib/sections/SystemSection.svelte';
	import MinecraftSection from '$lib/sections/MinecraftSection.svelte';
	import LogsSection from '$lib/sections/LogsSection.svelte';
</script>

<div class="container">
	<h1>HomePi Dashboard</h1>
	<div class="subtitle">System & Minecraft overview – refreshed every 5 seconds.</div>

	<SystemSection />
	<MinecraftSection />
	<LogsSection />
</div>
