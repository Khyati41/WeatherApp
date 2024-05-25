import { useEffect, useRef, useState } from 'react';
import { fetchWeather } from './api/weatherApi';
import './App.css';

const icon = {
  '11d': 'storm',
  '11n': 'storm',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'cloudy rain',
  '10n': 'cloudy rain',
  '13d': 'snowflake',
  '13n': 'snowflake',
  '50d': 'mist',
  '50n': 'mist',
  '01d': 'sun',
  '01n': 'moon-and-stars',
  '02d': 'cloudy',
  '02n': 'night',
  '03d': 'clouds',
  '03n': 'clouds',
  '04d': 'partly-cloudy-night',
  '04n': 'partly-cloudy-night',
}

function App() {
  const [city, setCity] = useState('london');
  const [weather, setWeather] = useState({});
  const inputRef = useRef('');

  useEffect(() => {
      weatherFun();
  }, [city]);

  const weatherFun = async () => {
    try {
      const result = await fetchWeather(city);
      setWeather(result);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  const temp = () => {
    return weather.main ? Math.round(weather.main.temp - 273) : ''
  }

  const getImage = () => {
    return weather.weather && weather.weather.length ? <img src={require(`./assets/${icon[weather?.weather[0].icon]}.png`)} className="h-48 md:h-36 sm:h-28" alt="" /> : '';
  }

  const handleSubmit = (e) => {
    setCity(inputRef.current.value)
    e.preventDefault()
  }

  return (
    <div className="app">
      <header className="app-header min-h-[14vh] md:min-h-[12vh] sm:min-h-[10vh]">
        <img className="app-logo sm:h-[2.6rem] h-[3rem]" src={require('./assets/day-and-night.png')} alt="" />
        <h1 className="md:text-4xl sm:text-2xl">
          Weather Forecast
        </h1>
      </header>
      <div className='px-10 md:px-20 sm:pt-4 pt-10 sm:px-8'>
        <form onSubmit={handleSubmit}>
          <input id="city" type="text" ref={inputRef} className='border-b-2 border-black outline-none p-3 w-full md:text-2xl' placeholder="Enter city + Press enter" autoFocus />
        </form>
      </div>

      <div className="my-6 md:my-10">
        <p className="md:text-2xl">Right now in, <span className='text-lg md:text-2xl font-bold'>{city}</span>, It's {weather.weather && weather.weather.length && weather.weather[0].description}</p>
      </div>

      <div className="flex flex-row shadow-2xl sm:shadow-xl shadow-[#474f5e] mx-60 md:mx-48 sm:mx-10 py-8 justify-center rounded-lg items-center md:flex-row sm:flex-col sm:mb-10">
        <div>
          {getImage()} 
        </div>

        <div className='m-20 sm:m-14'>
          <p className="text-8xl sm:text-7xl color-grey-100">{temp()}&#176;</p>
          <p className="md:text-2xl">Celcius</p>
        </div>

        <div className="flex flex-col items-start">
          <p className="flex flex-row md:text-2xl">
            <img src={require('./assets/wind.png')} className="h-7 md:h-10 mr-6" alt="" />
            {weather?.wind?.speed + ' m/s ' +  weather?.wind?.deg}&#176;
          </p>
          <p className="flex flex-row my-3 md:my-5 md:text-2xl">
            <img src={require('./assets/humidity.png')} className="h-7 md:h-10 mr-6" alt="" />
            { weather?.main?.humidity } %
          </p>
          <p className="flex flex-row md:text-2xl">
            <img src={require('./assets/umbrella.png')} className="h-7 md:h-10 mr-6" alt="" />
           { (weather?.rain && weather.rain['1h']) || 0 } mm
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
