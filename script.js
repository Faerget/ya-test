/*Slider Player*/
const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderItems = document.querySelectorAll('.slider-player__item');
const prevButton = document.querySelector('.slider-button-prev');
const nextButton = document.querySelector('.slider-button-next');
const pagination = document.querySelector('.slider-pagination');

let currentIndex = 0;
let autoSlideInterval;
let mergingMobile = window.innerWidth >= 768 ? 20 : 0;

function updateSlider() {
    const width = sliderItems[0].clientWidth + mergingMobile; // Учитываем отступ между слайдами
    sliderWrapper.style.transform = `translateX(-${currentIndex * width}px)`;
    updatePagination();
}

function updatePagination() {
    pagination.innerHTML = `${currentIndex + 1} / <span>${Math.ceil(sliderItems.length )}</span>`;
}

function getSlidesPerView() {
    return window.innerWidth >= 768 ? 3 : 1;
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextButton.click();
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - getSlidesPerView();
    updateSlider();
    resetAutoSlide();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < sliderItems.length - getSlidesPerView()) ? currentIndex + 1 : 0;
    updateSlider();
    resetAutoSlide();
});

window.addEventListener('resize', updateSlider);
sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
sliderWrapper.addEventListener('mouseleave', startAutoSlide);

updateSlider();
startAutoSlide();
/*--Slider Player--*/

/*Анимации*/
let windowElem = window;
let elems = document.querySelectorAll(".animation");

function isScrolledIntoView(elem, windowElem) {
    let docViewTop = windowElem.scrollY;
    let docViewBottom = docViewTop + windowElem.innerHeight;

    let elemTop = elem.getBoundingClientRect().top + docViewTop;
    let elemBottom = elemTop + elem.clientHeight;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

windowElem.addEventListener("scroll", function () {
    elems.forEach(function(elem) {
        if (isScrolledIntoView(elem, windowElem)) {
            elem.classList.add("animate");
        }
    });
});
/*--Анимация--*/
const buttons = document.querySelectorAll('button[data-target]');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-target'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/*Слайдер этапов*/
let currentSlide = 0;

function updatePaginationStep() {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlideStep(index) {
    const container = document.querySelector('.steps-container');
    const items = document.querySelectorAll('.step-item');
    const itemWidth = items[0].offsetWidth + 10; // item width + margin
    container.scrollLeft = index * itemWidth;
    currentSlide = index;
    updatePagination();
}

function prevSlideStep() {
    if (currentSlide > 0) {
        goToSlideStep(currentSlide - 1);
    }
}

function nextSlideStep() {
    const items = document.querySelectorAll('.step-item');
    if (currentSlide < items.length - 1) {
        goToSlideStep(currentSlide + 1);
    }
}
function updateButtons() {
    const items = document.querySelectorAll('.step-item');
    document.querySelector('.slider-button.prev').disabled = currentSlide === 0;
    document.querySelector('.slider-button.next').disabled = currentSlide === items.length - 1;
}

function onScroll() {
    const container = document.querySelector('.steps-container');
    const items = document.querySelectorAll('.step-item');
    const itemWidth = items[0].offsetWidth + 10; // item width + margin
    const scrollLeft = container.scrollLeft;
    const newSlide = Math.round(scrollLeft / itemWidth);
    if (newSlide !== currentSlide) {
        currentSlide = newSlide;
        updatePaginationStep();
        updateButtons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.steps-container');
    container.addEventListener('scroll', onScroll);
    updatePaginationStep();
    updateButtons();
});
/*--Слайдер этапов--*/
