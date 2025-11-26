<script lang="ts">
	type Props = {
		label: string;
		value: string;
	};

	let { label, value }: Props = $props();
</script>

<div class="metric">
	<span class="label">{label}</span>
	<span class="value">{value}</span>
</div>

<style>
	.metric {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
		margin-bottom: 0.35rem;
	}

	.metric span.value {
		font-variant-numeric: tabular-nums;
		color: #e5e7eb;
		font-weight: 500;
	}

	.metric span.label {
		color: #9ca3af;
	}
</style>
