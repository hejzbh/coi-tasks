"use strict";
import Swiper from "swiper";

let swiperInstance = null;

function initSwiper() {
  swiperInstance = new Swiper(".swiper__container", {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    on: {
      slideChange: function () {
        console.log("Active slide index:", this.activeIndex);
      },
    },
  });
}

document.getElementById("toggleSwiper").addEventListener("click", () => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
    console.log("Swiper destroyed");
  } else {
    initSwiper();
    console.log("Swiper initialized");
  }
});

initSwiper();
