import Filter from './Filter';
import axios from 'axios';

import { useState, useEffect } from 'react'
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filterArr, setFilterArr] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const areObjectsEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const compareArr = persons.map((person) => {
      return areObjectsEqual(person.name, newName);
    });
    const notEqual = compareArr.every((b) => b === false);

    if (notEqual === false) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };

  // toLocaleLowerCase ??
  const filterNames = (event) => {
    setNewFilter(event.target.value);
    const filter = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));
    setFilterArr(filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={filterNames} />
      <h3>Add a new contact</h3>
      <PersonForm valueName={newName} valueNumber={newNumber} onChangeName={(event) => setNewName(event.target.value)} onChangeNumber={(event) => setNewNumber(event.target.value)} onClick={submitHandler} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} filterArr={filterArr} />
    </div>
  );
}

export default App;
