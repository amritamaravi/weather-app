window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    let iconElement = document.querySelector(".icon"); // Icon element
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
  
        const apiKey = "49c06c743905ab26aaf06e6629f3c6bb"; // Your WeatherStack API key
        const api = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${long}`;
  
        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const { temperature, weather_descriptions, weather_icons } = data.current;
  
            // Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = weather_descriptions[0];
            locationTimezone.textContent = data.location.timezone_id;
  
            // Convert Fahrenheit to Celsius
            let celsius = (temperature - 32) * (5 / 9);
  
            // Set icon
            setIcons(weather_descriptions[0], iconElement);
  
            // Toggle temperature (F <-> C)
            temperatureSection.addEventListener("click", () => {
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
            });
          })
          .catch((error) => console.error("Error fetching data:", error));
      });
    }
  });
  
  // Function to set icons
  function setIcons(weatherDescription, iconID) {
    const skycons = new Skycons({ color: "white" });
  
    // Mapping WeatherStack descriptions to Skycons
    const weatherMap = {
      "Clear": "CLEAR_DAY",
      "Sunny": "CLEAR_DAY",
      "Partly cloudy": "PARTLY_CLOUDY_DAY",
      "Cloudy": "CLOUDY",
      "Overcast": "CLOUDY",
      "Mist": "FOG",
      "Fog": "FOG",
      "Patchy rain possible": "RAIN",
      "Light rain": "RAIN",
      "Heavy rain": "RAIN",
      "Showers": "RAIN",
      "Snow": "SNOW",
      "Sleet": "SLEET",
      "Thunderstorm": "SLEET",
    };
  
    let currentIcon = weatherMap[weatherDescription] || "CLOUDY"; // Default if not found
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
  