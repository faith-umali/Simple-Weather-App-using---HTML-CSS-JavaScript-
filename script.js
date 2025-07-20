function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "f0b9a524d07449c474ea5b8549fa74dd";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  if (city === "") {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
    return;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const resultDiv = document.getElementById("weatherResult");
      const forecast = data.list[0]; // first 3-hour forecast
      const weatherMain = forecast.weather[0].main;
      const weatherDesc = forecast.weather[0].description;
      const temperature = forecast.main.temp;
      const humidity = forecast.main.humidity;
      const rainVolume = forecast.rain && forecast.rain["3h"] ? forecast.rain["3h"] : 0;

      // Custom smart interpretation
      let interpretedWeather = weatherMain;
      if (rainVolume > 0 || weatherDesc.includes("rain") || weatherDesc.includes("shower")) {
        interpretedWeather = "Rainy";
      } else if (weatherDesc.includes("clear")) {
        interpretedWeather = "Clear";
      } else if (weatherDesc.includes("cloud")) {
        interpretedWeather = "Cloudy";
      }

      resultDiv.innerHTML = `
        <h2>${data.city.name}, ${data.city.country}</h2>
        <p>Forecast in next 3 hours:</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Weather: ${interpretedWeather} (${weatherDesc})</p>
        <p>Rain volume: ${rainVolume} mm</p>
        <p>Last updated: ${new Date().toLocaleTimeString()}</p>
      `;
    })
    .catch((error) => {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
