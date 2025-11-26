<script lang="ts">
	import type { MinecraftServerStatus } from "$lib/types/minecraft";

	type Props = {
		value: string;
    status: MinecraftServerStatus;
	};

	let { value, status }: Props = $props();
</script>

<span class="pill">
	<span class={`pill-dot ${status}`}></span>
	<span>{value}</span>
</span>

<style>
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.18rem 0.6rem;
		border-radius: 999px;
		background: #020617;
		border: 1px solid rgba(148, 163, 184, 0.45);
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.pill-dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
	}

	.pill-dot.online {
		background: #ef4444;
		box-shadow: 0 0 8px rgba(248, 113, 113, 0.7);
	}

	.pill-dot.online {
		background: #22c55e;
		box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
	}
</style>
