import Filter from './Filter';
import phoneService from './services/phones';

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
    phoneService
      .getAll()
      .then(contacts => setPersons(contacts));
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
      // alert(`${newName} is already added to phonebook`);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const contact = persons.find((p) => p.name === newName);
      const changedPerson = { ...contact, number: newNumber }
      const id = changedPerson.id;
      phoneService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson));
        setNewName('');
        setNewNumber('');
      })
      }
    } else {
      const phoneObject = {
        name: newName,
        number: newNumber
      };
      phoneService
        .create(phoneObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact));
          setNewName("");
          setNewNumber("");
        })
    }
  };

  const filterNames = (event) => {
    setNewFilter(event.target.value);
    const filter = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));
    setFilterArr(filter);
  };

  const deletePerson = (id) => {
    const contact = persons.find(p => p.id === id);
    const contactName = contact.name;
    if (window.confirm(`Delete ${contactName}`)) {
      phoneService
      .remove(id)
      .then(() => setPersons(persons.filter(p => p.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={filterNames} />
      <h3>Add a new contact</h3>
      <PersonForm valueName={newName} valueNumber={newNumber} onChangeName={(event) => setNewName(event.target.value)} onChangeNumber={(event) => setNewNumber(event.target.value)} onClick={submitHandler} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} filterArr={filterArr} onClick={(id) => deletePerson(id)} />
    </div>
  );
}

export default App;
