function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "f0b9a524d07449c474ea5b8549fa74dd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
      const weatherMain = data.weather[0].main;
      const weatherDesc = data.weather[0].description;

      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${weatherMain} - ${weatherDesc}</p>
      `;
    })
    .catch((error) => {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
