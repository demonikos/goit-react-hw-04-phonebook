import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  // defaultState = {
  //   contacts: [
  //     { id: 'id-1', name: 'default-user #1', number: '111-11-11' },
  //     { id: 'id-2', name: 'default-user #2', number: '222-22-22' },
  //     { id: 'id-3', name: 'default-user #3', number: '333-33-33' },
  //   ],
  // }

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) this.setState({ contacts : JSON.parse(localContacts)})
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    } 
  }


  addContact = (id, name, number) => {
    console.log(this.state.contacts);

    if (
      !this.state.contacts.some(
        elem => elem.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, { id, name, number }] };
      });
    } else {
      alert(`${name} is already exist! Write another one!`);
    }
  };

  onChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  filteredNames = () => {
    return this.state.contacts.filter(elem =>
      elem.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  onDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(elem => elem.id !== id),
      };
    });
  };

  render() {
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />

          <h2>Contacts</h2>
          <Filter input={this.state.filter} onChange={this.onChangeFilter} />
          <ContactList
            contacts={
              this.state.filter !== ''
                ? this.filteredNames()
                : this.state.contacts
            }
            onDelete={this.onDelete}
          />
        </div>
      </>
    );
  }
}
