const newsSection = document.querySelector(".news__body");

export const createNews = (newsUrl, newsImage, newsDescription) => {
  const li = document.createElement("li");

  const anchor = document.createElement("a");
  anchor.classList.add("news__card");
  anchor.setAttribute("href", newsUrl);
  anchor.setAttribute("target", "_blank");

  const image = document.createElement("img");
  image.setAttribute("src", newsImage);
  image.classList.add("news__image");

  const description = document.createElement("div");
  description.innerText = newsDescription;
  description.classList.add("news__description");

  anchor.appendChild(image);
  anchor.appendChild(description);

  li.appendChild(anchor);

  //   console.log(newsSection);
  newsSection.appendChild(li);
};
