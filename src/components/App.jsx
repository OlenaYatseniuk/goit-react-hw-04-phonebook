import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Container from './Container';
import Section from './Section';
import Filter from './Filter';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOCALE_STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    filter: '',
  };

  componentDidMount(){
    if(localStorage.getItem(LOCALE_STORAGE_KEY)){
      const localContacts = JSON.parse( localStorage.getItem(LOCALE_STORAGE_KEY));
      this.setState({
        contacts: localContacts,
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(this.state.contacts))
    }
  }

  handleSubmitForm = newContact => {
    const {contacts} = this.state;

    if(contacts.find(({name})=> name.toLowerCase() === newContact.name.toLowerCase())){
      toast.error(`${newContact.name} is already in your contacts list`);
      return;
    }

    if(!LOCALE_STORAGE_KEY){
      localStorage.setItem()
    }

    this.setState(({contacts}) => {
      return({
        contacts: [...contacts, newContact],
      })
    });
  };

  handleFilterInput = event => {
    const {value} = event.target;
    this.setState({
      filter: value,
    })

  };

  handleDeleteContact = (deleteId) => {
    this.setState(({contacts}) =>{
      return {contacts: contacts.filter(({id}) =>(deleteId !== id))}
    })
  }

  render() {
    const {filter, contacts} =this.state;
    const identicFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({name}) => (name.toLowerCase().includes(identicFilter)));

    return (
      <>
        <Section title="PhoneBook">
          <Container>
            <ContactForm onSubmit={this.handleSubmitForm} />
          </Container>
        </Section>
        <Section title="Contacts">
          <Container>
            {contacts.length ?
            <>
            <Filter
            filter={filter}
            onFilterHandle={this.handleFilterInput}
          />
          <ContactsList contacts={filter ? filteredContacts: contacts} filter={identicFilter} onDeleteContact={this.handleDeleteContact} />
            </>
            : <div>There are no contacts here=( Please add a new contact.</div>}
          </Container>
        </Section>
        <ToastContainer position='top-right' autoClose={3000}/>
      </>
    );
  }
}
