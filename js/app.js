import { CountUp } from "./countUp.min.js";
import { updateChart, setGlobalChart } from "./chart.js";
import { createNews } from "./news.js";

const select = document.querySelector("#countrySelector");
const confirmedNumberCard = document.querySelector("#confirmed");
const recoveryNumberCard = document.querySelector("#recovery");
const deathsNumberCard = document.querySelector("#deaths");
const loader = document.querySelector(".line-loader");

const today = new Date();
const currentMonth =
  today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
const startDate =
  today.getFullYear() + "-0" + (currentMonth - 6) + "-" + today.getDate();
const endDate =
  today.getFullYear() + "-" + currentMonth + "-" + today.getDate();

const api = "https://api.coronatracker.com";

let countUp;

const fetchOptions = async () => {
  try {
    const response = await fetch(`${api}/v2/analytics/country`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const fetchGlobalData = async () => {
  try {
    const response = await fetch(`${api}/v3/stats/worldometer/global`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const fetchGlobalTimelineData = async () => {
  try {
    const response = await fetch("https://covid19.mathdro.id/api/daily");
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

const setGlobalCards = async () => {
  let cardData = await fetchGlobalData();

  countUp = new CountUp(confirmedNumberCard, cardData.totalConfirmed);
  countUp.start();

  countUp = new CountUp(recoveryNumberCard, cardData.totalRecovered);
  countUp.start();

  countUp = new CountUp(deathsNumberCard, cardData.totalDeaths);
  countUp.start();
};

const setOptions = async () => {
  let optionData = await fetchOptions();

  optionData.forEach((item) => {
    let options = document.createElement("option");
    options.value = item.countryCode;
    options.text = item.countryName;
    select.add(options);
  });
};

const updateCards = (confirmed, deaths, recovered) => {
  countUp = new CountUp(confirmedNumberCard, confirmed);
  countUp.start();

  countUp = new CountUp(deathsNumberCard, deaths);
  countUp.start();

  countUp = new CountUp(recoveryNumberCard, recovered);
  countUp.start();
};

const fetchTimelineData = async (event) => {
  try {
    loader.classList.add("loading");
    let countryCode = event.target.value;
    const response = await fetch(
      `${api}/v3/analytics/trend/country?countryCode=${countryCode}&startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    if (data) {
      loader.classList.remove("loading");
    }
    const infectionsData = data.map((item) => item.total_confirmed);
    const deathData = data.map((item) => item.total_deaths);
    const recoveredData = data.map((item) => item.total_recovered);
    const date = data.map(
      (item) => new Date(item.last_updated).toISOString().split("T")[0]
    );

    // console.log(deathData);
    const totalConfirmed = infectionsData[infectionsData.length - 1];
    const totalDeaths = deathData[deathData.length - 1];
    const totalRecovered = recoveredData[recoveredData.length - 1];
    const chartData = await fetchGlobalTimelineData();

    if (countryCode === "global") {
      setGlobalCards();
      setGlobalChart(chartData);
    } else {
      updateChart(infectionsData, deathData, recoveredData, date);
    }
    updateCards(totalConfirmed, totalDeaths, totalRecovered);
  } catch (err) {
    console.error(err);
  }
};

select.addEventListener("change", fetchTimelineData);

const fetchGlobalNews = async () => {
  const response = await fetch(`${api}/news/trending?limit=10`);
  const data = await response.json();
  return data.items;
};

const initialLoad = async () => {
  const chartData = await fetchGlobalTimelineData();

  setOptions();
  setGlobalCards();
  setGlobalChart(chartData);
  const newsData = await fetchGlobalNews();
  // console.log(newsData);
  newsData.forEach((item) => {
    createNews(
      item.url,
      item.urlToImage,
      item.title,
      item.description,
      item.publishedAt
    );
  });
};

window.addEventListener("load", initialLoad);
