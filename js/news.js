const newsSection = document.querySelector(".news__body");

// const icon = document.createElement("i");
// icon.classList.add("fa");
// icon.classList.add("fa-history");

export const createNews = (
  newsUrl,
  newsImage,
  newsTitle,
  newsDescription,
  newsTime
) => {
  const li = document.createElement("li");

  const anchor = document.createElement("a");
  anchor.classList.add("news__card");
  anchor.setAttribute("href", newsUrl);
  anchor.setAttribute("target", "_blank");

  const image = document.createElement("img");
  image.setAttribute("src", newsImage);
  image.setAttribute("width", "80px");
  image.setAttribute("height", "80px");
  image.classList.add("news__image");

  const newsDiv = document.createElement("div");
  newsDiv.classList.add("news__details");

  const title = document.createElement("h2");
  title.innerText = newsTitle;
  title.classList.add("news__title");

  const description = document.createElement("p");
  description.innerText = newsDescription;
  description.classList.add("news__description");

  const time = document.createElement("small");
  time.classList.add("news__time");

  // time.appendChild(icon);
  time.innerText = getTimeDifference(newsTime);

  newsDiv.appendChild(title);
  newsDiv.appendChild(description);
  newsDiv.appendChild(time);

  anchor.appendChild(image);
  anchor.appendChild(newsDiv);

  li.appendChild(anchor);

  //   console.log(newsSection);
  newsSection.appendChild(li);
};

function getTimeDifference(time) {
  let currentTime = new Date().getMinutes();
  time = new Date(time);
  let givenTime = time.getMinutes();
  return currentTime - givenTime;
}
