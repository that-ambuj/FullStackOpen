import { useState, useEffect, Component } from "react"
import axios from "axios"
import nanoid  from 'nanoid'

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

function App() {
    const [countrySearch, setCountrySearch] = useState("")
    const [displayContent, setDisplayContent] = useState([])
    const [countriesData, setCountriesData] = useState([])

    useEffect(() => {
        axios
            .get(
                "https://restcountries.com/v3.1/all?fields=name,capital,languages,area,flags,ccn3"
            )
            .then((response) => {
                setCountriesData(response.data)
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
        .map((result) => searchInObjArr(countriesData, result))
        .flat()

    function checkResult(arr) {
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
                        .map((country) => country.name)
                        .map((name, index) => (
                            <div key={ index }>{name.common}</div>
                        ))}

                    {console.log(arr)}
                </div>
            )
        }

        if (arr.length === 1) {
            return <div>{<DisplayCountry countryObj={arr[0]} />}</div>
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
