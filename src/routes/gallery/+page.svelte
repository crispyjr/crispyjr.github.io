<script>
	import { onMount } from 'svelte';
	import NavCover from '$lib/NavCover.svelte';

	let data = [];

	onMount(fetchData);

	async function fetchData() {
		try {
			const response = await fetch('http://cfs-backend:8080/get/photos');
			data = await response.json();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
</script>

<NavCover />
<div class="p-5 sm:p-8">
	<div
		class="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8"
	>
		{#if data}
			{#each data as item (item.id)}
				<img src="data:image/png;base64,{item.image}" alt={item.name} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.columns-1 {
		columns: 1;
	}

	.gap-5 {
		gap: 1.25rem;
	}

	.p-5 {
		padding: 1.25rem;
	}

	@media (min-width: 640px) {
		.sm\:columns-2 {
			columns: 2;
		}

		.sm\:gap-8 {
			gap: 2rem;
		}

		.sm\:p-8 {
			padding: 2rem;
		}
	}

	@media (min-width: 768px) {
		.md\:columns-3 {
			columns: 3;
		}
	}

	@media (min-width: 1024px) {
		.lg\:columns-4 {
			columns: 4;
		}
	}

	.\[\&\>img\:not\(\:first-child\)\]\:mt-8 > img:not(:first-child) {
		margin-top: 2rem;
	}
</style>
