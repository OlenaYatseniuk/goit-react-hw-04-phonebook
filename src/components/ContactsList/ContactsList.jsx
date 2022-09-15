import React from 'react';
import PropTypes from 'prop-types';
import ContactsItem from './ContactsItem';
import s from './ContactsList.module.css';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, id, number }) => (
        <ContactsItem
          name={name}
          key={id}
          number={number}
          onDeleteContact={() => onDeleteContact(id)}
        />
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
