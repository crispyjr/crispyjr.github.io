<script>
	import '../app.css';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import icon1 from '$lib/assets/ravenLogo_black.png';
	import icon2 from '$lib/assets/ravenLogo_white.png';

	import { page } from '$app/stores';
</script>

{#if $page.url.pathname === '/'}
	<Navigation icon={icon1} />
{:else}
	<Navigation icon={icon2} />
{/if}

<div>
	<slot />
</div>
<Footer />
