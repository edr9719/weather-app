const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');
const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');
const image = document.getElementById('image');

const keyAPI = 'a335f879f395b72801e135be4babfbd7';

async function checkWeather() {
  const inputCity = input.value.trim();
  const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(
    inputCity
  )}&appid=${keyAPI}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    city.innerHTML = data.name;
    temp.innerHTML = `${Math.floor(data.main.temp)}C°`;
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed}km/h`;
    image.src = `img/${data.weather[0].main.toLowerCase()}.png`;
  } catch (error) {
    alert('Oops! Something went wrong: ' + error.message);
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather();
});
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkWeather();
  }
});
