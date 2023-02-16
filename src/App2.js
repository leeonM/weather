import React, { useState } from "react";

const api = {
    key: "ef263db46c7a1340006379c629920958",
    base: "http://api.openweathermap.org/data/2.5/"
}

export default function App2(){
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

   const search = evt => {
    if (evt.key === "Enter"){
        fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
         .then(res => res.json())
         .then(result => {
            setWeather(result)
            console.log(result)
            setQuery('')
        })
    }
   }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
       
        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let date = d.getDate()

        return `${day}, ${date} ${month} ${year}`
       }

  return  (
    <div className={(weather.main !== undefined ? ((weather.main.temp > 16) ? 'app-warm': 'app'): 'app')}>
    <main>
    <div className="search-box">
        <input 
        value={query} 
        onChange={(e)=>setQuery(e.target.value)} 
        type='text' 
        className="search-bar" 
        placeholder="Search Location..." 
        onKeyPress={search}
        />
     </div>
     {(weather.main !== undefined) ? 
     (<div>
     <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
     </div>
     <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°C</div>
        <div className="weather">{weather.weather[0].main}</div>
     </div>
     </div>) 
     : ('')}
    </main>
    </div>
  )
  
}