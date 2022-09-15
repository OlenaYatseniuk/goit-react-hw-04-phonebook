import { useState, useEffect } from 'react';

import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Container from './Container';
import Section from './Section';
import Filter from './Filter';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOCALE_STORAGE_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(() => getLocaleStorage() ?? []);

  const [filter, setFilter] = useState('');

  function getLocaleStorage() {
    return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY));
  }

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmitForm = newContact => {
    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.error(`${newContact.name} is already in your contacts list`);
      return;
    }

    if (!LOCALE_STORAGE_KEY) {
      localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(newContact));
    }

    setContacts(prev => {
      return [...prev, newContact];
    });
  };

  const handleFilterInput = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleDeleteContact = deleteId => {
    setContacts(prev => {
      return [...prev.filter(({ id }) => deleteId !== id)];
    });
  };

  const identicFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(identicFilter)
  );

  return (
    <>
      <Section title="PhoneBook">
        <Container>
          <ContactForm onSubmit={handleSubmitForm} />
        </Container>
      </Section>
      <Section title="Contacts">
        <Container>
          {contacts.length ? (
            <>
              <Filter filter={filter} onFilterHandle={handleFilterInput} />
              <ContactsList
                contacts={filter ? filteredContacts : contacts}
                filter={identicFilter}
                onDeleteContact={handleDeleteContact}
              />
            </>
          ) : (
            <div>There are no contacts here=( Please add a new contact.</div>
          )}
        </Container>
      </Section>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
