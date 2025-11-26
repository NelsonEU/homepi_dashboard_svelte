<script lang="ts">
	import type { BadgeVariant } from "$lib/types/ui";

	type Props = {
		label: string;
		variant: BadgeVariant;
	};

	let { label, variant }: Props = $props();
</script>

<span class={`badge ${variant}`}>{label}</span>

<style>
	.badge {
		padding: 0.15rem 0.55rem;
		border-radius: 999px;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border: 1px solid transparent;
		background: rgba(15, 23, 42, 0.85);
	}

	.badge.ok {
		background: rgba(34, 197, 94, 0.18);
		border-color: rgba(34, 197, 94, 0.55);
		color: #4ade80;
	}

	.badge.warn {
		background: rgba(234, 179, 8, 0.16);
		border-color: rgba(234, 179, 8, 0.55);
		color: #facc15;
	}

	.badge.crit,
	.badge.offline {
		background: rgba(239, 68, 68, 0.18);
		border-color: rgba(239, 68, 68, 0.6);
		color: #f97373;
	}

	.badge.offline {
		text-transform: none;
	}
</style>
