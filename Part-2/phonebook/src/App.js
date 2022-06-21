import { useState } from 'react'
import searchInObjArr from './components/searchInObjArr';
import DisplayContact from "./components/DisplayContact";
import InputField from "./components/InputField";


const Button = ({ text }) => (<button type="submit">{text}</button>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = { name: newName, number: newNumber, id : (persons.length + 1) }

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
        <div>filter by Name: <input value={searchQuery} onChange={handleSearch} /></div>
      </form>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          <InputField text="Name" value={newName} onChange={handleNewName} />
          <InputField text="Number" value={newNumber} onChange={handleNewNumber} />
          <Button text="Add"  />
        </div>
      </form>
      <h2>Numbers</h2>
      {searchInObjArr(persons, searchQuery, "name")
        .map(person => (<DisplayContact name={person.name} number={person.number} key={person.id} />))
        }
    </div>
  )
}

export default App