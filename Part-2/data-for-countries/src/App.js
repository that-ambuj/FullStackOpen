import { useState, useEffect, Component } from "react"
import axios from "axios"

import searchInObjArr from "./components/searchInObjArr"
import InputField from "./components/InputField"

const DisplayNames = ({ name }) => {
  return <div>{name}</div>
}

const ShowButton = () => {}

const DisplayCountry = (props) => {
  const countryObj = props.countryObj
  const countryName = countryObj.name.common
  const capital = countryObj.capital[0]
  const area = countryObj.area
  const languagesArr = Object.entries(countryObj.languages)
  const flagSVG = countryObj.flags.png
  console.log(countryObj)

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
    </>
  )
}

const App = () => {
  const [countrySearch, setCountrySearch] = useState("")
  const [showToggle, setShowToggle] = useState(false)
  const [countriesData, setCountriesData] = useState([])
  const [showID, setShowID] = useState(0)

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
      countriesData.flat().filter((country) => country.name.common == name)
    )
    .flat()

  function checkResult(arr) {
    if (showID !== 0) {
      const country = arr.filter((country) => country.ccn3 === showID)[0]

      return (
        <div>
          <button onClick={() => setShowID(0)}>hide</button>
          <DisplayCountry countryObj={country} key={country.ccn3} />
        </div>
      )
    }

    if (arr.length < 1) {
      return <div>No result found.</div>
    }

    if (arr.length > 10) {
      return <div> Please enter more letters.</div>
    }
    if (arr.length <= 10 && arr.length > 1) {
      return (
        <div>
          {arr
            .map((country) => [country.name, country.ccn3])
            .map((nameCode) => (
              <>
                <div key={nameCode[1]} id={nameCode[1]}>
                  {nameCode[0].common}
                  <button onClick={() => setShowID(nameCode[1])}> show</button>
                </div>
              </>
            ))}
        </div>
      )
    }

    if (arr.length === 1) {
      return (
        <div>{<DisplayCountry countryObj={arr[0]} key={arr[0].ccn3} />}</div>
      )
    }
  }

  return (
    <>
      <InputField
        text="find countries"
        value={countrySearch}
        onChange={(event) => setCountrySearch(event.target.value)}
      />
      {checkResult(resultObjArr)}
    </>
  )
}

export default App
