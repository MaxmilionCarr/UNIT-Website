const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0; // Track the current slide index
const publicationItems = document.querySelectorAll('.publication-item');
const totalItems = publicationItems.length;
const itemsPerView = 2; // Number of items visible at a time

// Calculate the maximum and minimum indices
const maxIndex = totalItems - itemsPerView;
const minIndex = -(itemsPerView - 1);

// Function to update the slider position
function updateSlider() {
    const slideWidth = publicationItems[0].offsetWidth + 20; // Include gap
    const translateX = currentIndex * slideWidth;
    slider.style.transform = `translateX(-${translateX}px)`;
    console.log(`Slider moved to index: ${currentIndex}, translateX: ${translateX}`);
}

// Left Arrow Click
leftArrow.addEventListener('click', () => {
    if (currentIndex > minIndex) {
        currentIndex--;
        console.log('Current Index (Left):', currentIndex);
        updateSlider();
    }
});

// Right Arrow Click
rightArrow.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        console.log('Current Index (Right):', currentIndex);
        updateSlider();
    }
});