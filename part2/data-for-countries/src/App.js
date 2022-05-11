import { useEffect, useState } from "react";
import axios from 'axios';
import Filter from "./Filter";
import Country from "./Country";
import Weather from "./Weather";

function App() {
  const [countriesFilter, setCountriesFilter] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setAllCountries(response.data)
      });
  }, []);

  const filterHandler = (event) => {
    setCountriesFilter(event.target.value);
    const filter = allCountries.filter(({ name }) => name.common.toLowerCase().includes(countriesFilter.toLowerCase()));
    setCountriesList(filter);
  };

  const handleClick = (name) => {
    const countryShow = allCountries.find((country) => country.name.common === name.common);
    setCountriesList([countryShow]);
  };

  useEffect(() => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY
    if (countriesList.length === 1) {
      const countrylanlgt = countriesList[0].capitalInfo.latlng;
      const lat = countrylanlgt[0];
      const lon = countrylanlgt[1];
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`).then((response) => setWeather(response.data));
    }
  }, [countriesList]);

  return (
    <div>
      <Filter value={countriesFilter} onChange={filterHandler} />
      {countriesList.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesList.length <= 10 && countriesList.length > 1 ? (
        countriesList.map(({ name }) => (
          <div key={name.common}>
            {name.common}
            <button onClick={() => handleClick(name)}>show</button>
          </div>
        ))
      ) : countriesList.length === 1 ? (
        <div>
          <Country countriesList={countriesList} />
          <Weather name={weather.name} temp={weather.main.temp} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} wind={weather.wind.speed} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
