import axios from 'axios';

const API_KEY = 'b5357bc9472356d53b6067ee32752554';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByLocation = async (lat, lon, unit = 'metric') => {
    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`)
    return response.data
};

export const getWeatherByCity = async (city, unit = 'metric') => {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`)
    return response.data
};