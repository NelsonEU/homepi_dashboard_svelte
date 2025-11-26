<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="card">
	{@render children()}
</div>

<style>
	.card {
		background: #020617;
		border-radius: 0rem;
		padding: 1.25rem 1.4rem;
		/* border: 1px solid rgba(148, 163, 184, 0.2); */
		box-shadow:
			0 14px 30px rgba(15, 23, 42, 0.7),
			0 0 0 1px rgba(15, 23, 42, 0.7);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
