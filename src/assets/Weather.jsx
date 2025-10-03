import React, { useState } from 'react';
import cloudy from './images/cloudy.png';
import clear from './images/clear.png';
import fog from './images/fog.png';
import haze from './images/haze.png';
import rain from './images/rain.png';
import warning from './images/warning.png'
import './weather.css';

const Weather = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [error,seterror] = useState("")

  const API_KEY = "bcf252beb745b72adb29c8225648c2f4";

  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const fun = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setData(json);

    if(search===""){
        seterror("Enter a name ..!")
    }

    else if(json.cod==='404'){
        seterror("Enter a Correct name ..!")
    }

    else{
        seterror("")
    }

    setSearch("")
  };

  // Weather condition ke hisab se image select karna
  const getWeatherImage = (main) => {
    switch (main) {
      case "Clouds":
        return cloudy;
      case "Rain":
        return rain;
      case "Clear":
        return clear;
      case "Mist":
        return fog;
      case "Haze":
        return haze;
      default:
        return ""; // agar koi match nahi, empty
    }
  };

  return (
    <div className='main'>
      <div className="conatiner">
        <div className="inputs">
          <input placeholder='Enter City, Country' value={search} onChange={handleInput} />
          <i className='img'>
            <img
              src="search.png"
              alt="Search"
              height={"30px"}
              width={"30px"}
              onClick={fun}
            />
          </i>

          <div className='data'>

{

    error ?
    <div className='errorpage'>
        <p>{error}</p>
        <img src={warning} alt=""  height={100} width={100}/>
    </div>:""
}



            {data && data.weather ? (
              <div>
                <h2>Name: {data.name}</h2>
                <img
                  src={getWeatherImage(data.weather[0].main)}
                  alt={data.weather[0].main}
                  height="50"
                  width="50"
                />
                <h2>Temp: {Math.trunc(data.main.temp)}°C</h2>
                <h2>Desc: {data.weather[0].description}</h2>

               
              </div>
            ) : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
