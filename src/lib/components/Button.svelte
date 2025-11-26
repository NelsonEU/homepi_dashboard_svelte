<script lang="ts">
	type ButtonVariant = 'primary' | 'neutral' | 'danger';

	type Props = {
		label: string;
		variant: ButtonVariant;
		disabled?: boolean;
		onClick?: (event: MouseEvent) => void;
	};

	let { label, variant, disabled = false, onClick }: Props = $props();
</script>

<button class={variant} disabled={disabled} onclick={onClick}>
	{label}
</button>

<style>
	button {
		border-radius: 999px;
		background: #020617;
		border: 1px solid rgba(148, 163, 184, 0.4);
		padding: 0.4rem 1rem;
		font-size: 0.85rem;
		cursor: pointer;
		color: #e5e7eb;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		transition:
			background 0.15s ease,
			transform 0.05s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
		white-space: nowrap;
	}

	button:hover:not(:disabled) {
		background: #0b1120;
		border-color: #38bdf8;
		box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.35);
		transform: translateY(-1px);
	}

	button:disabled {
		opacity: 0.45;
		cursor: default;
		transform: none;
		box-shadow: none;
	}

	button.primary {
		border-color: #22c55e;
	}

	button.neutral {
		border-color: rgba(148, 163, 184, 0.4);
	}

	button.danger {
		border-color: #ef4444;
	}
</style>
