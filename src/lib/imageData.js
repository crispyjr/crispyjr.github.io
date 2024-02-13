import image1 from '$lib/assets/stock1.jpg';
import image2 from '$lib/assets/stock2.jpg';
import image3 from '$lib/assets/stock3.jpg';
import image4 from '$lib/assets/stock4.jpg';
import image5 from '$lib/assets/stock5.jpg';
import image6 from '$lib/assets/instagram.png';
import image7 from '$lib/assets/youtube.png';
import image8 from '$lib/assets/facebook.png';
import image9 from '$lib/assets/discord.png';

export const images = [
	{ id: 0, imgurl: image1 },
	{ id: 1, imgurl: image2 },
	{ id: 2, imgurl: image3 }
];

export const icons = [
	{
		id: 0,
		imgurl: image6,
		link: 'https://instagram.com/carleton.film.society?utm_medium=copy_link',
		alt: 'instagram'
	},
	{
		id: 1,
		imgurl: image7,
		link: 'https://www.youtube.com/channel/UCmMSsbadHTMckZMgMfNxTaA',
		alt: 'youtube'
	},
	{ id: 2, imgurl: image8, link: 'https://www.facebook.com/carletonfilmsociety', alt: 'facebook' },
	{ id: 3, imgurl: image9, link: 'https://discord.gg/Jk9FmJR5D5', alt: 'discord' }
];
