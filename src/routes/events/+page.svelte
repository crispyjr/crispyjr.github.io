<script>
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { selectedItem } from '$lib/stores/store.js';
	import NavCover from '$lib/NavCover.svelte';
	import Collapse from './collapse.svelte';
	import Modal from '$lib/Modal.svelte';
	import EventBox from '$lib/EventBox.svelte';
	let showModal = false;
	let title;
	let category;
	let location;
	let time;
	let data = [];
	let groupedData;

	onMount(fetchData);

	async function fetchData() {
		try {
			const response = await fetch('http://cfs-backend:8080/get/events');
			data = await response.json();

			// Sort data by start_time
			data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
			groupedData = groupByMonthYear(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	// Function to group data by month-year
	function groupByMonthYear(data) {
		const grouped = {};
		data.forEach((event) => {
			const date = new Date(event.start_time);
			const monthYearKey = `${date.getMonth()}-${date.getFullYear()}`;
			if (!grouped[monthYearKey]) {
				grouped[monthYearKey] = [];
			}
			grouped[monthYearKey].push(event);
		});
		return grouped;
	}

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	function getMonthYear(key) {
		const [month, year] = key.split('-');
		return `${monthNames[parseInt(month)]} ${year}`;
	}

	function test(item) {
		selectedItem.set(item);
	}
</script>

<NavCover />
<Modal bind:showModal />
<div class="eventsTitleBar">
	<div class="eventsTitle">EVENTS</div>
</div>

{#if groupedData}
	{#each Object.keys(groupedData) as key}
		<Collapse month={getMonthYear(key)}>
			<div>
				<div class="eventMonthBox">
					<div class="showEventsListBar">
						{#each groupedData[key] as item (item.id)}
							<span on:click={() => test(item)}>
								<EventBox bind:showModal bind:item />
							</span>
						{/each}
					</div>
				</div>
			</div>
		</Collapse>
	{/each}
{/if}

<!-- just to keep the month organized -->
<!-- <Collapse month="september 2023">
	<div>
		<div class="eventMonthBox">
			<div class="showEventsListBar">
				{#each data as item (item.id)}
					<div on:click={test(item)}>
						<EventBox bind:showModal bind:item />
					</div>
				{/each}
			</div>
		</div>
	</div>
</Collapse>
<Collapse month="October 2023">
	<div>
		<div class="eventMonthBox">
			<div class="showEventsListBar">
				<EventBox bind:title bind:category bind:location bind:time bind:showModal />
				<EventBox bind:showModal />
				<EventBox bind:showModal />
				<EventBox bind:showModal />
			</div>
		</div>
	</div>
</Collapse> -->

<style>
	.navCover {
		width: 100%;
		height: 100px;
		background: rgb(165, 165, 165);
		opacity: 0.2;
		position: relative;
		box-shadow: 0px 2px 10px red;
	}
	.eventsTitleBar {
		width: 100%;
		height: 150px;
		position: relative;
	}
	.eventsTitle {
		width: 300px;
		height: 90%;
		position: absolute;
		font-size: 100px;
		font-family: 'Koulen';
		color: white;
		right: 0;
		bottom: 0;
		display: flex;
		align-content: center;
		justify-content: space-around;
	}
	.eventMonthBox {
		width: 100%;
		height: 550px;
		/* background: gray; */
		position: relative;
	}

	/*SAME CODE FROM MAIN PAGE*/
	.showEventsListBar {
		width: 100%;
		height: 525px;
		position: relative;
		/* background: orange; */
		/* justify-content: space-around;
    align-items: center;
    flex: 1; */
		display: inline-block;
		overflow: auto;
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
	.eventBox {
		width: 358px;
		height: 468px;
		background: white;
		position: relative;
		display: inline-block;
		margin: 20px 0px 10px 30px;
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

		color: black;
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
	/**MODAL*/
	/* The Modal (background) */
	.modal {
		background-color: rgba(0, 0, 0, 0.582);
		position: fixed;
		width: 100%;
		height: 100%;
		padding-top: 100px;
		z-index: 2;
		display: flex;
		justify-content: center;
	}

	.modalBox {
		background: #d9d9d9;
		position: relative;
		width: 39%;
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
