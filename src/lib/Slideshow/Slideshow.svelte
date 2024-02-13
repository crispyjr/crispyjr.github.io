<script>
    import { onMount } from 'svelte';
        import image1 from '$lib/assets/stock1.jpg';
    import image2 from '$lib/assets/stock2.jpg';
    import image3 from '$lib/assets/stock3.jpg';
    import image4 from '$lib/assets/stock4.jpg';
    import image5 from '$lib/assets/stock5.jpg';
    let images = [
        image1,
        image2,
        image3,
        image4,
        image5
];
let currentImageIndex = 0;

onMount(() => {
// Get elements
let imgElement = document.getElementById('slider');
let prevButton = document.getElementById('prevButton');
let nextButton = document.getElementById('nextButton');

// Set initial image
imgElement.src = images[currentImageIndex];

// Set event listeners for buttons
prevButton.addEventListener('click', () => {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1; // Go to last image if at start
  }
  imgElement.src = images[currentImageIndex];
});

nextButton.addEventListener('click', () => {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0; // Go to first image if at end
  }
  imgElement.src = images[currentImageIndex];
});
});
</script>

  <div class="flex items-center justify-center h-screen">
    <button id="prevButton" class="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-red-500 text-white opacity-75">Prev</button>
    <img id="slider" class="h-1/2 w-auto" src="" alt="slider">
    <button id="nextButton" class="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-red-500 text-white opacity-75">Next</button>
  </div>
  
  