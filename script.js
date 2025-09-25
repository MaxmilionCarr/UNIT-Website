const slider     = document.querySelector('.slider');
const leftArrow  = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cards      = slider.querySelectorAll('.publication-item');

const cardWidth = 400;   // must match CSS
const gap       = 20;    // must match CSS
const itemsPerView = 2;  // we always show exactly two

let index = 0;           // left-most visible card

function stepWidth() {
    return cardWidth + gap;
}

function updateSlider() {
    slider.style.transform = `translateX(${-index * stepWidth()}px)`;
    leftArrow.disabled  = (index === 0);
    rightArrow.disabled = (index >= cards.length - itemsPerView);
}

rightArrow.addEventListener('click', () => {
    if (index < cards.length - itemsPerView) {
        index++;
        updateSlider();
    }
});

leftArrow.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateSlider();
    }
});

// initial state
updateSlider();
