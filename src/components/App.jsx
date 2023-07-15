import React, { useEffect, useState, useRef } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [state, setState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  });
  const [filter, setFilter] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) setState({ contacts: JSON.parse(localContacts) });
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const addContact = (id, name, number) => {
    // console.log(state.contacts);
    if (
      !state.contacts.some(
        elem => elem.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setState(prevState => {
        return { contacts: [...prevState.contacts, { id, name, number }] };
      });
    } else {
      alert(`${name} is already exist! Write another one!`);
    }
  };

  const onChangeFilter = event => {
    setFilter(event.target.value);
  };

  const filteredNames = () => {
    return state.contacts.filter(elem =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDelete = id => {
    setState(prevState => {
      return {
        contacts: prevState.contacts.filter(elem => elem.id !== id),
      };
    });
  };

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter input={filter} onChange={onChangeFilter} />
        <ContactList
          contacts={state.filter !== '' ? filteredNames() : state.contacts}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};
