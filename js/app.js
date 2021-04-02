"use strict";

// Functions

// image change on Products section

function changeImg(e) {
  const target = e.target;
  const targetImage = target.closest(".products__item").dataset.img;

  if (target.classList.contains("products__link")) {
    productItem.forEach((el) => el.classList.remove("active"));
    target.classList.add("active");
  }
  proguctImg.src = targetImage;
}

// render Product Info section

function renderProductInfo(id) {
  infoSection.innerHTML = "";
  const selectedProduct = products[id];
  selectedProduct.forEach((item) => {
    const html = `
    <div class="info__main-wrapper" id="${item.productId}"> 
    <div class="info__img-wrapper">
      <h2 class="info__img-title">${item.title}</h2>
      <img class="info__img" src="${item.imgUrl}" alt="${item.title}" />
    </div>
    <div class="info__data">
      <h2 class="info__title">${item.title}</h2>
      <p class="info__description">
      ${item.description}
      </p>
      <div class="info__purchase">
        <button class="info__buy">Купить</button>
        <div class="info__price">
          <span class="info__price--old"><s>${item.oldPrice}</s></span>
          <span class="info__price--new">${item.newPrice}</span>
        </div>
      </div>
      </div>
    </div>
    `;

    infoSection.insertAdjacentHTML("beforeend", html);
  });

  const firstProduct = document.querySelectorAll(".info__main-wrapper")[0];
  firstProduct.classList.add("info__main-wrapper--active");

  renderRecommends(selectedProduct, id);
  addTab();
}

//  Recommendations render

function renderRecommends(rec, id) {
  recommendsContainer.innerHTML = "";

  let title;
  if (id === "strada" || id === "subwoofers") {
    title = "ВЫБЕРИ ТИП АКУСТИКИ";
  } else if (id === "accessories") {
    title = "ВЫБЕРИ ТИП АКСЕСУАРА";
  } else {
    title = "Выбери свой цвет";
  }

  const listHtml = `
    <h4 class="info__additional-heading">${title}</h4>
    <ul class="info__additional-list">
    </ul>
    `;

  recommendsContainer.insertAdjacentHTML("beforeend", listHtml);

  rec.forEach((item) => {
    const html = `
          <li class="info__additional-item">
              <a href="#${item.productId}" class="info__additional-link">
                  <img class="info__additional-img" src="${item.imgUrl}" alt="${item.title}" />
              </a>
          </li>
        `;

    const recommends = document.querySelector(".info__additional-list");

    recommends.insertAdjacentHTML("beforeend", html);
  });

  info.scrollIntoView({ behavior: "smooth" });
}

// tabs functionality

function addTab() {
  document.querySelectorAll(".info__additional-link").forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const id = e.target
        .closest(".info__additional-link")
        .getAttribute("href")
        .replace("#", "");
      document
        .querySelectorAll(".info__main-wrapper")
        .forEach((content) =>
          content.classList.remove("info__main-wrapper--active")
        );
      document
        .querySelectorAll(".info__additional-item")
        .forEach((content) =>
          content.classList.remove("info__additional-item--active")
        );

      tab
        .closest(".info__additional-item")
        .classList.add("info__additional-item--active");

      document.getElementById(id).classList.add("info__main-wrapper--active");
    });
  });
}

// Events;

productItem.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const targetID = e.target.id;
    renderProductInfo(targetID);
  });
});

sliderLinks.forEach((item) => {
  item.addEventListener("click", function (e) {
    const slideId = e.target
      .closest(".slider__img-link")
      .getAttribute("href")
      .replace("#", "");
    renderProductInfo(slideId);
  });
});

productList.addEventListener("mouseover", changeImg);
