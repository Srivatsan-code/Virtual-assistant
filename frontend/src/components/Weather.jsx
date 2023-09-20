import React, { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';

const Weather = () => {
    const [weather,setWeather]=useState([])
    const { speak, voices, cancel } = useSpeechSynthesis();
    const [lat,setlat]=useState(0);
    const [long,setlong]=useState(0);
    const url=`https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${long}&timezone=auto&language=en&units=auto`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cc90540daamsh8507e7265ba9d32p12e34ajsncc333b7ef834',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };
    const rate=1;
    useEffect(()=>{ 
        function showPosition(position) {
             setlat(position.coords.latitude);
            setlong(position.coords.longitude);
          }
        function getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
             setlat(13.0827);
             setlong(80.2707);
            }
          }
        getLocation();

        fetch(url, options)
        .then((data)=>data.json())
        .then((response)=>{
            setWeather(response.current)
            
        } 
            )
    },[])
    useEffect(()=>{
        cancel()
        speak({ text: `Temperature ${weather.temperature} °C`, rate, voice: voices[5] })
        speak({ text: `Humidity ${weather.humidity}  %`, rate, voice: voices[5] })
        speak({ text: `Today weather condition   ${weather.summary}`, rate, voice: voices[5] })
    },[weather])
   console.log(weather)
   
  return (
    <div className='weather'>
        <div className="weatherCard">
            <div className='background'>
                <div className='weatherContent'>
        <img src={`Icon/${weather.icon_num}.png`} alt='Weather img' />
        <h1>{weather.temperature} °C</h1>
        <h1 >Humidity: {weather.humidity} %</h1>
        <h1 >Summary:  {weather.summary}</h1>
        <p className='loc'><img src='loc.png' style={{height:"40px",width:"40px"}}/><p className='latlong'>({lat} , {long})</p></p>
        </div>
        </div>
        </div>
    </div>
  ) 
}

export default Weather
