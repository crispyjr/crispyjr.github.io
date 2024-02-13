<script>
	import { icons } from '$lib/imageData.js';
</script>

<div class="flex items-center justify-between w-full h-24 bg-black p-5">
	<div class="h-12 text-white text-2xl font-koulen flex items-center">© 2023 Carleton Film Society</div>
	
	<div class="w-1/2 h-full flex items-center justify-center">
		<p class="text-center text-white">Made with ❤️ by Shiquana and Adrian.</p>
	</div>

	<div class="flex space-x-3">
		{#each icons as { imgurl, link, alt }}
			<a href={link} target="_blank" class="flex justify-center items-center w-12 h-12 bg-white rounded-full">
				<img class="iconImage w-1/2 h-1/2" src={imgurl} alt={alt} />
			</a>
		{/each}
	</div>
</div>

<style>
	.font-koulen {
		font-family: 'Koulen';
	}
</style>
