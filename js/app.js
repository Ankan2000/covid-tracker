const select = document.querySelector("#countrySelector");

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

fetchTimelineData = async (event) => {
    try {
        const response = await fetch(`${api}/v3/analytics/trend/country?countryCode=${event.target.value}&startDate=2020-03-01&endDate=2020-07-16`)
        const data = await response.json();
        console.log(data.length);
    } catch (err) {

    }
}

select.addEventListener('change', fetchTimelineData)

window.addEventListener("load", setOptions);