import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
}

  handleSubmitForm = (event) => {
    event.preventDefault();
    const newContact = {id: nanoid(), ...this.state};
    this.props.onSubmit(newContact);
    this.resetForm();

  }

  handleInputChange = (event) =>{
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    })
  }

  resetForm = () =>{
    this.setState({
    name: '',
    number: '',
  })
  }


  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmitForm}>
        <label className={s.label}>
          Name
          <input onChange={this.handleInputChange}
            className={s.input}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={s.label}>
          Tel
          <input onChange={this.handleInputChange}
            className={s.input}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" name="submit" className={s.submit} >
          Add contact
        </button>
      </form>
    );
  }
}
