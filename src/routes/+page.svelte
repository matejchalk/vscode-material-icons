<script lang="ts">
	export let data;
</script>

<div>
	{#if !data.icons.length}
		<article>No icons matched by search term.</article>
	{/if}

	<div class="grid">
		{#each data.icons as icon (icon.name)}
			<article class="cell">
				<img src={icon.src} alt="{icon}.svg" width="64" height="64" loading="lazy" />
				<small class="name">{icon.name}</small>
			</article>
		{/each}
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
		column-gap: 20px;
	}

	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.name {
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
