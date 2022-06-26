import { useState, useEffect } from "react"
import axios from "axios"

import searchInObjArr from "./components/searchInObjArr"
import InputField from "./components/InputField"

const Button = ({ text }) => <button type="submit">{text}</button>

const DisplayContact = ({ name, number }) => (
   <div>
      {name}, {number}
   </div>
)

const App = () => {
   const [persons, setPersons] = useState([])
   const [newName, setNewName] = useState("")
   const [newNumber, setNewNumber] = useState("")
   const [searchQuery, setSearchQuery] = useState("")
   const [deleteId, setDeleteId] = useState("")

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
         // confirmation dialog here
         if (persons.every((person) => person.number !== newNumber)) {
            const existingId = persons.find((person) => person.name === newName).id
            axios
               .put(`/api/persons/${existingId}`, newPerson)
               .then((response) => {
                  console.log(response.data)
               })
               axios.get("/api/persons").then((response) => setPersons(response.data))
               setNewName("")
               setNewNumber("")
               return
         } else {
            window.alert("this name and number already exist")
            return
         }
      }

      axios
         .post("/api/persons", newPerson)
         .then((response) => {
            console.log(response.data)
         })
         .catch((error) => {
            console.log("could not add to phonebook with error:", error)
         })

      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
   }

   const deletePerson = (id) => {
      axios
         .delete(`/api/persons/${id}`)
         .then((response) => console.log(response.data))

      axios.get("/api/persons").then((response) => setPersons(response.data))
   }

   const handleNewName = (event) => setNewName(event.target.value)
   const handleNewNumber = (event) => setNewNumber(event.target.value)

   const handleSearch = (event) => {
      setSearchQuery(event.target.value)
   }

   return (
      <div>
         <h1>PhoneBook</h1>
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
