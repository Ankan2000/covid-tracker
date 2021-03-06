import { CountUp } from "./countUp.min.js";

const select = document.querySelector("#countrySelector");
const confirmedNumberCard = document.querySelector("#confirmed");
const recoveryNumberCard = document.querySelector("#recovery");
const deathsNumberCard = document.querySelector("#deaths");
const chartBlock = document.querySelector('#visualChart').getContext('2d');

const today = new Date();
const currentMonth = (today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : (today.getMonth() + 1);
const startDate = today.getFullYear() + "-0" + (currentMonth - 6) + "-" + today.getDate();
const endDate = today.getFullYear() + "-" + currentMonth + "-" + today.getDate();

const api = "https://api.coronatracker.com";

const fetchData = async () => {
    try {
        const response = await fetch(`${api}/v2/analytics/country?limit=200`);
        const data = await response.json();
        return data
    } catch (err) {
        console.error(err);
    }
}

const setOptions = async () => {
    let optionData = await fetchData();

    optionData.forEach(item => {
        let options = document.createElement("option");
        options.value = item.countryCode;
        options.text = item.countryName;
        select.add(options);
    })

}

const updateCards = (confirmed, deaths, recovered) => {
    let countUp = new CountUp(confirmedNumberCard, confirmed);
    countUp.start();

    countUp = new CountUp(deathsNumberCard, deaths);
    countUp.start();

    countUp = new CountUp(recoveryNumberCard, recovered);
    countUp.start();
}

const updateChart = (infections, deaths, recovered, date) => {
    const chart = new Chart(chartBlock, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: "Confirmed",
                    data: infections,
                    backgroundColor: '#cce8ff',
                    borderColor: '#008cff',
                    pointRadius: 0,
                },
                {
                    label: "Recovered",
                    data: recovered,
                    backgroundColor: '#dfffd6',
                    borderColor: '#25aa00',
                    pointRadius: 0,
                },
                {
                    label: "Deaths",
                    data: deaths,
                    backgroundColor: '#fdc5c5',
                    borderColor: '#ff0000',
                    pointRadius: 0,
                }
            ]
        },
        options: {
            response: true,
            maintainAspectRatio: false
        }
    })

}

const fetchTimelineData = async (event) => {
    try {
        const response = await fetch(`${api}/v3/analytics/trend/country?countryCode=${event.target.value}&startDate=${startDate}&endDate=${endDate}`)
        const data = await response.json();
        const infectionsData = data.map(item => item.total_confirmed);
        const deathData = data.map(item => item.total_deaths);
        const recoveredData = data.map(item => item.total_recovered);
        const date = data.map(item => new Date(item.last_updated).toISOString().split('T')[0])

        // console.log(deathData);
        const totalConfirmed = infectionsData[infectionsData.length - 1];
        const totalDeaths = deathData[deathData.length - 1];
        const totalRecovered = recoveredData[recoveredData.length - 1];

        updateChart(infectionsData, deathData, recoveredData, date);
        updateCards(totalConfirmed, totalDeaths, totalRecovered);
    } catch (err) {
        console.error(err);
    }
}

select.addEventListener('change', fetchTimelineData)

window.addEventListener("load", setOptions);