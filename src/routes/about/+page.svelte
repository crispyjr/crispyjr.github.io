<script>
	import { send, receive } from '$lib/crossfade.js';
	import { onMount } from 'svelte';

	import NavCover from '$lib/NavCover.svelte';

	// Needed
	let data = [];
	let highlightedMemberId = null;
	let cycleTimeout;
	let aboutIndex = 0;
	let aboutDescriptionText =
		'We’re a passionate community of movie enthusiasts celebrating the art of filmmaking. We’re dedicated to empowering the Carleton community by providing a platform for knowledge-sharing, learning opportunities, and accessible resources to help individuals express and share their unique stories. Collaborate on film projects, enhance your filmmaking skill through workshops and guest speaker presentations, and showcase your short films in our student-led festival.';

	onMount(() => {
		fetchData().then(() => autoCycle());
	});

	const fetchData = async () => {
		try {
			const response = await fetch('http://cfs-backend:8080/get/members');
			data = await response.json();
		} catch (error) {}
	};

	const autoCycle = () => {
		cycleTimeout = setTimeout(() => {
			if (aboutIndex < data.length) {
				aboutIndex++;
			} else {
				aboutIndex = 0;
			}
			highlightedMemberId = aboutIndex > 0 ? data[aboutIndex - 1].id : null;
			console.log(highlightedMemberId);
			autoCycle();
		}, 3000);
	};

	const pauseCycle = () => {
		clearTimeout(cycleTimeout);
	};

	const showMember = (id) => {
		highlightedMemberId = id;
		const memberIndex = data.findIndex((member) => member.id === id);
		if (memberIndex !== -1) {
			aboutIndex = memberIndex + 1; // Add 1 because 0 is for the default "ABOUT US" view
		}
	};

	const resetView = () => {
		highlightedMemberId = null;
		aboutIndex = 0;
	};
</script>

<NavCover />

<div class="aboutBar">
	<div class="aboutBox">
		{#each aboutIndex === 0 ? [{ type: 'about', description: aboutDescriptionText }] : [data[aboutIndex - 1]] as item (item.type || item.id)}
			{#if item.type === 'about'}
				<div class="aboutBox2 fade" out:send in:receive>
					<div class="aboutTitle">ABOUT US</div>
					<div class="aboutDescription">{item.description}</div>
				</div>
			{:else}
				<div class="portraitBox" out:send in:receive>
					<div class="imageBox">
						<img class="portraitImage fade" src="data:image/png;base64,{item.image}" alt="" />
					</div>
					<div class="portraitTextBar fade">
						<div class="portraitName">{item.name}</div>
						<div class="portraitPosition">{item.title}</div>
						<div class="portraitMail">{item.email}</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<div class="teamMembersBar">
	<div class="teamMembersBox">
		<div class="starringBox">STARRING</div>
		<div class="w-full h-4/5 relative">
			{#each data as member (member.id)}
				<div
					class="flex justify-between items-center hoverHighlight"
					class:highlight={highlightedMemberId === member.id}
					on:mouseenter={() => {
						pauseCycle();
						showMember(member.id);
					}}
					on:mouseleave={() => {
						resetView();
						autoCycle();
					}}
				>
					<div class="h-9 w-1/2 text-white text-2xl cursor-pointer text-right pr-4">
						{member.name}
					</div>
					<div
						class="h-9 w-1/2 text-white text-2xl cursor-pointer text-left pl-4 font-bold uppercase"
					>
						{member.title}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.hoverHighlight:hover {
		background-color: rgba(
			255,
			255,
			255,
			0.1
		); /* This will give a light white overlay, you can adjust as per your design */
		transition: background-color 0.3s; /* Smooth transition */
	}

	.highlight {
		background-color: rgba(
			255,
			255,
			255,
			0.1
		); /* This will give a light white overlay, you can adjust as per your design */
		transition: background-color 0.3s; /* Smooth transition */
	}

	.aboutBar {
		width: 100%;
		height: 700px;
		/* background: rgb(24, 24, 24); */
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.aboutBox {
		width: 743px;
		height: 500px;
		background: #1e1d1d;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-radius: 25px;
	}
	.aboutBox2 {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-radius: 25px;
	}
	/*frames*/
	.portraitBox {
		width: 100%;
		height: 100%;
		position: absolute;
		/* background: green; */
		border-radius: 25px;
	}
	.imageBox {
		width: 55%;
		height: 70%;
		/* background: rgb(7, 34, 7); */
		position: absolute;
		left: 22%;
		top: 10%;
	}
	.portraitImage {
		width: 100%;
		height: 100%;
	}
	.portraitTextBar {
		width: 96%;
		height: 80px;
		/* background: rgb(53, 70, 53); */
		position: absolute;
		bottom: 0;
		left: 12px;
	}
	.portraitName,
	.portraitPosition {
		width: 360px;
		height: 50px;
		position: absolute;
		/* background: red; */
		font-size: 28px;
		font-family: 'Inter';
		color: white;
	}

	.portraitPosition {
		right: 0;
		text-align: right;
	}
	.portraitMail {
		width: 400px;
		height: 30px;
		/* background: red; */
		position: absolute;
		bottom: 10px;
		text-align: right;
		right: 0;
		text-decoration: underline;
		color: white;
	}
	/*about*/
	.aboutTitle {
		/* width:100%;
        height:100px; */
		position: absolute;
		top: 50px;
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-family: 'Inter';
		font-size: 70px;
	}

	.aboutDescription {
		width: 75%;
		height: 300px;
		position: absolute;
		bottom: 40px;
		color: white;
		font-size: 20px;
		text-align: center;
		font-family: 'Inter';
	}
	.teamMembersBar {
		width: 100%;
		height: 400px;
		background: black;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.teamMembersBox {
		width: 700px;
		height: 100%;
		/* background: burlywood; */
		position: absolute;
		top: -30px;
	}
	.starringBox {
		width: 100%;
		height: 80px;
		/* background:green; */
		text-align: center;
		font-size: 48px;
		color: white;
		font-family: 'Inter';
	}
	.namesBox {
		width: 47%;
		height: 100%;
		/* background: pink; */
		position: absolute;
		top: 10px;
	}
	.positionsBox {
		width: 47%;
		height: 100%;
		/* background: magenta; */
		position: absolute;
		right: 0;
		top: 10px;
	}
	.hoverText {
		color: yellow;
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
</style>
