import { Component } from 'react';
import { FormAddContacts } from './Form/Form';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import swal from 'sweetalert';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contactsArrey = JSON.parse(localStorage.getItem('contacts'));

    contactsArrey && contactsArrey.length
      ? this.setState({ contacts: contactsArrey })
      : this.swalEmpty();
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    !this.state.contacts.length && this.swalEmpty();
  }
  swalEmpty = () =>
    swal({
      title: 'Your phonebook is empty',
      icon: 'info',
    });
  handleAddContact = (contact, callbackCleanForm) => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };
    const isContact = this.state.contacts.some(
      obj =>
        obj.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );
    if (isContact) {
      swal({
        title: newContact.name,
        text: 'Is already in contacts!',
        icon: 'info',
      });
      callbackCleanForm();
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
    callbackCleanForm();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleDeleteContact = e => {
    const idBtn = e.target.id;
    const newContacts = this.state.contacts.filter(({ id }) => id !== idBtn);
    this.setState({ contacts: newContacts });
  };
  arreyContactsFiltered = () =>
    this.state.contacts.filter(
      ({ name }) =>
        !this.state.filter ||
        name.toLowerCase().includes(this.state.filter.trim().toLowerCase())
    );

  render() {
    return (
      <div className="maine_box ">
        <h1 className="h1 mt-2">Phonebook</h1>
        <FormAddContacts handleAddContact={this.handleAddContact} />
        <h2 className="h2 mt-3">Contacts</h2>
        <Filter state={this.state} handleChange={this.handleChange} />
        <ContactsList
          array={this.arreyContactsFiltered()}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
