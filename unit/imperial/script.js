// API
const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-container').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=imperial`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    // City
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, `;

    let country = document.getElementById('country');
    country.innerText = `${weather.sys.country}`;

    // Current temperature
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `<b>${Math.round(weather.main.temp)}</b>&deg;`;
    
    // Current feels like temperature
    let feeltemperature = document.getElementById('feeltemp');
    feeltemperature.innerHTML = `<b>${Math.round(weather.main.feels_like)}</b>&deg;`;

    // Clouds
    let clouds = document.getElementById('clouds');
    clouds.innerHTML = `<b>${(weather.clouds.all)}</b>%`;

    // Minimum temperature
    let minTemp = document.getElementById('min-temp');
    minTemp.innerHTML = `<b>${Math.floor(weather.main.temp_min)}</b>&deg;`

    // Maximum temperature
    let maxTemp = document.getElementById('max-temp');
    maxTemp.innerHTML = `<b>${Math.floor(weather.main.temp_max)}</b>&deg;`

    // Current weather conditions
    let weatherType = document.getElementById('weather-condition');
    weatherType.innerText = `${weather.weather[0].main}`;

    // Pressue
    let pressure = document.getElementById('pressure');
    pressure.innerHTML = `<b>${(weather.main.pressure)}</b>`;

    // Humidity
    let humidity = document.getElementById('humidity');
    humidity.innerHTML = `<b>${(weather.main.humidity)}</b>%`;

    // Wind speed
    let windSpeed = document.getElementById('wind-speed');
    windSpeed.innerHTML = `<b>${(weather.wind.speed)}</b>`;

    // Wind direction
    let windDir = document.getElementById('wind-dir');
    windDir.innerHTML = `<b>${(weather.wind.deg)}</b>&deg;`;

    let date = document.getElementById('date');
    let day = document.getElementById('day');
    let todayDate = new Date();
    let todayDay = new Date();
    date.innerText = dateManage(todayDate);
    day.innerText = dayManage(todayDay);

    // Date manage
    function dateManage(dateArg) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let year = dateArg.getFullYear();
        let month = months[dateArg.getMonth()];
        let date = dateArg.getDate();

        return `${month} ${date}, ${year} •`;
    };

    // Day manage
    function dayManage(dateArg) {

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[dateArg.getDay()];
        let hour = dateArg.getHours();
        let min = dateArg.getMinutes();
        let am_pm = "AM"; 

        if (hour > 12) { 
            hour -= 12; 
            am_pm = "PM"; 
        } 
        if (hour == 0) { 
            hour = 12; 
            am_pm = "AM"; 
        }
        hour = hour < 10 ? "0" + hour : hour; 
        min = min < 10 ? "0" + min : min;  

        return ` ${day}
        ${hour}:${min} ${am_pm}`;
    }
};