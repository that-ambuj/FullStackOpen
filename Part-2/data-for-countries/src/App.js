import { useState, useEffect, Component } from "react";
import axios from "axios";

import searchInObjArr from "./components/searchInObjArr";
import InputField from "./components/InputField";

const DisplayNames = (props) => {
    const { namesArr } = props;

    if (namesArr.length > 10) {
        return <div>Please enter more letters</div>;
    }

    return namesArr.map((name) => <div>{name}</div>);
};

const ShowButton = () => {};

const DisplayCountry = (props) => {
    const countryArr = props.countryArr
    const [ countryObj ] = props.countryArr;
    const countryName = countryObj.name.common;
    const capital = countryObj.capital[0];
    const area = countryObj.area;
    const languagesArr = Object.entries(countryObj.languages);
    const flagSVG = countryObj.flags.svg;

    const [svg, setSVG] = useState(<svg></svg>);

    useEffect(() => {
        axios.get(flagSVG).then((response) => {
            setSVG(response.data);
        });
    });

    if(countryArr.length > 1) {
        return <DisplayNames
            namesArr={countryArr.map(country => country.name.common)}
            key={countryArr.map((obj) => obj.ccn3)}
        />
    }

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

            <div dangerouslySetInnerHTML={{ __html: svg }} />
        </>
    );
};

function App() {
    const [countrySearch, setCountrySearch] = useState("");
    const [displayContent, setDisplayContent] = useState([]);
    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountriesData(response.data);
        });
    }, []);

    const searchRegex = new RegExp(countrySearch, "ig");

    const searchResultNames =
        { countrySearch } !== ""
            ? countriesData
                  .map((countries) => countries.name.common)
                  .filter((names) => searchRegex.test(names))
            : countriesData;

    const resultObjArr = searchResultNames
        .map((result) => searchInObjArr(countriesData, result))
        .flat();

    return (
        <div>
            <InputField
                text="find countries"
                value={countrySearch}
                onChange={(event) => setCountrySearch(event.target.value)}
            />
            
            <DisplayCountry countryArr={resultObjArr} />
        </div>
    );
}

export default App;
