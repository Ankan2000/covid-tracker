const newsSection = document.querySelector(".news__body");

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
  image.setAttribute("width", "100px");
  image.setAttribute("height", "100px");
  image.classList.add("news__image");

  const newsDiv = document.createElement("div");
  newsDiv.classList.add("news__details");

  const title = document.createElement("h2");
  title.innerText = newsTitle.slice(0, 30) + "...";
  title.classList.add("news__title");

  const description = document.createElement("p");
  description.innerText = newsDescription.slice(0, 100) + "....";
  description.classList.add("news__description");

  const time = document.createElement("small");
  time.classList.add("news__time");

  const icon = document.createElement("i");
  icon.classList.add("fa");
  icon.classList.add("fa-history");
  time.appendChild(icon);
  // time.innerText = getTimeDifference(newsTime);
  const timeText = document.createTextNode(
    getTimeDifference(newsTime) + " ago"
  );
  time.appendChild(timeText);

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
  time = new Date(time);
  let timeMinutes = time.getMinutes();
  let timeHours = time.getHours() + 1;

  let currentTime = new Date();
  let currentMinutes = currentTime.getMinutes();
  let currentHours = currentTime.getHours() + 1;

  let hourDifference = currentHours - timeHours;
  let minutesDifference =
    currentMinutes < timeMinutes
      ? timeMinutes - currentMinutes
      : currentMinutes - timeMinutes;

  return `${hourDifference}hrs and ${minutesDifference}mins`;
}
