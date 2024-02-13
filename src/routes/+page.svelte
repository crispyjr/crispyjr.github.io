<script>
	import { onMount } from 'svelte';

	import Modal from '$lib/Modal.svelte';
	import EventBox from '$lib/EventBox.svelte';
	import { selectedItem } from '$lib/stores/store.js';
	import { images } from '$lib/imageData.js';

	let imageShowIndex = 0;
	let showModal = false;
	let data = [];

	onMount(fetchData);

	async function fetchData() {
		try {
			const response = await fetch('http://cfs-backend:8080/get/events');
			data = await response.json();

			// Sort data by start_time
			data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function test(item) {
		selectedItem.set(item);
	}

	const prevSlide = () => {
		if (imageShowIndex == 0) {
			imageShowIndex = images.length - 1;
		} else {
			imageShowIndex -= 1;
		}
	};

	const nextSlide = () => {
		if (imageShowIndex == images.length - 1) {
			imageShowIndex = 0;
		} else {
			imageShowIndex += 1;
		}
	};

	const slide1 = () => {
		imageShowIndex = 0;
	};
	const slide2 = () => {
		imageShowIndex = 1;
	};
	const slide3 = () => {
		imageShowIndex = 2;
	};

	setInterval(() => {
		nextSlide();
	}, 10000);
</script>

<link href="https://fonts.googleapis.com/css?family=Koulen" rel="stylesheet" />
<Modal bind:showModal />
<div class="slideshow">
	{#each images as { id, imgurl }}
		<img
			class="slideshowImage fade"
			class:showImage={id == imageShowIndex}
			src={imgurl}
			alt="oop"
		/>
	{/each}

	<span class="leftArrow" on:click={prevSlide}>&#10094</span>
	<span class="rightArrow" on:click={nextSlide}>&#10095</span>
	<div class="dotBar">
		<div class="dotdotBar">
			<div class="dotBox" on:click={slide1}>•</div>
			<div class="dotBox" on:click={slide2}>•</div>
			<div class="dotBox" on:click={slide3}>•</div>
		</div>
	</div>
</div>
<div class="events">
	<div class="upcomingEventsBar text">UPCOMING EVENTS</div>

	<div class="showEventsListBar">
		{#each data.slice(0, 4) as item (item.id)}
			<span on:click={() => test(item)}>
				<EventBox bind:showModal bind:item />
			</span>
		{/each}
	</div>
	<a href="/events">
		<div class="seeMoreBar">SEE MORE</div>
	</a>
</div>

<style>
	/* SLIDESHOW */
	.slideshow {
		width: 100%;
		height: 700px;
		background: black;
		position: relative;
		border-style: dashed;
	}
	.slideshowImage {
		width: 100%;
		height: 100%;
		display: none;
	}
	.showImage {
		display: block;
	}
	.rightArrow,
	.leftArrow {
		width: 57px;
		height: 14%;
		backdrop-filter: blur(10px);
		color: white;
		position: absolute;
		top: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px;
		cursor: pointer;
	}
	.rightArrow {
		right: 0;
	}
	.dotBar {
		width: 100%;
		height: 5%;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
	}
	.dotdotBar {
		width: 96px; /**5%*/
		height: 100%;
		display: flex;
		justify-content: space-around;
		padding-bottom: 10px;
	}
	.dotBox {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40px;
		cursor: pointer;
	}
	.fade {
		-webkit-animation-name: fade;
		-webkit-animation-duration: 2s;
		animation-name: fade;
		animation-duration: 2s;
	}
	@-webkit-keyframes fade {
		from {
			opacity: 0.3;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fade {
		from {
			opacity: 0.3;
		}
		to {
			opacity: 1;
		}
	}
	/* UPCOMING EVENTS */
	.events {
		width: 100%;
		height: 700px;
		position: relative;
		background: black;
	}

	.upcomingEventsBar {
		width: 100%;
		height: 20%;
		background: black;
		position: relative;
		color: white;
		font-size: 80px;
		display: flex;
		align-items: center;
		font-family: 'Koulen';
	}
	.text {
		padding-left: 20px;
	}
	.showEventsListBar {
		width: 100%;
		height: 500px;
		position: relative;
		/* justify-content: space-around;
    align-items: center;
    flex: 1; */
		overflow-x: auto;
		white-space: nowrap;
	}
	.showEventsListBar::-webkit-scrollbar {
		width: 10px;
	}
	.showEventsListBar::-webkit-scrollbar-track {
		background: rgb(0, 0, 0);
	}
	.showEventsListBar::-webkit-scrollbar-thumb {
		background: rgb(121, 121, 121);
	}
	.showEventsListBar::-webkit-scrollbar-thumb:hover {
		background: rgb(63, 63, 63);
	}
	.seeMoreBar {
		width: 150px;
		height: 10%;
		background: black;
		position: absolute;
		right: 0;
		bottom: -20px;
		display: flex;
		justify-content: space-around;
		font-size: 30px;
		font-family: 'Koulen';
		text-decoration: underline;
		color: white;
	}

	/* EVENT BOX */
	.eventBox {
		width: 422px;
		height: 450px;
		background: white;
		position: relative;
		display: inline-block;
		margin: 10px 0px 10px 30px;
	}
	.eventBoxImg {
		width: 100%;
		height: 100%;
		position: absolute;
		filter: blur(8px);
		-webkit-filter: blur(8px);
	}
	.eventBoxTextBarTop,
	.eventBoxTextBarBottom {
		width: 100%;
		position: absolute;
		text-align: center;
		font-family: 'Koulen';

		color: white;
	}
	.eventBoxTextBarTop {
		top: 20%;
		font-size: 40px;
		height: 100px;
	}
	.eventBoxTextBarBottom {
		bottom: 0;
		font-size: 30px;
		line-height: 1;
		height: 70px;
	}

	/*MEDIA */

	@media only screen and (max-width: 900px) {
		.slideshow {
			height: 400px;
		}
		.upcomingEventsBar {
			font-size: 70px;
		}
	}

	@media only screen and (max-width: 650px) {
		.copyRightBar {
			font-size: 15px;
			height: 25px;
		}
	}
</style>
