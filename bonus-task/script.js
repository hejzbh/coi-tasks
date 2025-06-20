"use strict";

const calculateScrollSteps = (wrapper, cardCount) => {
  const start = wrapper.offsetTop - 100;
  const end = wrapper.offsetTop + wrapper.offsetHeight - innerHeight * 1.2;
  const step = (end - start) / (cardCount * 2);
  return { start, end, step };
};

const getCardTransform = (scrollY, start, step, index, total) => {
  const s = start + step * index;
  const e = s + step * (total + 1);

  if (scrollY <= s) {
    return `
      perspective(100vw)
      translateX(100vw) 
      rotateY(180deg)
    `;
  }

  if (scrollY > s && scrollY <= e - step) {
    const progress = (scrollY - s) / (e - s);
    return `
      perspective(100vw)
      translateX(${100 + progress * -100}vw)
      rotateY(180deg)
    `;
  }

  if (scrollY > e - step && scrollY <= e) {
    const progress = (scrollY - (e - step)) / step;
    return `
      perspective(100vw)
      translateX(${100 + ((scrollY - s) / (e - s)) * -100}vw)
      rotateY(${180 + -progress * 180}deg)
    `;
  }

  return `
    perspective(100vw)
    translateX(0vw) 
    rotateY(0deg)
  `;
};

const animateCardsOnScroll = (cards, start, step, total) => {
  cards.forEach((card, i) => {
    const transform = getCardTransform(scrollY, start, step, i, total);
    card.style.transform = transform;
  });
};

(() => {
  const wrapper = document.querySelector(".main__content");
  const sticky = document.querySelector(".sticky");
  const cards = sticky.querySelectorAll(".card");
  let scrollData = calculateScrollSteps(wrapper, cards.length);

  const onScroll = () =>
    animateCardsOnScroll(
      cards,
      scrollData.start,
      scrollData.step,
      cards.length
    );

  const onResize = () => {
    scrollData = calculateScrollSteps(wrapper, cards.length);
    onScroll();
  };

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onResize);

  onScroll(); // initial call - kada se tek udje
})();
