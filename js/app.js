const select = document.querySelector("#countrySelector");
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

const updateChart = (infections, deaths, recovered, date) => {
    console.log(deaths[deaths.length - 1]);
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

fetchTimelineData = async (event) => {
    try {
        const response = await fetch(`${api}/v3/analytics/trend/country?countryCode=${event.target.value}&startDate=${startDate}&endDate=${endDate}`)
        const data = await response.json();
        const infectionsData = data.map(item => item.total_confirmed);
        const deathData = data.map(item => item.total_deaths);
        const recoveredData = data.map(item => item.total_recovered);
        const date = data.map(item => new Date(item.last_updated).toISOString().split('T')[0])

        // console.log(deathData);

        updateChart(infectionsData, deathData, recoveredData, date);
    } catch (err) {
        console.error(err);
    }
}

select.addEventListener('change', fetchTimelineData)

window.addEventListener("load", setOptions);