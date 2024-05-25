import axios from 'axios';

export const fetchWeather = (city) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}`)
    .then(res => res.data || '')
}