import { useState, useEffect } from "react"
import axios from "axios"

import InputField from "./components/InputField"

const api_key = process.env.REACT_APP_API_KEY

const WeatherComponent = (props) => {
   const [weather, setWeather] = useState("")
   const [icon, setIcon] = useState("")

   const lat = props.lat
   const long = props.long
   const capital = props.capital

   useEffect(() => {
      axios
         .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`
         )
         .then((response) => {
            setWeather(response.data)
            setIcon(response.data.weather[0].icon)
         })
   }, [])

   if (weather.hasOwnProperty("main")) {
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
      const temp = weather.main.temp
      const wind = weather.wind.speed

      return (
         <>
            <h3>Weather in {capital} :</h3>
            <div>Temperature : {temp} celsius</div>
            <img src={iconURL} alt="weather icon" />
            <div>Wind : {wind} m/s </div>
         </>
      )
   }
}

const DisplayCountry = (props) => {
   const countryObj = props.countryObj
   const countryName = countryObj.name.common
   const capital = countryObj.capital[0]
   const area = countryObj.area
   const languagesArr = Object.entries(countryObj.languages)
   const flagSVG = countryObj.flags.png

   const lat = countryObj.capitalInfo.latlng[0]
   const lng = countryObj.capitalInfo.latlng[1]

   return (
      <>
         <h2>{countryName}</h2>
         <div>Capital : {capital}</div>
         <div>Area : {area}</div>

         <h4>Languages :</h4>
         <ul>
            {languagesArr.map((lang) => (
               <li key={lang[0]}> {lang[1]}</li>
            ))}
         </ul>

         <img src={flagSVG} alt="flag" />

         <WeatherComponent lat={lat} long={lng} capital={capital} />
      </>
   )
}

const ShowCountry = (props) => {
   const [showID, setShowID] = useState(0)
   const arr = props.arr

   if (showID !== 0) {
      const country = arr.filter((country) => country.ccn3 === showID)[0]

      return (
         <div>
            <button onClick={() => setShowID(0)}>hide</button>
            <DisplayCountry countryObj={country} key={country.ccn3} />
         </div>
      )
   }

   if (arr.length === 1) {
      return (
         <div>
            {<DisplayCountry countryObj={arr[0]} key={arr[0].ccn3} />}
         </div>
      )
   }
   if (arr.length <= 10 && arr.length > 1) {
      return (
         <div>
            {arr
               .map((country) => [country.name, country.ccn3])
               .map((nameCode) => (
                  <div key={nameCode[1]}>
                     {nameCode[0].common}
                     <button onClick={() => setShowID(nameCode[1])}>
                        show
                     </button>
                  </div>
               ))}
         </div>
      )
   }

   return null
}

const NotSpecific = (props) => {
   const arr = props.arr

   if (arr.length > 10) {
      return <div> Please enter more letters.</div>
   }
   if (arr.length < 1) {
      return <div>No result found.</div>
   }

   return null

}
const App = () => {
   const [countrySearch, setCountrySearch] = useState("")
   const [countriesData, setCountriesData] = useState([])

   useEffect(() => {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
         const result = response.data
         setCountriesData(result)
      })
   }, [])

   const searchRegex = new RegExp(countrySearch, "i")

   const searchResultNames =
      { countrySearch } !== ""
         ? countriesData
              .map((countries) => countries.name.common)
              .filter((names) => searchRegex.test(names))
         : countriesData

   const resultObjArr = searchResultNames
      .map((name) =>
         countriesData.flat().filter((country) => country.name.common === name)
      )
      .flat()



   return (
      <>
         <InputField
            text="find countries"
            value={countrySearch}
            onChange={(event) => setCountrySearch(event.target.value)}
         />
         <ShowCountry arr={resultObjArr} />
         <NotSpecific arr={resultObjArr} />
      </>
   )
}

export default App
