const container = document.querySelector(".recipies__list");

fetch("./recipies.json")
  .then((res) => res.json())
  .then((recipes) => {
    console.log(recipes);
    renderRecipes(recipes);
  });

function renderRecipes(recipes) {
  recipes.forEach((recipe) => {
    // article
    const article = document.createElement("article");
    article.className = "recipe__card";

    // images container
    const imgContainer = document.createElement("div");
    imgContainer.className = "recipe__images__container";

    //thumbnail
    const thumbnail = document.createElement("img");
    thumbnail.src = recipe.thumbnail;
    thumbnail.alt = "Recipe thumbnail";
    thumbnail.loading = "lazy";
    thumbnail.className = "recipe__thumbnail";

    imgContainer.appendChild(thumbnail);

    // decoration
    recipe.decorativeCornerImages.forEach((deco) => {
      const decoImg = document.createElement("img");
      decoImg.src = deco.src;
      decoImg.alt = "Decoration";
      decoImg.className = `decoration__img ${deco.position}`;
      imgContainer.appendChild(decoImg);
    });

    // other..
    const title = document.createElement("h2");
    title.className = "recipe__title";
    title.textContent = recipe.title;

    article.appendChild(imgContainer);
    article.appendChild(title);
    container.appendChild(article);
  });
}
