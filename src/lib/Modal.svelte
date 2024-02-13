<script>
	import { slide } from 'svelte/transition';
	import { selectedItem } from '$lib/stores/store.js';
	import { convertDate } from '$lib/globalFunctions.js';

	export let showModal;
	export let category;
	export let title;
	export let description;
	export let location;
	export let time;

	let visible = true;
	let modalProps = {};

	function fadeSlide(node, options) {
		const slideTrans = slide(node, options);
		return {
			duration: options.duration,
			css: (t) => `
				${slideTrans.css(t)}
				opacity: ${t};
			`
		};
	}

    $: if (showModal) {
        selectedItem.subscribe((value) => {
			modalProps = value;  
		});

        // Todo: fix events db to also include category, then start
        // adding a bunch of events. also make a sveltekit function
        // to convert the time to something readable.
	}
</script>

{#if showModal}
	<div class="modal">
		<div class="modalBox" in:fadeSlide={{ duration: 600 }}>
			<div class="close" on:click={() => {showModal = false}}>x</div>
			<div class="category">{modalProps?.category}</div>
			<div class="title">{modalProps?.name}</div>
			<div class="description">{modalProps?.description}</div>
			<a class="location" href="/">{modalProps?.location}</a>
			<div class="time">{convertDate(modalProps?.start_time)}</div>
		</div>
	</div>
{/if}

<style>
	/**MODAL*/
	/* The Modal (background) */
	.modal {
		background-color: rgba(0, 0, 0, 0.582);
		position: fixed;
		width: 100%;
		height: 100%;
		padding-top:100px;
		z-index: 2;
		display: flex;
		justify-content: center;
	}

	.modalBox {
		background: #d9d9d9;
		position: relative;
		width: 45%;
		height: 70%;
		border-radius: 20px;
	}
	.close {
		position: absolute;
		right: 20px;
		top: -10px;
		font-size: 50px;
		text-align: right;
		cursor: pointer;
	}
	.close:hover {
		color: red;
	}

	.category {
		height: 120px;
		position: absolute;
		left: 30px;
		top: 10px;
		font-family: 'Koulen';
		font-size: 96px;
		border-bottom: 5px solid black;
	}
	.title {
		height: 100px;
		position: absolute;
		top: 125px;
		left: 30px;
		font-family: 'Koulen';
		font-size: 40px;
	}

	.description {
		height: 300px;
		width: 95%;
		position: absolute;
		top: 220px;
		left: 30px;
		font-family: 'Koulen';
		font-size: 25px;
	}
	.location,
	.time {
		position: absolute;
		bottom: 0;
		right: 15px;
		font-family: 'Koulen';
		font-size: 30px;
		text-decoration: underline;
	}
	.time {
		left: 20px;
		text-decoration: none;
	}
</style>
