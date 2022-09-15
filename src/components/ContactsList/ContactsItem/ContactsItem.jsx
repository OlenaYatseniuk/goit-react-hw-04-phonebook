import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactsItem.module.css';

function ContactsItem({name, number, onDeleteContact }) {
  return (
    <li className={s.item}>
      <span className={s.spanName}>{name}:</span>
      <span className={s.spanTel}>{number}</span>
      <button className={s.button} type='button' name='delete' onClick={onDeleteContact}>Delete</button>
    </li>
  )
}

ContactsItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,

}

export default ContactsItem;

