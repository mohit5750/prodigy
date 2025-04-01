const apiKey = "c183ac8c3ec0c47e69ff958132c903e1"; // Replace with your OpenWeatherMap API key
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");
    
    if (!city) {
        weatherInfo.innerHTML = `<p style="color:red;">Please enter a city name</p>`;
        return;
    }

    try {
        const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "City not found");
        }

        const data = await response.json();

        weatherInfo.innerHTML = `
            <p><strong>${data.name}, ${data.sys.country}</strong></p>
            <p>🌡️ Temperature: ${data.main.temp}°C</p>
            <p>🌤️ Weather: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}
