<script lang="ts">
	type Props = {
		percent: number;
	};

	let { percent }: Props = $props();
</script>

<div class="progress" style={`--percent: ${percent}%`}>
	<div class="progress-inner"></div>
</div>

<style>
  .progress {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: #020617;
    overflow: hidden;
    margin-top: 0.4rem;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(30, 64, 175, 0.3);
  }

  .progress-inner {
    height: 100%;
    width: var(--percent);
    border-radius: 999px;
    background: linear-gradient(90deg, #22c55e, #eab308, #ef4444);
    transition: width 0.3s ease;
  }
</style>
