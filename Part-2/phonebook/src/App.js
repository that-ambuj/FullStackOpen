/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import axios from "axios"
import "./index.css"
import searchInObjArr from "./components/searchInObjArr"
import InputField from "./components/InputField"

const Button = ({ text }) => <button type="submit">{text}</button>

const documentStyle = {
   fontFamily: "'Satoshi Variable', sans-serif",
   fontSize: "1.3em",
}

const errorStyle = {
   color: "#410E0B",
   textAlign: "center",
   padding: " 30px 0px",
   margin: "15px 0px",
   backgroundColor: "#F9DEDC",
   borderRadius: "20px",
   maxWidth: "500px",
   border: "solid #B3261E",
}

const warningStyle = {
   color: "black",
   backgroundColor: "#f9f7dc",
   borderRadius: "20px",
   textAlign: "center",
   margin: "15px 0px",
   border: "solid #b3a91e",
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%,-50%)",
   padding: "20px 40px",
   maxWidth: "450px",
   minWidth: "350px",
   heading: {
      fontSize: "1.7rem",
      fontWeight: "600",
      marginBottom: 10 + "px",
   },
}

const buttonStyles = {
   green: {
      background: "#76ff03",
      border: "2px solid #689f38",
      borderRadius: "7px",
      fontWeight: "400",
      width: "100px",
      height: "40px",
      fontSize: "1.3rem",
      margin: "20px",
   },
   red: {
      background: "#ff616f",
      border: "2px solid #d32f2f",
      borderRadius: "10px",
      fontWeight: "400",
      width: "100px",
      height: "40px",
      fontSize: "1.3rem",
      margin: "20px",
   },
}

const ErrorMessage = ({ title, message, boolean }) => {
   if (boolean) {
      return (
         <div style={errorStyle}>
            <b>{title}</b> : {message}
         </div>
      )
   }
}

const WarningDialogue = ({ title, text, boolean, onClickYes, onClickNo }) => {
   if (boolean) {
      return (
         <div style={warningStyle}>
            <div style={warningStyle.heading}>{title}</div>
            <div>
               {text}
               <div>
                  <button style={buttonStyles.green} onClick={onClickYes}>
                     Yes
                  </button>
                  <button style={buttonStyles.red} onClick={onClickNo}>
                     No
                  </button>
               </div>
            </div>
         </div>
      )
   }
}

const App = () => {
   const [persons, setPersons] = useState([])
   const [newName, setNewName] = useState("")
   const [newNumber, setNewNumber] = useState("")
   const [searchQuery, setSearchQuery] = useState("")
   const [showWarning, setShowWarning] = useState(false)
   const [showLengthError, setShowLengthError] = useState(false)
   const [showPersonError, setShowPersonError] = useState(false)
   const [showValidationError, setShowValidationError] = useState(false)

   useEffect(() => {
      axios.get("/api/persons").then((response) => {
         setPersons(response.data)
      })
   }, [])

   const addPerson = (event) => {
      event.preventDefault()

      const newPerson = {
         name: newName,
         number: newNumber,
      }

      if (persons.some((person) => person.name === newName)) {
         setShowWarning(true)
         return
      }

      if (newName.length <= 3) {
         setShowLengthError(true)
         return
      }

      axios
         .post("/api/persons", newPerson)
         .then((response) => {
            axios
               .get("/api/persons")
               .then((response) => setPersons(response.data))
         })
         .catch((error) => {
            console.log("could not add to phonebook with error:", error)
            if(error.response.status === 406) {
               setShowValidationError(true)
            }
         })

      setNewName("")
      setNewNumber("")
   }

   const overwritePerson = (event) => {
      event.preventDefault()

      const newPerson = {
         name: newName,
         number: newNumber,
      }
      if (persons.every((person) => person.number !== newNumber)) {
         setShowWarning(false)
         const existingId = persons.find((person) => person.name === newName).id
         axios.put(`/api/persons/${existingId}`, newPerson).then((response) => {
            console.log(response.data)
         })
         axios.get("/api/persons").then((response) => setPersons(response.data))
         setNewName("")
         setNewNumber("")
         return
      } else {
         setShowPersonError(true)
         setShowWarning(false)
         return
      }
   }

   const deletePerson = (id) => {
      axios
         .delete(`/api/persons/${id}`)
         .then((response) => console.log(response.data))

      axios.get("/api/persons").then((response) => setPersons(response.data))
   }

   const handleNewName = (event) => setNewName(event.target.value)
   const handleNewNumber = (event) => setNewNumber(event.target.value)

   const handleSearch = (event) => setSearchQuery(event.target.value)

   return (
      <div style={documentStyle}>
         <div id={`${showWarning && "page-mask"}`}></div>
         <h1>PhoneBook</h1>
         <ErrorMessage
            boolean={showLengthError}
            title="Name too short"
            message="name should be more 3 character long"
         />
         <ErrorMessage
            boolean={showPersonError}
            title="Can't overwrite"
            message="This name & number already exist."
         />
         <ErrorMessage 
            boolean={showValidationError} 
            title="Invalid Phone Number"
            message ="Please check the number & make sure it's in XX-XX... or XXX-XX.... format"
         />

         <WarningDialogue
            onClickYes={() => overwritePerson()}
            onClickNo={() => setShowWarning(false)}
            boolean={showWarning}
            title="Warning"
            text="This person already exists in the phonebook, do you want to update the number?"
         />
         <form>
            <div>
               filter by Name:{" "}
               <input value={searchQuery} onChange={handleSearch} />
            </div>
         </form>
         <h2>Add New</h2>
         <form onSubmit={addPerson}>
            <div>
               <InputField
                  text="Name"
                  value={newName}
                  onChange={handleNewName}
                  key="name"
               />
               <InputField
                  text="Number"
                  value={newNumber}
                  onChange={handleNewNumber}
                  key="number"
               />
               <Button text="Add" />
            </div>
         </form>
         <h2>Numbers</h2>
         {searchInObjArr(persons, searchQuery, "name").map((person) => (
            <div key={person.id}>
               {person.name}, {person.number}
               <button type="submit" onClick={() => deletePerson(person.id)}>
                  delete
               </button>
            </div>
         ))}
      </div>
   )
}

export default App
