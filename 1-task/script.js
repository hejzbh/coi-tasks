"use strict";

const mainSection = document.querySelector(".section");
const learnMoreButton = document.querySelector(".section__learnMore__btn");
const hiddenSectionParagraph = document.querySelector(
  ".section__paragraph__hidden"
);
const lazyImages = document.querySelectorAll('img[data-lazy="true"]');

////////////////////// OBSERVER - On scroll reveal animation //////////////////////
const OBSERVER_OPTIONS = {
  root: null,
  threshold: 0.1,
};

function revealSectionAnimation(entries /*observer*/) {
  const [entry] = entries;

  if (!entry) return;

  if (entry.isIntersecting) {
    // Reveal section
    entry.target?.classList.remove("section__hidden");
    entry?.target?.classList.add("section__visible");
  } else {
    // Hide section
    entry.target?.classList.add("section__hidden");
    entry?.target?.classList.remove("section__visible");

    // Ukoliko nam je striktno jako bitan performans sajta, ja bih ovdje disconectao observer - da se ne bi opet ponavljavala ova animacija. Medjutim, uradio sam kako je i u tasku, odnosno da ostane animacija. :)
  }
}

const sectionObserver = new IntersectionObserver(
  revealSectionAnimation,
  OBSERVER_OPTIONS
);

sectionObserver.observe(mainSection);

////////////////// TEXT ANIMATION //////////////////////
function toggleSectionText() {
  // Section

  const isHidden = hiddenSectionParagraph.classList.contains(
    "section__paragraph__hidden"
  );

  if (isHidden) {
    // Reveal
    hiddenSectionParagraph.style.maxHeight =
      hiddenSectionParagraph.scrollHeight + "px"; // dynamic height
  }

  // Koristim toggle, jer fakticki mozemo ovu funkciju iskorisiti i u observeru - odnosno kad izadjemo iz viewporta da pozovemo ovu funkciju i da se opet sakrije text ako to hocemo. Doduše, trebalo bi izmijeniti malo logiku i za button u tom slucaju - ali nije bitno sada.
  hiddenSectionParagraph.classList.toggle("section__paragraph__hidden");
  hiddenSectionParagraph.classList.toggle("section__paragraph__visible");

  // bzutton
  learnMoreButton.style.transition = "opacity 0.3s ease";
  learnMoreButton.style.opacity = 0;
  learnMoreButton.style.display = "none";
}

learnMoreButton.addEventListener("click", toggleSectionText);

////////////// BONUS LAZY LOADING ///////////////
function loadLazyImage(entries, observer) {
  const [entry] = entries;

  if (!entry?.isIntersecting) return;

  const img = entry.target;
  const { dataset } = img;
  console.log(dataset);

  if (!dataset.originalsrc) {
    observer.unobserve(img);
    return;
  }

  // Replace compressed image with original image
  img.src = dataset.originalsrc;
}

const lazyImageObserver = new IntersectionObserver(
  loadLazyImage,
  OBSERVER_OPTIONS
);

lazyImages.forEach((img) => lazyImageObserver.observe(img));
